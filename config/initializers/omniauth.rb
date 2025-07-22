# Configure OmniAuth for API-only apps with security measures
OmniAuth.config.allowed_request_methods = [:post, :get]
OmniAuth.config.silence_get_warning = true

# Security configurations
OmniAuth.config.request_validation_phase = Proc.new do |env|
  # Log OAuth attempts for monitoring
  Rails.logger.info "OAuth attempt from IP: #{env['REMOTE_ADDR']}"
end

# Development-specific configurations
if Rails.env.development?
  # Allow HTTP in development (HTTPS required in production)
  OmniAuth.config.full_host = nil
  
  # Optional: Enable test mode for automated testing
  # OmniAuth.config.test_mode = true  # Uncomment only for testing
end

# Production security settings
if Rails.env.production?
  # Set the full host to ensure correct redirect URI generation  
  backend_url = ENV['BACKEND_URL']
  if backend_url.present?
    OmniAuth.config.full_host = backend_url
    Rails.logger.info "OmniAuth full_host set to: #{backend_url}"
  else
    Rails.logger.warn "BACKEND_URL not set - OmniAuth may generate incorrect redirect URIs"
  end
end
