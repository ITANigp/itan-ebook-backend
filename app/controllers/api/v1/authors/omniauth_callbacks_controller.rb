class Api::V1::Authors::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  # Add security measures
  before_action :verify_oauth_state, :check_oauth_rate_limit, only: [:google_oauth2]

  # Handle OAuth initiation - let parent class handle it
  def passthru
    super
  end

  # Google OAuth callback
  def google_oauth2
    author = Author.from_omniauth(request.env['omniauth.auth'])

    if author && author.persisted?
      if author.two_factor_enabled
        # Store author ID for verification
        session[:author_id_for_2fa] = author.id
        # Send verification code
        author.send_two_factor_code

        # Redirect to frontend with 2FA requirement
        redirect_to "#{frontend_url}/auth/mfa/verify", allow_other_host: true
      else
        # Sign in and redirect to frontend
        sign_in(author)

        redirect_to "#{frontend_url}/auth/callback", allow_other_host: true
      end
    else
      # Handle case where author couldn't be created/found
      redirect_to "#{frontend_url}/author/sign_in?error=oauth_failed", allow_other_host: true
    end
  end

  # Handle general OAuth failures
  def failure
    redirect_to "#{frontend_url}/author/sign_in?error=#{params[:message]}", allow_other_host: true
  end

  private

  # Get frontend URL with validation
  def frontend_url
    url = ENV.fetch('FRONTEND_URL', nil)

    if url.blank?
      Rails.logger.error 'FRONTEND_URL environment variable is not set!'
      raise 'Missing FRONTEND_URL configuration'
    end

    url
  end

  # Verify OAuth state parameter to prevent CSRF attacks
  def verify_oauth_state
    return if params[:state].present?

    Rails.logger.warn 'OAuth CSRF: Missing state parameter'
    redirect_to_frontend_with_error('Invalid OAuth request')
    nil
  end

  # Rate limiting for OAuth attempts
  def check_oauth_rate_limit
    ip_key = "oauth_attempts:#{request.remote_ip}"
    attempts = Rails.cache.read(ip_key) || 0

    if attempts >= 20
      Rails.logger.warn "OAuth rate limit exceeded for IP: #{request.remote_ip}"
      redirect_to_frontend_with_error('Too many authentication attempts')
      return
    end

    Rails.cache.write(ip_key, attempts + 1, expires_in: 1.hour)
  end

  def redirect_to_frontend_with_error(error_message)
    redirect_to "#{frontend_url}/author/sign_in?error=#{error_message}", allow_other_host: true
  end
end
