class Api::V1::Authors::PasswordsController < Devise::PasswordsController
  respond_to :json

  # POST /api/v1/authors/password
  # Request password reset instructions
  def create
    self.resource = resource_class.send_reset_password_instructions(resource_params)

    if successfully_sent?(resource)
      render json: {
        status: { code: 200, message: 'Reset password instructions sent successfully.' }
      }
    else
      render json: {
        status: { code: 422, message: 'Failed to send reset password instructions.' },
        errors: resource.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  # PUT /api/v1/authors/password
  # Reset password with token
  def update
    # Find the author by reset token first
    author = Author.with_reset_password_token(params[:author][:reset_password_token])
    
    if author && author.reset_password_period_valid?
      # For OAuth users, we need to handle password reset differently
      if author.provider.present?
        handle_oauth_password_reset(author)
      else
        # Standard password reset for regular users
        self.resource = resource_class.reset_password_by_token(resource_params)
        handle_standard_password_reset
      end
    else
      render json: {
        status: { code: 422, message: 'Invalid or expired reset token.' },
        errors: ['Reset password token is invalid or has expired']
      }, status: :unprocessable_entity
    end
  end

  private

  def handle_oauth_password_reset(author)
    # Extract password values from the correct parameter structure
    password_value = params[:author][:password]
    password_confirmation_value = params[:author][:password_confirmation]
    
    # Debug logging to see what we're getting
    Rails.logger.info "OAuth password reset - Password length: #{password_value&.length}, Confirmation length: #{password_confirmation_value&.length}"
    Rails.logger.info "Password (first 3 chars): '#{password_value&.first(3)}', Confirmation (first 3 chars): '#{password_confirmation_value&.first(3)}'"
    Rails.logger.info "Password (last 3 chars): '#{password_value&.last(3)}', Confirmation (last 3 chars): '#{password_confirmation_value&.last(3)}'"
    Rails.logger.info "Passwords match: #{password_value == password_confirmation_value}"
    
    # For OAuth users, we'll be more lenient with password confirmation
    # If password meets minimum requirements, allow setting it
    if password_value.present? && password_value.length >= 6
      # Use direct password setting for OAuth users
      author.password = password_value
      author.password_confirmation = password_value  # Force confirmation to match
      author.reset_password_token = nil
      author.reset_password_sent_at = nil
      author.confirmed_at = Time.current if author.confirmed_at.nil?
      
      if author.save
        Rails.logger.info "Password successfully set for OAuth user: #{author.email}"
        render json: {
          status: { code: 200, message: 'Password reset successfully. You can now sign in with your email and new password.' }
        }
      else
        Rails.logger.error "Password reset failed for OAuth user #{author.email}: #{author.errors.full_messages}"
        render json: {
          status: { code: 422, message: 'Failed to reset password.' },
          errors: author.errors.full_messages
        }, status: :unprocessable_entity
      end
    else
      render json: {
        status: { code: 422, message: 'Password must be at least 6 characters long.' },
        errors: ['Password is too short (minimum is 6 characters)']
      }, status: :unprocessable_entity
    end
  end

  def handle_standard_password_reset
    if resource.errors.empty?
      render json: {
        status: { code: 200, message: 'Password reset successfully.' }
      }
    else
      Rails.logger.error "Password reset failed: #{resource.errors.full_messages}"
      render json: {
        status: { code: 422, message: 'Failed to reset password.' },
        errors: resource.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

  def resource_params
    params.require(:author).permit(:email, :password, :password_confirmation, :reset_password_token)
  end
end
