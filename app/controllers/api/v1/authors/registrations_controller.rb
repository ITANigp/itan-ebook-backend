class Api::V1::Authors::RegistrationsController < Devise::RegistrationsController
  require 'httparty'

  include Recaptcha::Adapters::ControllerMethods

  respond_to :json

  def set_flash_message(key, kind, options = {})
    # Do nothing as flash is not available in API-only apps
  end

  def set_flash_message!(key, kind, options = {})
    # Do nothing as flash is not available in API-only apps
  end

  # Override the create method to add reCAPTCHA verification and ensure email confirmation
  def create
    params_token = params[:author][:captchaToken]

    # Get specific error details from reCAPTCHA
    recaptcha_valid = false
    begin
      recaptcha_valid = verify_recaptcha(
        secret_key: ENV.fetch('RECAPTCHA_SECRET_KEY', nil),
        response: params_token # Explicitly pass the token
      )
    rescue StandardError
      Rails.logger.error 'reCAPTCHA verification error'
    end

    if recaptcha_valid
      # Remove captchaToken from params before processing
      params[:author].delete(:captchaToken)

      begin
        create_author_with_confirmation_check
      rescue PG::Error
        Rails.logger.error 'Database error during registration'
        render json: {
          status: { code: '500', message: 'Database connection failed. Please try again.' }
        }, status: :internal_server_error
      rescue StandardError => e
        Rails.logger.error "Registration error: #{e.class}"
        render json: {
          status: { code: '500', message: 'Registration failed due to server error. Please try again.' }
        }, status: :internal_server_error
      end
    else
      render json: {
        status: { code: '422', message: 'reCAPTCHA verification failed' }
      }, status: :unprocessable_entity
    end
  end

  private

  # Simplified method that works with Devise's intended flow
  def create_author_with_confirmation_check
    self.resource = resource_class.new(sign_up_params)

    Rails.logger.error 'Author creation failed' unless resource.save
    respond_with(resource, {})
  end

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: {
        status: { code: 200,
                  message: 'Author registered successfully. Please check your email for confirmation instructions.' },
        data: AuthorSerializer.new(resource).serializable_hash[:data][:attributes]
      }
    else
      error_messages = resource.errors.full_messages.join(', ')
      render json: {
        status: {
          code: 422,
          message: error_messages,
          details: resource.errors.details
        }
      }, status: :unprocessable_content
    end
  end

  def sign_up_params
    params.require(:author).permit(:email, :password, :password_confirmation, :first_name, :last_name, :captchaToken)
  end
end
