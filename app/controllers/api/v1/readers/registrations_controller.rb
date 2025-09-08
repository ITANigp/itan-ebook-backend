# app/controllers/api/v1/readers/registrations_controller.rb
class Api::V1::Readers::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    if verify_recaptcha(response: params[:recaptcha_token], secret_key: ENV['RECAPTCHA_SECRET_KEY_READER'])
      super
    else
      render json: {
        status: { code: 422, message: 'reCAPTCHA verification failed. Please try again.' }
      }, status: :unprocessable_entity
    end
  end

  private

  def respond_with(resource, _opts = {})
    if resource.persisted?
      serialized = ReaderSerializer.new(resource).serializable_hash[:data]
      render json: {
        status: { code: 200, message: 'Signed up successfully.' },
        data: serialized[:attributes].merge(id: serialized[:id])
      }, status: :ok
    else
      render json: {
        status: { code: 422, message: 'Reader could not be created.' },
        errors: resource.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def sign_up_params
    params.require(:reader).permit(:email, :password, :password_confirmation, :first_name, :last_name)
  end
end
