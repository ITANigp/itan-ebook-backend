class Api::V1::Readers::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    begin
      recaptcha_valid = verify_recaptcha(response: params[:recaptcha_token], 
                                        secret_key: ENV['RECAPTCHA_SECRET_KEY_READER'])
      if recaptcha_valid
        super
      else
        render json: {
          status: { code: 422, message: 'reCAPTCHA verification failed. Please try again.' }
        }, status: :unprocessable_content
      end
    end
  end

  private

  def respond_with(resource, _opts = {})
      if resource.persisted?
      serialized = ReaderSerializer.new(resource).serializable_hash[:data]
      token = generate_jwt_token(resource)
      
      render json: {
        status: { code: 200, message: 'Signed up successfully.' },
        data: serialized[:attributes].merge(
          id: serialized[:id],
          token: token # Include token for auto-login
        )
      }, status: :ok
    else
      render json: {
        status: { code: 422, message: 'Reader could not be created.' },
        errors: resource.errors.full_messages
      }, status: :unprocessable_content
      end
  end

  def sign_up_params
    params.require(:reader).permit(:email, :password, :password_confirmation, :first_name, :last_name)
  end

    def generate_jwt_token(reader)
    payload = {
      sub: reader.id,
      email: reader.email,
      jti: reader.jti,
      exp: 1.day.from_now.to_i,
      iat: Time.current.to_i
    }

    JWT.encode(payload, ENV.fetch('DEVISE_JWT_SECRET_KEY', nil), 'HS256')
  end
end
