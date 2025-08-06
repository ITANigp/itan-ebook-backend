class EmailDeliveryObserver
  def self.delivered_email(message)
    Rails.logger.info "Email delivered successfully to: #{message.to}"
  end

  def self.delivery_error(message, error)
    Rails.logger.error "Email delivery failed to: #{message.to}, Error: #{error.message}"
    # You could also send this to an error tracking service like Rollbar or Sentry
  end
end

# Register the observer for all environments
if Rails.env.development? || Rails.env.production?
  ActionMailer::Base.register_observer(EmailDeliveryObserver)
end
