class BookSummarySerializer
  include JSONAPI::Serializer

  attributes :title, :slug, :categories, :approval_status,
             :description, :total_pages, :cover_image_url,
             :ebook_file_size_human, :author, :average_rating,
             :ebook_price, :likes_count, :reviews, :reviews_count

  attribute :cover_image_url do |book|
    Rails.application.routes.url_helpers.url_for(book.cover_image) if book.cover_image.attached?
  end

  attribute :author do |book|
    {
      id: book.author.id,
      name: "#{book.first_name} #{book.last_name}"
    }
  end

  attribute :publication_date do |book|
    book.created_at.strftime('%B %d, %Y') if book.created_at
  end
  
  attribute :average_rating do |book|
    book.reviews.average(:rating)&.round(2) || 0
  end

  attribute :reviews_count do |book|
    book.reviews.count
  end

  attribute :reviews do |book|
    book.reviews.map do |review|
      {
        id: review.id,
        comment: review.comment,
        rating: review.rating,
        reviewer: if review.reader.respond_to?(:full_name)
                    review.reader.full_name
                  elsif review.reader.respond_to?(:first_name) && review.reader.respond_to?(:last_name)
                    "#{review.reader.first_name} #{review.reader.last_name}".strip
                  else
                    review.reader.email
                  end
      }
    end
  end

  attribute :likes_count do |book|
    book.likes.count
  end

  attribute :ebook_price do |book|
    book.ebook_price ? (book.ebook_price / 100.0) : nil
  end
end
