# # app/controllers/api/v1/readers/confirmations_controller.rb
# module Api
#   module V1
#     module Readers
#       class ConfirmationsController < Devise::ConfirmationsController
#         respond_to :json  # allow JSON responses

#         # POST /api/v1/readers/confirmation
#         def create
#           self.resource = resource_class.send_confirmation_instructions(resource_params)
#           if successfully_sent?(resource)
#             render json: { message: 'Confirmation instructions sent.' }, status: :ok
#           else
#             render json: { error: resource.errors.full_messages.to_sentence }, status: :unprocessable_entity
#           end
#         end

#         protected

#         # redirect after clicking email link
#         def after_confirmation_path_for(resource_name, resource)
#           "#{ENV.fetch('READER_FRONTEND_URL', 'http://localhost:3003')}/reader/confirm_email?email=#{resource.email}"
#         end

#         private

#         def resource_params
#           params.require(:reader).permit(:email, :confirmation_token)
#         end
#       end
#     end
#   end
# end

class Api::V1::Readers::ConfirmationsController < Devise::ConfirmationsController
  
  # GET /resource/confirmation?confirmation_token=abcdef
  def show
    self.resource = resource_class.confirm_by_token(params[:confirmation_token])

    if resource.errors.empty?
      # If successful, respond with a success status and a message
      render json: { message: 'Email confirmed successfully.' }, status: :ok
    else
      # If failed, respond with an unprocessable entity status and error details
      render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end
end