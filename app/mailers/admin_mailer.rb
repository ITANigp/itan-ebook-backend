# app/mailers/admin_mailer.rb
class AdminMailer < ApplicationMailer
  default from: 'no-reply@itan.app' # Replace with your SES-verified email

  def welcome_email(admin)
    @admin = admin
    mail(
      to: @admin.email,
      subject: 'Welcome to ITAN Admin Panel'
    )
  end
end
