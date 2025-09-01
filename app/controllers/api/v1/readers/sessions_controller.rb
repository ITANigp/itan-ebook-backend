# app/controllers/api/v1/readers/sessions_controller.rb
class Api::V1::Readers::SessionsController < Devise::SessionsController
  respond_to :json
  skip_before_action :verify_signed_out_user, only: :destroy

  def create
    unless verify_recaptcha_token(params[:recaptcha_token])
      return render json: {
        status: { code: 401, message: 'reCAPTCHA verification failed.' }
      }, status: :unauthorized
    end
    
    self.resource = warden.authenticate!(auth_options)
    if resource
      token = generate_jwt_token(resource)
      render json: {
        status: { code: 200, message: 'Logged in successfully.' },
        data: ReaderSerializer.new(resource).serializable_hash[:data][:attributes].merge(
          id: ReaderSerializer.new(resource).serializable_hash[:data][:id],
          token: token
        )
      }
    end
  rescue StandardError => e
    Rails.logger.error "Login failed: #{e.message}"
    render json: {
      status: { code: 401, message: 'Invalid email or password.' }
    }, status: :unauthorized
  end

  def destroy
    render json: {
      status: { code: 200, message: 'Logged out successfully.' }
    }
  end

  private

  def verify_recaptcha_token(token)
    return false if token.blank?

    uri = URI.parse("https://www.google.com/recaptcha/api/siteverify")
    response = Net::HTTP.post_form(uri, {
      "secret" => ENV["RECAPTCHA_SECRET_KEY"],
      "response" => token
    })

    result = JSON.parse(response.body)
    result["success"] == true
  rescue => e
    Rails.logger.error "reCAPTCHA verification error: #{e.message}"
    false
  end

  def generate_jwt_token(reader)
    payload = {
      sub: reader.id,
      email: reader.email,
      exp: 1.day.from_now.to_i,
      iat: Time.current.to_i
    }
    JWT.encode(payload, ENV.fetch('DEVISE_JWT_SECRET_KEY', nil), 'HS256')
  end
end
