class Api::V1::Authors::SessionsController < Devise::SessionsController
  require 'net/http'
  require 'uri'

  include Recaptcha::Adapters::ControllerMethods

  respond_to :json

  # Skip authentication check for the sign-out action
  skip_before_action :verify_signed_out_user, only: :destroy

  def set_flash_message(key, kind, options = {})
    # Do nothing as flash is not available in API-only apps
  end

  def set_flash_message!(key, kind, options = {})
    # Do nothing as flash is not available in API-only apps
  end

  # Create a session (login attempt)
  def create
    # Verify reCAPTCHA first
    return unless verify_recaptcha_token(params[:author][:captchaToken])

    # IMPORTANT: Clear any existing sessions to prevent authentication conflicts
    sign_out_all_scopes
    reset_session

    # Remove captchaToken to prevent Devise errors
    params[:author].delete(:captchaToken) if params[:author]&.key?(:captchaToken)

    begin
      # First stage authentication with email/password
      Rails.logger.info "🔍 Attempting authentication for email: #{params[:author][:email]}"
      
      # Use direct authentication instead of relying on cached sessions
      author = Author.find_for_authentication(email: params[:author][:email])
      
      if author&.valid_password?(params[:author][:password]) && author.active_for_authentication?
        self.resource = author
        Rails.logger.info "🔍 Authentication successful. User ID: #{resource.id}, Email: #{resource.email}"
        
        # Handle authentication based on 2FA status
        if resource.two_factor_enabled?
          handle_two_factor_authentication
        else
          # No 2FA required, complete login
          sign_in(resource_name, resource)
          Rails.logger.info "🔍 Sign-in completed. Current author: #{current_author&.id}"
          respond_with(resource)
        end
      else
        Rails.logger.error "Authentication failed for email: #{params[:author][:email]}"
        render json: {
          status: { code: 401, message: 'Invalid email or password' }
        }, status: :unauthorized
      end
    rescue StandardError => e
      Rails.logger.error "Authentication error: #{e.message}"
      render json: {
        status: { code: 401, message: 'Invalid email or password' }
      }, status: :unauthorized
    end
  end

  # Helper method for 2FA handling
  def handle_two_factor_authentication
    session[:author_id_for_2fa] = resource.id
    resource.send_two_factor_code

    render json: {
      status: {
        code: 202,
        message: 'Verification code sent to your email or phone',
        requires_verification: true,
        method: resource.preferred_2fa_method
      }
    }, status: :accepted
  end

  private

  def respond_with(resource, _opts = {})
    Rails.logger.info "🔍 respond_with called. Resource ID: #{resource.id}, Email: #{resource.email}"
    Rails.logger.info "🔍 Current author in respond_with: #{current_author&.id}"
    
    if resource.persisted?
      render json: {
        status: { code: 200, message: 'Logged in successfully.' },
        data: AuthorSerializer.new(resource).serializable_hash[:data][:attributes].merge(
          id: AuthorSerializer.new(resource).serializable_hash[:data][:id]
        )
      }
    else
      render json: {
        status: { code: 401, message: "Author couldn't be found." }
      }, status: :unauthorized
    end
  end

  def respond_to_on_destroy
    if current_author
      # Track successful logout if needed
      logger.info "Author #{current_author.id} signed out successfully"
    end

    render json: {
      status: 200,
      message: 'Logged out successfully.'
    }
  end

  def verify_recaptcha_token(token)
    # Skip verification in development environment
    # if Rails.env.development?
    #   Rails.logger.warn "⚠️ BYPASSING reCAPTCHA verification in development!"
    #   return true
    # end

    URI('https://www.google.com/recaptcha/api/siteverify')

    uri = URI('https://www.google.com/recaptcha/api/siteverify')
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.open_timeout = 5
    http.read_timeout = 5

    begin
      response = http.post(uri.path, URI.encode_www_form({
                                                           secret: ENV.fetch('RECAPTCHA_SECRET_KEY', nil),
                                                           response: token
                                                         }))

      result = JSON.parse(response.body)
      recaptcha_valid = result['success'] == true

      Rails.logger.info "reCAPTCHA direct verification: #{result.inspect}"

      unless recaptcha_valid
        render json: {
          status: { code: 422, message: "reCAPTCHA verification failed: #{result['error-codes']}" }
        }, status: :unprocessable_content
        return false
      end
      true
    rescue StandardError => e
      Rails.logger.error "reCAPTCHA verification error: #{e.message}"
      render json: {
        status: { code: 500, message: 'Failed to verify reCAPTCHA' }
      }, status: :internal_server_error
      false
    end
  end
end
