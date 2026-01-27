class Api::V1::BooksController < ApplicationController
  # Load the book resource
  before_action :set_book, only: %i[show update destroy]

  # Author-specific actions
  before_action :authenticate_author!, only: %i[create update destroy my_books]
  before_action :authorize_author!, only: %i[update destroy]

  # Normalize JSON arrays for book attributes
  before_action :normalize_json_arrays, only: %i[create update]

  before_action :convert_price_to_cents, only: %i[create update]

  respond_to :json

  # GET /api/v1/books # Show only approved books to everyone
  def index
    @books = Book.includes(:author, :reviews, :likes, cover_image_attachment: :blob)
      .where(approval_status: 'approved')
      .order(created_at: :desc)

    render json: BookSummarySerializer.new(@books).serializable_hash
  end

  # GET /api/v1/books/my_books
  def my_books
    @books = current_author.books.includes(cover_image_attachment: :blob).order(created_at: :desc)
    render_books_json(@books)
  end

  # GET /api/v1/books/:id
  def show
    render_books_json(@book)
  end


  # GET /api/v1/books/storefront
def all_storefront
  books = Book.includes(:author, :reviews, :likes, cover_image_attachment: :blob)
              .where(approval_status: 'approved')
              .order(created_at: :desc)
  
  # Restart your server after changing the serializer file!
  render json: BookSummarySerializer.new(books).serializable_hash
end

  # /api/v1/books/:id/storefront
  def storefront
    @book = Book.includes(:author, :reviews, :likes, cover_image_attachment: :blob)
      .find(params[:id])

    if @book.approval_status != 'approved'
      render json: { error: 'Book not available' }, status: :not_found
      return
    end

    render json: StorefrontBookSerializer.new(@book).serializable_hash
  end

  # POST /api/v1/books
  def create
    @book = current_author.books.new(book_params)
    begin
      if create_book_with_attachments
        render_success_response(@book, 'Book created successfully.')
      else
        render_error_response(@book.errors.present? ? @book.errors.full_messages.join(', ') : 'Failed to create book')
      end
    rescue ActiveStorage::IntegrityError => e
      handle_integrity_error(e)
    rescue StandardError => e
      handle_standard_error(e)
    end
  end

  # PUT/PATCH /api/v1/books/:id
  def update
    if @book.update(book_params)
      render json: {
        status: { code: 200, message: 'Book updated successfully.' },
        data: BookSerializer.new(@book).serializable_hash[:data][:attributes]
      }
    else
      render json: {
        status: { code: 422, message: @book.errors.full_messages.join(', ') }
      }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/books/:id
  def destroy
    @book.destroy

    render json: {
      status: { code: 200, message: 'Book deleted successfully.' }
    }
  end

  def content
    # Get reading token from Authorization header
    token = request.headers['Authorization']&.split(' ')&.last

    return render json: { error: 'Authentication token required' }, status: :unauthorized unless token

    begin
      # Decode and verify token
      payload = JWT.decode(token, ENV.fetch('DEVISE_JWT_SECRET_KEY', nil), true, { algorithm: 'HS256' })[0]

      # Check if token has expired
      if Time.at(payload['exp']) < Time.current
        return render json: { error: 'Token has expired' }, status: :unauthorized
      end

      # Find the reader from the token
      reader = Reader.find(payload['sub'])

      # Get the book
      book = Book.find(params[:id])

      # Check access: either trial is active OR reader owns the book
      unless reader.trial_active? || reader.owns_book?(book)
        return render json: { error: 'Access denied. Please purchase this book or use your free trial.' },
                      status: :payment_required
      end

      content_type = if payload['content_type'].present?
                       # This is a reading token (from purchase)
                       payload['content_type']
                     else
                       # This is a regular reader token (from login) - default for trial
                       ENV.fetch('DEFAULT_TRIAL_CONTENT_TYPE', 'ebook')
                     end

      # Auto-detect EPUB readers and provide binary streaming
      if content_type == 'ebook' && book.ebook_file.attached? && epub_reader_detected?
        Rails.logger.info "=== BINARY STREAMING DETECTED ==="
        Rails.logger.info "User-Agent: #{request.headers['User-Agent']}"
        Rails.logger.info "Accept: #{request.headers['Accept']}"
        Rails.logger.info "Binary stream requested for book: #{book.title}"
        
        # Stream binary content directly
        return stream_binary_content(book.ebook_file, book.title)
      end

      # Determine if direct URLs are requested
      use_direct_urls = params[:direct_url] == 'true'

      if content_type == 'ebook'
        # For ebooks: Return file URL or relevant data
        if book.ebook_file.attached?
          # Generate URL based on request type
          url = generate_file_url(book.ebook_file, use_direct: use_direct_urls, reader: reader)

          render json: {
            title: book.title,
            url: url,
            format: book.ebook_file.content_type || 'application/pdf'
          }
        else
          render json: {
            title: book.title,
            error: 'Book content not available',
            format: 'unknown'
          }, status: :not_found
        end
      elsif book.audiobook_file.attached?
        # For audiobooks: Return streaming URL or file URLs
        url = generate_file_url(book.audiobook_file, use_direct: use_direct_urls, reader: reader)

        render json: {
          title: book.title,
          audio_files: [url],
          duration: book.respond_to?(:audio_duration) ? book.audio_duration : 0
        }
      else
        render json: {
          title: book.title,
          error: 'Audiobook content not available',
          audio_files: []
        }, status: :not_found
      end
    rescue JWT::DecodeError
      render json: { error: 'Invalid reading token' }, status: :unauthorized
    rescue ActiveRecord::RecordNotFound => e
      Rails.logger.error "Record not found in content method: #{e.message}"
      render json: { error: 'Resource not found' }, status: :not_found
    rescue StandardError => e
      Rails.logger.error "Error serving book content: #{e.message}\n#{e.backtrace.join("\n")}"
      render json: { error: 'Error retrieving book content' }, status: :internal_server_error
    end
  end

  # def show_by_slug
  #   # Join array if Rails routed slug as splat parameter
  #   slug_param = params[:slug]
  #   # slug = slug_param.is_a?(Array) ? slug_param.join("/") : slug_param

  #   book = Book.find_by(slug: slug_param, approval_status: 'approved')

  #   if book
  #      render json: BookSummarySerializer.new(book).serializable_hash[:data][:attributes]
  #   else
  #     render json: { error: "Book not found or not approved" }, status: :not_found
  #   end
  # end

  def show_by_slug
  # Eager load to avoid N+1 and include reviews/author
  book = Book.includes(:author, :reviews, :likes, cover_image_attachment: :blob)
             .find_by(slug: params[:slug], approval_status: 'approved')

  if book
    # Return the full serializable_hash so the frontend gets "id" and "attributes"
    render json: BookSummarySerializer.new(book).serializable_hash
  else
    render json: { error: "Book not found or not approved" }, status: :not_found
  end
end

  # def categories
  #   all_categories = Book.where(approval_status: 'approved').pluck(:categories).compact
  #   category_objects = all_categories.flatten
  #   mains = category_objects.map { |cat| cat["main"]&.strip }.compact.uniq.sort
  #   render json: { categories: mains.map { |name| { name: name } } }
  # end

  private

  def create_book_with_attachments
    return false unless @book.save

    # Verify attachments
    return true if @book.cover_image.attached? && @book.ebook_file.attached?

    # Clean up if attachments failed
    missing = []
    missing << 'cover image' unless @book.cover_image.attached?
    missing << 'ebook file' unless @book.ebook_file.attached?

    @book.destroy
    @book.errors.add(:base, "Failed to attach #{missing.join(' and ')}.")
    false
  end

  def render_success_response(book, message)
    render json: {
      status: { code: 200, message: message },
      data: BookSerializer.new(book).serializable_hash[:data][:attributes]
    }
  end

  def render_error_response(message, status = :unprocessable_entity)
    render json: {
      status: { code: status == :unprocessable_entity ? 422 : 500, message: message }
    }, status: status
  end

  def handle_integrity_error(error)
    @book.destroy if @book.persisted?
    # Rails.logger.error "S3 Integrity Error: #{error.message}"
    # Rails.logger.error "S3 Integrity Error details: #{error.backtrace.join("\n")}"
    render_error_response('Upload integrity error. Please try again.')
  end

  def handle_standard_error(error)
    Rails.logger.error "Error creating book: #{error.message}\n#{error.backtrace.join("\n")}"
    render_error_response("Server error: #{error.message}", :internal_server_error)
  end

  def render_books_json(books, message = nil, status_code = 200)
    response = {
      status: { code: status_code }
    }

    # Add message if provided
    response[:status][:message] = message if message

    # Handle both collections and single records
    response[:data] = if books.is_a?(Book)
                        # Single book
                        BookSerializer.new(books).serializable_hash[:data][:attributes]
                      else
                        # Collection of books
                        BookSerializer.new(books).serializable_hash[:data].map { |book| book[:attributes] }
                      end

    render json: response
  end

  # Used to manage error, record not found
  def set_book
    @book = Book.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: {
      status: { code: 404, message: 'Book not found' }
    }, status: :not_found
  end

  def authorize_author!
    return if @book.author_id == current_author.id

    render json: {
      status: { code: 403, message: 'You are not authorized to perform this action' }
    }, status: :forbidden
  end

  def audio_url(file)
    # Replace with appropriate URL generation for your storage solution
    # For ActiveStorage:
    # Rails.application.routes.url_helpers.rails_blob_url(file, only_path: false)
    # For simple paths:
    "/storage/audiobooks/#{File.basename(file)}"
  end

  def normalize_json_arrays
    %i[contributors categories keywords tags].each do |field|
      next unless params[:book][field].is_a?(String)

      begin
        params[:book][field] = JSON.parse(params[:book][field])
      rescue JSON::ParserError
        Rails.logger.warn("Failed to parse JSON for #{field}")
        params[:book][field] = []
      end
    end
  end

  def convert_price_to_cents
    return unless params[:book][:ebook_price].present?

    begin
      # Convert from decimal dollars to integer cents
      dollars = BigDecimal(params[:book][:ebook_price])
      params[:book][:ebook_price] = (dollars * 100).round
      Rails.logger.info "Converted price: $#{dollars} → #{params[:book][:ebook_price]} cents"
    rescue ArgumentError => e
      Rails.logger.warn "Failed to convert price: #{e.message}"
    end
  end

  def epub_reader_detected?
    Rails.logger.debug "Checking EPUB reader detection..."
    Rails.logger.debug "User-Agent: #{request.user_agent}"
    Rails.logger.debug "Accept header: #{request.headers['Accept']}"
    
    # Check for explicit EPUB request in Accept header
    epub_accept = request.headers['Accept']&.include?('application/epub+zip')
    
    # Check for EPUB reader user agents
    user_agent = request.user_agent&.downcase || ''
    epub_user_agent = user_agent.include?('epub') || 
                      user_agent.include?('readium') ||
                      user_agent.include?('adobe digital editions') ||
                      user_agent.include?('foliate')
    
    # Check for frontend EPUB viewer (browser-based)
    frontend_request = request.headers['X-EPUB-Reader'] == 'true' ||
                       request.referer&.include?('book-viewer') ||
                       params[:format] == 'epub'
    
    result = epub_accept || epub_user_agent || frontend_request
    Rails.logger.debug "EPUB reader detected: #{result} (accept: #{epub_accept}, user_agent: #{epub_user_agent}, frontend: #{frontend_request})"
    result
  end

  def stream_binary_content(attachment, book_title)
    Rails.logger.info "Streaming binary content for: #{book_title}"
    
    # Set CORS headers for cross-origin requests
    response.headers['Access-Control-Allow-Origin'] = request.headers['Origin'] || '*'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Expose-Headers'] = 'Content-Disposition, Content-Type, Content-Length'
    
    # Set appropriate headers for EPUB download
    response.headers['Content-Type'] = 'application/epub+zip'
    response.headers['Content-Disposition'] = "inline; filename=\"#{book_title.gsub(/[^\w\-_\.]/, '_')}.epub\""
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    
    if attachment.service_name == :amazon && Rails.env.production?
      # For S3 in production, redirect to presigned URL with CORS headers
      presigned_url = attachment.url(expires_in: 1.hour, disposition: :inline)
      Rails.logger.info "Redirecting to S3 presigned URL: #{presigned_url[0..50]}..."
      redirect_to presigned_url, allow_other_host: true
    else
      # For local development or other storage, stream directly
      Rails.logger.info "Streaming file directly from #{attachment.service_name}"
      send_data attachment.download, 
                type: 'application/epub+zip',
                disposition: 'inline',
                filename: "#{book_title.gsub(/[^\w\-_\.]/, '_')}.epub"
    end
  end

  def book_params
    params.require(:book).permit(
      :title, :description, :edition_number, :primary_audience,
      :publishing_rights, :ebook_price, :audiobook_price,
      :cover_image, :audiobook_file, :ebook_file, :ai_generated_image,
      :explicit_images, :subtitle, :bio, :book_isbn, :total_pages,
      :terms_and_conditions, :publisher, :first_name, :last_name,
      { contributors: %i[role firstName lastName] },
      { categories: %i[main sub detail] },
      keywords: [], tags: []
    )
  end
end
