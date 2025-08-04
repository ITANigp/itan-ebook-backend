class ApplicationMailer < ActionMailer::Base
  default from: 'noreply@itan.app', reply_to: 'noreply@itan.app'
  layout 'mailer'
end
