# app/controllers/api/v1/readers/passwords_controller.rb
module Api
  module V1
    module Readers
      class PasswordsController < Devise::PasswordsController
        respond_to :json

        # POST /api/v1/readers/password
        def create
          self.resource = resource_class.send_reset_password_instructions(resource_params)
          if successfully_sent?(resource)
            render json: { message: 'Reset password instructions sent.' }, status: :ok
          else
            render json: { error: resource.errors.full_messages.to_sentence }, status: :unprocessable_entity
          end
        end

        # PUT /api/v1/readers/password
        def update
          self.resource = resource_class.reset_password_by_token(resource_params)
          if resource.errors.empty?
            render json: { message: 'Password has been changed successfully.' }, status: :ok
          else
            render json: { error: resource.errors.full_messages.to_sentence }, status: :unprocessable_entity
          end
        end

        private

        def resource_params
          params.require(:reader).permit(:email, :password, :password_confirmation, :reset_password_token)
        end
      end
    end
  end
end
