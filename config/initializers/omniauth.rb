# Configure OmniAuth for API-only apps with security measures
OmniAuth.config.allowed_request_methods = [:post, :get]
OmniAuth.config.silence_get_warning = true

# Security configurations
OmniAuth.config.request_validation_phase = Proc.new do |env|
  # Log OAuth attempts for monitoring
  Rails.logger.info "OAuth attempt from IP: #{env['REMOTE_ADDR']}"
end

# Remove CSRF protection for OAuth callbacks in development
if Rails.env.development?
  OmniAuth.config.test_mode = false
end

# Production security settings
if Rails.env.production?
  # Only allow HTTPS in production
  OmniAuth.config.full_host = "https://your-backend-domain.com"
end
