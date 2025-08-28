class BookDetailSerializer
  include JSONAPI::Serializer

  attributes :id, :title, :slug, :description, :edition_number, :contributors,
             :primary_audience, :publishing_rights, :audiobook_price,
             :unique_book_id, :unique_audio_id, :created_at, :updated_at,
             :ai_generated_image, :explicit_images, :subtitle, :bio,
             :categories, :keywords, :book_isbn, :terms_and_conditions,
             :approval_status, :admin_feedback, :tags, :publisher, :first_name, :last_name,
             :total_pages, :publication_date, :ebook_file_size, :ebook_file_size_human

  attribute :cover_image_url do |book|
    Rails.application.routes.url_helpers.url_for(book.cover_image) if book.cover_image.attached?
  end

  attribute :author do |book|
    { id: book.author.id, name: "#{book.author.first_name} #{book.author.last_name}" }
  end

  attribute :average_rating do |book|
    book.reviews.average(:rating)&.round(2) || 0
  end

  attribute :reviews do |book|
    book.reviews.map do |review|
      {
        id: review.id,
        reader_id: review.reader_id,
        rating: review.rating,
        comment: review.comment,
        created_at: review.created_at
      }
    end
  end

  attribute :reviews_count do |book|
    book.reviews.count
  end

  attribute :likes_count do |book|
    book.likes.count
  end
end
