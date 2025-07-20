# Configure OmniAuth for API-only apps
OmniAuth.config.allowed_request_methods = [:post, :get]
OmniAuth.config.silence_get_warning = true

# Remove CSRF protection for OAuth callbacks in development
if Rails.env.development?
  OmniAuth.config.test_mode = false
end
