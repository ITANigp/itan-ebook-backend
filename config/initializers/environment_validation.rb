Rails.application.configure do
  # Validate required environment variables on application boot
  required_env_vars = %w[
    FRONTEND_URL
    GOOGLE_CLIENT_ID
    GOOGLE_CLIENT_SECRET
    DEVISE_JWT_SECRET_KEY
    PAYSTACK_SECRET_KEY
  ]

  missing_vars = required_env_vars.select { |var| ENV[var].blank? }

  if missing_vars.any?
    error_message = "Missing required environment variables: #{missing_vars.join(', ')}"
    Rails.logger.error error_message
    
    if Rails.env.production?
      raise error_message
    else
      Rails.logger.warn "⚠️  #{error_message}"
    end
  end
end
