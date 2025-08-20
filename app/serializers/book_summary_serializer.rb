class BookSummarySerializer
  include JSONAPI::Serializer

  attributes :title, :slug, :categories, :approval_status

  attribute :cover_image_url do |book|
    Rails.application.routes.url_helpers.url_for(book.cover_image) if book.cover_image.attached?
  end

  attribute :author do |book|
    {
      id: book.author.id,
      name: "#{book.first_name} #{book.last_name}"
    }
  end

  attribute :average_rating do |book|
    book.reviews.average(:rating)&.round(2) || 0
  end

  attribute :likes_count do |book|
    book.likes.count
  end

  attribute :ebook_price do |book|
    book.ebook_price ? (book.ebook_price / 100.0) : nil
  end
end
