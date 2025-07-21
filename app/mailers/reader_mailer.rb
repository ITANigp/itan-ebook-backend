class ReaderMailer < ApplicationMailer
  default from: 'omololuayk@gmail.com'

  def purchase_receipt(purchase)
    @purchase = purchase
    @reader = purchase.reader
    @book = purchase.book
    @author = @book.author

    # Calculate any additional details
    @purchase_date = @purchase.created_at.strftime('%B %d, %Y at %I:%M %p')
    @transaction_reference = @purchase.transaction_reference
    @content_type = @purchase.content_type.capitalize
    @amount = format('%.2f', @purchase.amount / 100.0)

    # Generate reading token for immediate access
    @reading_token = generate_reading_token(@purchase)

    mail(
      to: @reader.email,
      subject: "Purchase Receipt - #{@book.title}"
    )
  end

  private

  def generate_reading_token(purchase)
    JWT.encode(
      {
        sub: purchase.reader_id,
        purchase_id: purchase.id,
        content_type: purchase.content_type,
        book_id: purchase.book.id,
        exp: 4.hours.from_now.to_i
      },
      ENV.fetch('DEVISE_JWT_SECRET_KEY', nil),
      'HS256'
    )
  end
end
