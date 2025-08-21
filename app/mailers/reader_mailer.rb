class ReaderMailer < Devise::Mailer
   default from: 'no-reply@itan.app'
  
  # include Devise::Controllers::UrlHelpers
  default template_path: 'devise/mailer' # Uses Devise email templates for confirmation

  def confirmation_instructions(reader, token, opts = {})
    @reader = reader
    frontend_url = ENV.fetch('READER_FRONTEND_URL', 'http://localhost:3003')
    @confirmation_url = "#{frontend_url}/reader/confirm_email?confirmation_token=#{CGI.escape(token)}&email=#{CGI.escape(reader.email)}"

    opts[:subject] = 'Confirm your Itan account'
    mail(to: @reader.email, subject: opts[:subject])
  end


  # === 2) Welcome email after confirmation ===
  def welcome_email(reader)
    @reader = reader
    mail(
      to: @reader.email,
      subject: 'Welcome to Itan!',
      template_path: 'reader_mailer'
    )
  end

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
