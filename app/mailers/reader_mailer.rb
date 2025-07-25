class ReaderMailer < ApplicationMailer
  default from: 'no-reply@example.com'

  def welcome_email(reader)
    @reader = reader
    mail(to: @reader.email, subject: 'Welcome to Our App!')
  end
end
