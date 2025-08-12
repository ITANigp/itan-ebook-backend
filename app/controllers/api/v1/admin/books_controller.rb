class Api::V1::Admin::BooksController < ApplicationController
  before_action :authenticate_admin!
  before_action :set_book, only: %i[show approve reject]

  # GET /api/v1/admin/books
  def index
    @books = Book.includes(:author, cover_image_attachment: :blob)
      .order(created_at: :desc)

    @books = case params[:status]
             when 'pending' then @books.pending
             when 'approved' then @books.approved
             when 'rejected' then @books.rejected
             else @books
             end

    render_books_json(@books)
  end

  # GET /api/v1/admin/books/:id
  def show
    render_books_json(@book)
  end

  # PATCH /api/v1/admin/books/:id/approve
  def approve
    update_book_status('approved', 'Book approved successfully. Slug has been generated.')
  end

  # PATCH /api/v1/admin/books/:id/reject
  def reject
    update_book_status('rejected', 'Book rejected.')
  end

  private

  def set_book
    @book = Book.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { status: { code: 404, message: 'Book not found' } }, status: :not_found
  end

  def render_books_json(books, message = nil, status_code = 200)
    response = { status: { code: status_code } }
    response[:status][:message] = message if message

    response[:data] =
      if books.is_a?(Book)
        BookSerializer.new(books).serializable_hash[:data][:attributes]
      else
        BookSerializer.new(books).serializable_hash[:data].map { |book| book[:attributes] }
      end

    render json: response
  end

  def process_book_attributes
    @book.keywords = @book.keywords.split(',').map(&:strip) if @book.keywords.is_a?(String)
    @book.tags = @book.tags.split(',').map(&:strip) if @book.tags.is_a?(String)
  end

  def update_book_status(status, success_message)
    if params[:admin_feedback].blank?
      return render json: {
        status: { code: 422, message: 'Admin feedback is required.' }
      }, status: :unprocessable_entity
    end

    process_book_attributes

    if @book.update(approval_status: status,
                    admin_feedback: params[:admin_feedback],
                    admin: current_admin)
      render_books_json(@book, success_message, 200)
    else
      render json: {
        status: { code: 422, message: @book.errors.full_messages.join(', ') }
      }, status: :unprocessable_entity
    end
  end
end
