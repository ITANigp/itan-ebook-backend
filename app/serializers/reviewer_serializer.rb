class ReviewerSerializer
  include JSONAPI::Serializer
  attributes :rating, :comment, :updated_at, :created_at

  # Add reader name as an attribute
  attribute :reader_name do |review|
    "#{review.reader.first_name} #{review.reader.last_name}"
  end

  attribute :book_id
end
