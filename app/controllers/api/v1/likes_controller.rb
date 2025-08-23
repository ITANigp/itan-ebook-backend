class Api::V1::LikesController < ApplicationController
  # before_action :authenticate_reader!

  def index
    likes = current_reader.likes.includes(book: { cover_image_attachment: :blob }).order(created_at: :desc)
    render json: {
      status: { code: 200 },
      data: likes.map do |like|
        {
          id: like.id,
          book: {
            id: like.book.id,
            title: like.book.title,
            author: "#{like.book.author.first_name} #{like.book.author.last_name}",
            cover_image_url: (
              Rails.application.routes.url_helpers.url_for(like.book.cover_image) if like.book.cover_image.attached?
            )
          },
          liked_at: like.created_at
        }
      end
    }
  end

  def create
    @like = Like.find_or_create_by(reader: current_reader, book_id: params[:book_id])
    
    if @like.persisted?
      render json: { 
        message: 'Book liked successfully', 
        liked: true,
        like_id: @like.id
      }, status: :ok
    else
      render json: { 
        errors: @like.errors.full_messages 
      }, status: :unprocessable_entity
    end
  end

  def show
    # Handle both /api/v1/likes/book-id and /api/v1/likes?book_id=book-id
    book_id = params[:id] || params[:book_id]
    like = current_reader.likes.find_by(book_id: book_id)
    
    if like
      render json: {
        id: like.id,
        book_id: like.book_id,
        liked_at: like.created_at,
        liked: true
      }
    else
      render json: { 
        error: 'Like not found',
        liked: false 
      }, status: :not_found
    end
  end

  def destroy
    like = Like.find_by(id: params[:id], reader_id: current_reader.id)
    
    if like
      like.destroy
      render json: { 
        message: 'Book unliked successfully', 
        liked: false 
      }, status: :ok
    else
      render json: { error: 'Like not found' }, status: :not_found
    end
  end
end
