class Api::V1::PurchasesController < ApplicationController
  before_action :authenticate_reader!
  skip_before_action :authenticate_reader!, only: [:verify]
  # skip_before_action :verify_authenticity_token, only: [:verify]
  before_action :set_book, only: [:create]

  def create
    service = PurchaseService.new(current_reader, @book, params[:content_type])
    result = service.create_purchase

    if result[:success]
      render json: {
        status: { code: 200, message: 'Purchase created successfully' },
        data: result[:data]
      }
    else
      render json: {
        status: { code: 422, message: result[:error] }
      }, status: :unprocessable_content
    end
  end

  # Verify payment after Paystack callback
  def verify
    # Extract reference from the correct location
    reference = params[:data][:reference]

    # 1. CRITICAL: Verify webhook signature first
    unless verify_webhook_signature
      return render json: {
        status: { code: 401, message: 'Unauthorized webhook' }
      }, status: :unauthorized
    end

    # 2. Find purchase directly without using current_reader
    purchase = Purchase.find_by(transaction_reference: reference)

    if purchase.nil?
      return render json: {
        status: { code: 404, message: 'Purchase not found' }
      }, status: :not_found
    end

    # 3. Update purchase status directly - IMPORTANT: No validation checks
    if purchase.update(purchase_status: 'completed')
      RevenueCalculationService.new(purchase).calculate

      # Send purchase receipt email to reader
      ReaderMailer.purchase_receipt(purchase).deliver_later

      # Notify the author for book sales
      author = purchase.book&.author
      AuthorMailer.sale_alert(author, purchase.book, purchase).deliver_later if author&.email.present?

      render json: {
        status: { code: 200, message: 'Payment verified successfully' },
        data: { purchase_id: purchase.id }
      }
    else
      render json: {
        status: { code: 422, message: 'Failed to update purchase status' }
      }, status: :unprocessable_content
    end
  rescue StandardError
    render json: {
      status: { code: 500, message: 'Internal server error' }
    }, status: :internal_server_error
  end

  # Get user's purchase history
  def index
    purchases = current_reader.purchases.includes(book: { cover_image_attachment: :blob })
      .where(purchase_status: 'completed')
      .order(created_at: :desc)

    render json: {
      status: { code: 200 },
      data: purchases.map do |purchase|
        {
          id: purchase.id,
          book: {
            id: purchase.book.id,
            slug: purchase.book.slug,
            title: purchase.book.title,
            author_name: "#{purchase.book.author.first_name} #{purchase.book.author.last_name}",
            cover_image_url: (
              if purchase.book.cover_image.attached?
                Rails.application.routes.url_helpers.url_for(purchase.book.cover_image)
              end
            )
          },
          content_type: purchase.content_type,
          amount: purchase.amount,
          purchase_date: purchase.purchase_date,
          reading_token: generate_reading_token(purchase)
        }
      end
    }
  end

  def check_status
    reference = params[:reference]
    purchase = Purchase.find_by(transaction_reference: reference)

    if purchase.nil?
      return render json: {
        status: { code: 404, message: 'Purchase not found' }
      }, status: :not_found
    end

    # If purchase is completed, include reading token
    reading_token = nil
    reading_token = generate_reading_token(purchase) if purchase.purchase_status == 'completed'

    render json: {
      status: { code: 200 },
      data: {
        purchase_id: purchase.id,
        purchase_status: purchase.purchase_status,
        book_id: purchase.book.id,
        book_title: purchase.book.title,
        content_type: purchase.content_type,
        purchase_date: purchase.purchase_date,
        reading_token: reading_token
      }
    }
  end

  def refresh_reading_token
    book_id = params[:book_id]
    purchase_id = params[:purchase_id]
    content_type = params[:content_type] || ENV.fetch('DEFAULT_TRIAL_CONTENT_TYPE', 'ebook')

    # Accept either book_id or purchase_id
    unless book_id || purchase_id
      return render json: {
        status: { code: 400, message: 'Book ID or Purchase ID is required' }
      }, status: :bad_request
    end

    begin
      if book_id
        # Get the book first
        book = Book.find(book_id)

        # Check if reader has access (either owns book or has active trial)
        unless current_reader.trial_active? || current_reader.owns_book?(book)
          return render json: {
            status: { code: 402, message: 'Access denied. Please purchase this book or use your free trial.' }
          }, status: :payment_required
        end

        # Try to find a completed purchase first
        purchase = current_reader.purchases
          .joins(:book)
          .where(books: { id: book_id }, purchase_status: 'completed')
          .order(created_at: :desc)
          .first

        if purchase
          # User owns the book - generate token with purchase info
          token = generate_reading_token(purchase)
        elsif current_reader.trial_active?
          # User is on trial - generate trial token
          token = generate_trial_reading_token(current_reader, book, content_type)
        else
          return render json: {
            status: { code: 402, message: 'Trial expired. Please purchase this book to continue reading.' }
          }, status: :payment_required
        end
      else
        # Find by purchase_id (original behavior)
        purchase = current_reader.purchases.find(purchase_id)

        unless purchase.purchase_status == 'completed'
          return render json: {
            status: { code: 403, message: 'Access denied' }
          }, status: :forbidden
        end

        token = generate_reading_token(purchase)
      end

      render json: {
        status: { code: 200 },
        data: {
          reading_token: token
        }
      }
    rescue ActiveRecord::RecordNotFound
      render json: {
        status: { code: 404, message: 'Resource not found' }
      }, status: :not_found
    end
  end

  private

  def authenticate_reader!
    token = request.headers['Authorization']&.split&.last

    unless token
      return render json: {
        status: { code: 401, message: 'Authentication token required' }
      }, status: :unauthorized
    end

    begin
      decoded_token = JWT.decode(
        token,
        ENV.fetch('DEVISE_JWT_SECRET_KEY', nil),
        true,
        { algorithm: 'HS256' }
      )

      # Removed sensitive token payload logging

      reader_id = decoded_token[0]['sub']
      @current_reader = Reader.find(reader_id)

      # Removed sensitive reader email logging
    rescue JWT::DecodeError
      render json: {
        status: { code: 401, message: 'Invalid authentication token' }
      }, status: :unauthorized
    rescue ActiveRecord::RecordNotFound
      render json: {
        status: { code: 401, message: 'Reader not found' }
      }, status: :unauthorized
    end
  end

  attr_reader :current_reader

  def set_book
    @book = Book.find(params[:book_id])
  rescue ActiveRecord::RecordNotFound
    render json: {
      status: { code: 404, message: 'Book not found' }
    }, status: :not_found
  end

  def book_has_content_type?(content_type)
    case content_type
    when 'ebook'
      @book.ebook_price.present? && @book.ebook_price.positive?
    when 'audiobook'
      @book.audiobook_price.present? && @book.audiobook_price.positive?
    else
      false
    end
  end

  def generate_reading_token(purchase)
    JWT.encode(
      {
        sub: purchase.reader_id, # Reader ID as subject
        purchase_id: purchase.id,
        content_type: purchase.content_type,
        book_id: purchase.book.id,
        exp: 4.hours.from_now.to_i # 4 hours reading session
      },
      ENV.fetch('DEVISE_JWT_SECRET_KEY', nil),
      'HS256'
    )
  end

  def generate_trial_reading_token(reader, book, content_type)
    JWT.encode(
      {
        sub: reader.id, # Reader ID as subject
        book_id: book.id,
        content_type: content_type,
        trial_access: true,
        exp: 4.hours.from_now.to_i # 4 hours reading session for trial
      },
      ENV.fetch('DEVISE_JWT_SECRET_KEY', nil),
      'HS256'
    )
  end

  # Enhanced webhook signature verification with development bypass
  def verify_webhook_signature
    # DEVELOPMENT BYPASSED
    # if Rails.env.development? && (params[:skip_verification] == 'true' || request.headers['X-Skip-Verification'] == 'true')
    #   Rails.logger.warn "⚠️ BYPASSING webhook signature verification in development!"
    #   Rails.logger.warn "⚠️ DO NOT USE THIS IN PRODUCTION!"
    #   return true
    # end

    payload = request.raw_post
    signature = request.headers['HTTP_X_PAYSTACK_SIGNATURE']

    return false unless signature.present? && payload.present?

    webhook_secret = ENV.fetch('PAYSTACK_SECRET_KEY', nil)
    expected = OpenSSL::HMAC.hexdigest('sha512', webhook_secret, payload)

    ActiveSupport::SecurityUtils.secure_compare(signature, expected)
  end

  # Map status codes to HTTP symbols
  def map_http_status_code(code)
    case code
    when 409 then :conflict
    when 402 then :payment_required
    when 502 then :bad_gateway
    else :unprocessable_content
    end
  end

  # Updated signature verification method (fix your existing one)
  # def verify_paystack_signature(payload, signature)
  #   return false unless signature.present? && payload.present?

  #   # Use webhook secret, fallback to secret key for MVP
  #   webhook_secret = ENV['PAYSTACK_WEBHOOK_SECRET'] || ENV['PAYSTACK_SECRET_KEY']
  #   expected = OpenSSL::HMAC.hexdigest('sha512', webhook_secret, payload)

  #   ActiveSupport::SecurityUtils.secure_compare(signature, expected)
  # end
end
