# app/controllers/api/v1/readers/confirmations_controller.rb
module Api
  module V1
    module Readers
      class ConfirmationsController < Devise::ConfirmationsController
        respond_to :json  # allow JSON responses

        # POST /api/v1/readers/confirmation
        def create
          self.resource = resource_class.send_confirmation_instructions(resource_params)
          if successfully_sent?(resource)
            render json: { message: 'Confirmation instructions sent.' }, status: :ok
          else
            render json: { error: resource.errors.full_messages.to_sentence }, status: :unprocessable_entity
          end
        end

        protected

        # redirect after clicking email link
        def after_confirmation_path_for(resource_name, resource)
          "#{ENV.fetch('READER_FRONTEND_URL', 'http://localhost:3003')}/reader/confirm_email?email=#{resource.email}"
        end

        private

        def resource_params
          params.require(:reader).permit(:email, :confirmation_token)
        end
      end
    end
  end
end
