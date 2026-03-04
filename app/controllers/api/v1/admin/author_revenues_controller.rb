class Api::V1::Admin::AuthorRevenuesController < ApplicationController
  before_action :authenticate_admin!

  # GET /api/v1/admin/author_revenues
  def index
    # Step 1: Check if the basic query returns results
    AuthorRevenue.where(status: 'pending')

    # Step 2: Check if the grouped query returns results
    grouped_data = AuthorRevenue.where(status: 'pending')
      .group(:author_id)
      .select('author_id, SUM(amount) as total_amount, COUNT(*) as pending_count')

    # Step 3: Check what happens when we add includes
    with_includes = grouped_data.includes(:author)

    # Step 4: Try with pagination
    @pending_by_author = with_includes.page(params[:page]).per(20)

    # Continue with your existing render code
    render json: {
      pending_by_author: @pending_by_author.map do |record|
        author = Author.find(record.author_id)
        {
          author_id: record.author_id,
          author_first_name: author.first_name,
          author_last_name: author.last_name,
          email: author.email,
          total_pending_amount: record.total_amount,
          pending_count: record.pending_count
        }
      end,
      pagination: {
        total_pages: @pending_by_author.total_pages,
        current_page: @pending_by_author.current_page,
        total_count: @pending_by_author.total_count
      }
    }
  end

  def processed_batches
    # Get all batches that have been processed (approved or transferred)
    batch_results = AuthorRevenue.where(status: %w[approved transferred])
      .where.not(payment_batch_id: nil)
      .group(:payment_batch_id)
      .select('payment_batch_id, SUM(amount) as total_amount, COUNT(*) as items_count, MIN(paid_at) as approved_date,
                                        COUNT(CASE WHEN status = \'approved\' THEN 1 END) as approved_count,
                                        COUNT(CASE WHEN status = \'transferred\' THEN 1 END) as transferred_count')
      .order('MIN(paid_at) DESC')
      .to_a

    # Paginate manually
    total_count = batch_results.length
    page = (params[:page] || 1).to_i
    per_page = 20

    total_pages = (total_count.to_f / per_page).ceil
    offset = (page - 1) * per_page
    paginated_batches = batch_results[offset, per_page] || []

    render json: {
      processed_batches: build_processed_batches_response(paginated_batches),
      pagination: {
        total_pages: total_pages,
        current_page: page,
        total_count: total_count
      }
    }
  end

  def transferred_batches
    # Get only batches that have been fully transferred
    batch_results = AuthorRevenue.where(status: 'transferred')
      .where.not(payment_batch_id: nil)
      .group(:payment_batch_id)
      .select('payment_batch_id, SUM(amount) as total_amount, COUNT(*) as items_count,
                                        MIN(paid_at) as approved_date, MAX(updated_at) as transferred_date')
      .order('MAX(updated_at) DESC')
      .to_a

    # Paginate manually
    total_count = batch_results.length
    page = (params[:page] || 1).to_i
    per_page = 20

    total_pages = (total_count.to_f / per_page).ceil
    offset = (page - 1) * per_page
    paginated_batches = batch_results[offset, per_page] || []

    render json: {
      transferred_batches: build_transferred_batches_response(paginated_batches),
      pagination: {
        total_pages: total_pages,
        current_page: page,
        total_count: total_count
      }
    }
  end

  # GET /api/v1/admin/author_revenues/:author_id
  def show
    @author = Author.find(params[:id])
    @pending_revenues = AuthorRevenue.pending
      .where(author_id: params[:id])
      .includes(purchase: :book)
      .page(params[:page]).per(20)

    render json: {
      author: {
        id: @author.id,
        name: "#{@author.first_name} #{@author.last_name}",
        email: @author.email
      },
      pending_revenues: @pending_revenues.map do |rev|
        purchase = rev.purchase
        book = purchase&.book
        reader = purchase&.reader

        {
          id: rev.id,
          amount: truncate_to_3dp_string(rev.amount),
          status: rev.status,
          created_at: rev.created_at,
          book: {
            id: book&.id,
            title: book&.title || 'Unknown Book',
            author_name: book&.author ? "#{book.author.first_name} #{book.author.last_name}" : "#{@author.first_name} #{@author.last_name}"
            # cover_url: book.respond_to?(:cover_url) ? book.cover_url : nil
          },
          purchase: {
            id: purchase&.id,
            content_type: purchase&.content_type,
            purchase_date: purchase&.created_at,
            price: purchase&.amount
          },
          file_size_mb: calculate_file_size(purchase),
          reader: {
            id: reader&.id,
            reader_name: reader ? "#{reader.first_name} #{reader.last_name}" : nil
          }
        }
      end,
      pagination: {
        total_pages: @pending_revenues.total_pages,
        current_page: @pending_revenues.current_page,
        total_count: @pending_revenues.total_count
      }
    }
  end

  def process_payments
    # # Only allow processing in the last 3 days of the month
    # unless Date.today >= Date.today.end_of_month - 2.days
    #   render json: {
    #     error: "Payments can only be processed during the last 3 days of the month (#{(Date.today.end_of_month - 2.days).strftime('%B %d')} - #{Date.today.end_of_month.strftime('%B %d')})",
    #     days_until_processing: (Date.today.end_of_month - 2.days - Date.today).to_i
    #   }, status: :unprocessable_entity
    #   return
    # end

      # Only allow processing in the first 7 days of the month
    unless Date.today.day <= 7
      render json: {
      error: "Payments can only be processed during the first 7 days of the month (1 - 7)",
      days_until_processing: Date.today.day <= 7 ? 0 : (Date.today.end_of_month + 7.days - Date.today).to_i
      }, status: :unprocessable_entity
      return
    end

    author_ids = params[:author_ids] || []
    min_payment_threshold = ENV.fetch('MIN_PAYMENT_THRESHOLD', 1.0).to_f
    processed_authors = []
    skipped_authors = []

    if author_ids.empty?
      render json: { error: 'No authors selected' }, status: :bad_request
      return
    end

    batch_id = "BATCH-#{SecureRandom.hex(8)}"

    begin
      AuthorRevenue.transaction do
        # Process each selected author from the parameters
        author_ids.each do |author_id|
          author = Author.find(author_id)

          # Get pending revenues for this author
          pending_revenues = AuthorRevenue.where(
            author_id: author_id,
            status: 'pending'
          )

          total_amount = pending_revenues.sum(:amount).to_f
          sale_count = pending_revenues.count

          # Skip authors below threshold
          if total_amount < min_payment_threshold
            skipped_authors << {
              author_id: author_id,
              amount: total_amount,
              reason: 'Below payment threshold'
            }
            next
          end

          next unless pending_revenues.any?

          payment_ref = "PAY-#{SecureRandom.hex(6)}"

          pending_revenues.update_all(
            status: 'approved',
            paid_at: Time.current,
            payment_batch_id: batch_id,
            payment_reference: payment_ref,
            notes: "Approved in batch #{batch_id}"
          )

          # Add to processed authors AFTER creating the payment_ref
          processed_authors << {
            author_id: author_id,
            amount: total_amount,
            payment_reference: payment_ref,
            batch_id: batch_id
          }

          # Send email with correct values
          AuthorMailer.payment_processed(
            author,
            total_amount,
            sale_count,
            payment_ref
          ).deliver_later
        end
      end

      # Return detailed response with both processed and skipped authors
      render json: {
        success: true,
        batch_id: batch_id,
        message: 'Payment processing completed',
        processed: {
          count: processed_authors.length,
          authors: processed_authors
        },
        skipped: {
          count: skipped_authors.length,
          authors: skipped_authors
        }
      }
    rescue StandardError => e
      Rails.logger.error("Payment processing failed: #{e.message}")
      render json: { success: false, error: e.message }, status: :unprocessable_entity
    end
  end

  def transfer_funds
    batch_id = params[:batch_id]

    # First check if batch_id exists
    unless batch_id.present?
      render json: { error: 'Batch ID required' }, status: :bad_request
      return
    end

    # Then check if batch exists
    batch_payments = AuthorRevenue.where(payment_batch_id: batch_id)
    if batch_payments.empty?
      render json: { error: 'No payments found with this batch ID' }, status: :not_found
      return
    end

    # Check if payments in this batch are ready for transfer
    # earliest_approval = batch_payments.minimum(:paid_at)

    # if earliest_approval && earliest_approval > 14.days.ago
    #   days_remaining = (earliest_approval + 14.days - Time.current).to_i / 1.day
    #   render json: {
    #     error: 'Payments not yet eligible for transfer',
    #     eligible_date: (earliest_approval + 14.days).strftime('%Y-%m-%d'),
    #     days_remaining: days_remaining
    #   }, status: :unprocessable_entity
    #   return
    # end

    results = TransferProcessor.process_batch(batch_id)

    if results[:success].empty? && results[:failed].empty?
      render json: { success: true, message: 'No approved payments found for this batch. Nothing to transfer.' }
    else
      render json: {
        success: true,
        transfer_successful: results[:success],
        transfer_failed: results[:failed]
      }
    end
  end

  def transferred_authors
    transferred = AuthorRevenue.where(status: 'transferred')
      .group(:author_id)
      .select('author_id, SUM(amount) as total_transferred, COUNT(*) as transfer_count')

    result = transferred.map do |record|
      author = Author.find(record.author_id)
      {
        author_id: record.author_id,
        author_name: "#{author.first_name} #{author.last_name}",
        email: author.email,
        total_transferred: record.total_transferred,
        transfer_count: record.transfer_count
      }
    end

    render json: { transferred_authors: result }
  end

  private

  # Helper to truncate to 3 decimal places and return as string
  def truncate_to_3dp_string(value)
    return '0.000' if value.nil?
    v = value.is_a?(BigDecimal) ? value : BigDecimal(value.to_s)
    truncated = (v * 1000).floor / BigDecimal('1000')
    format('%.3f', truncated)
  end

  def calculate_file_size(purchase)
    return 0 unless purchase&.book

    case purchase.content_type
    when 'ebook'
      purchase.book.ebook_file&.byte_size.to_f / (1024 * 1024)
    when 'audiobook'
      purchase.book.audio_file&.byte_size.to_f / (1024 * 1024)
    else
      0
    end.round(2)
  end

  def build_processed_batches_response(processed_batches)
    processed_batches.map do |batch|
      authors = Author.joins(:author_revenues)
        .where(author_revenues: { payment_batch_id: batch.payment_batch_id })
        .distinct

      # Determine batch status based on counts
      batch_status = if batch.try(:transferred_count) && batch.transferred_count > 0
                       batch.approved_count > 0 ? 'partially_transferred' : 'transferred'
                     else
                       'approved'
                     end

      {
        batch_id: batch.payment_batch_id,
        total_amount: batch.total_amount,
        items_count: batch.items_count,
        approved_date: batch.approved_date&.iso8601,
        status: batch_status,
        approved_count: batch.try(:approved_count) || 0,
        transferred_count: batch.try(:transferred_count) || 0,
        authors: authors.map do |author|
          {
            id: author.id,
            name: "#{author.first_name} #{author.last_name}",
            email: author.email
          }
        end
      }
    end
  end

  def build_transferred_batches_response(transferred_batches)
    transferred_batches.map do |batch|
      authors = Author.joins(:author_revenues)
        .where(author_revenues: { payment_batch_id: batch.payment_batch_id, status: 'transferred' })
        .distinct

      {
        batch_id: batch.payment_batch_id,
        total_amount: batch.total_amount,
        items_count: batch.items_count,
        approved_date: batch.approved_date&.iso8601,
        transferred_date: batch.transferred_date&.iso8601,
        status: 'transferred',
        authors: authors.map do |author|
          {
            id: author.id,
            name: "#{author.first_name} #{author.last_name}",
            email: author.email
          }
        end
      }
    end
  end
end
