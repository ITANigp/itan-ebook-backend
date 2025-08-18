class ApplicationMailer < ActionMailer::Base
  default from: 'no-reply@itan.app', reply_to: 'no-reply@itan.app'
  layout 'mailer'
end
