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
    # Add more verbose debugging
    params_token = params[:author][:captchaToken]
    Rails.logger.info "Token length: #{params_token&.length || 'nil'}"

    # Get specific error details from reCAPTCHA
    recaptcha_valid = false
    begin
      recaptcha_valid = verify_recaptcha(
        secret_key: ENV.fetch('RECAPTCHA_SECRET_KEY', nil),
        response: params_token # Explicitly pass the token
      )

      # Log the actual verification response for debugging
      if defined?(Recaptcha.last_verify_response) && Recaptcha.last_verify_response
        Rails.logger.info "reCAPTCHA response: #{Recaptcha.last_verify_response.inspect}"
      end
    rescue StandardError => e
      Rails.logger.error "reCAPTCHA error: #{e.message}"
    end

    Rails.logger.info "reCAPTCHA verification result: #{recaptcha_valid}"

    # Continue with your existing code...
    if recaptcha_valid
      # Remove captchaToken from params before processing
      params[:author].delete(:captchaToken)

      begin
        Rails.logger.info "Attempting to create author with email: #{params[:author][:email]}"

        # Test database connection first
        Rails.logger.info 'Testing database connection...'
        ActiveRecord::Base.connection.execute('SELECT 1')
        Rails.logger.info 'Database connection successful!'

        # Custom registration logic to ensure email is sent before saving
        create_author_with_confirmation_check
      rescue PG::Error => e
        Rails.logger.error "PostgreSQL error during registration: #{e.message}"
        render json: {
          status: { code: '500', message: 'Database connection failed. Please try again.' }
        }, status: :internal_server_error
      rescue StandardError => e
        Rails.logger.error "General error during registration: #{e.message}"
        Rails.logger.error "Error class: #{e.class}"
        Rails.logger.error "Backtrace: #{e.backtrace.first(5).join('\n')}"
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
    Rails.logger.info "Creating author with email: #{sign_up_params[:email]}"

    # Build and save the author - let Devise handle the confirmation flow
    self.resource = resource_class.new(sign_up_params)

    if resource.save
      Rails.logger.info 'Author created successfully - confirmation email will be sent automatically'
    else
      Rails.logger.error "Author creation failed: #{resource.errors.full_messages.join(', ')}"
    end
    respond_with(resource, {})
  end

  def respond_with(resource, _opts = {})
    if resource.persisted?
      Rails.logger.info "Registration successful for #{resource.email}"
      render json: {
        status: { code: 200,
                  message: 'Author registered successfully. Please check your email for confirmation instructions.' },
        data: AuthorSerializer.new(resource).serializable_hash[:data][:attributes]
      }
    else
      # Enhanced error logging
      error_messages = resource.errors.full_messages.join(', ')
      Rails.logger.error "Registration failed: #{error_messages}"

      # Return detailed error response
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
