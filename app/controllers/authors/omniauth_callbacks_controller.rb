class Authors::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  skip_before_action :verify_authenticity_token # 🚨 disable CSRF check
  respond_to :json

  def google_oauth2
    author = Author.from_omniauth(request.env['omniauth.auth'])

    if author.persisted?
      flash[:notice] = I18n.t('devise.omniauth_callbacks.success', kind: 'Google')
      sign_in_and_redirect author, event: :authentication
    else
      session['devise.google_data'] = request.env['omniauth.auth'].except('extra')
      redirect_to new_author_session_path, alert: 'Google login failed.'
    end
  end

  def failure
    redirect_to new_author_session_path, alert: 'Google authentication failed.'
  end
end


# class Api::V1::Authors::OmniauthCallbacksController < Devise::OmniauthCallbacksController
#   skip_before_action :verify_authenticity_token
#   respond_to :json

#    # Entry point: Redirect to Google OAuth URL
#   def redirect
#     redirect_to author_google_oauth2_omniauth_authorize_url
#   end

#   # Callback from Google
#   def google_oauth2
#     auth = request.env['omniauth.auth']

#     # Find or create the user
#     author = Author.from_omniauth(auth)

#     if author.persisted?
#       # ✅ Generate JWT token manually
#       payload, header = Warden::JWTAuth::UserEncoder.new.call(author, :author, nil)
#       token = payload

#       render json: {
#         status: 200,
#         message: 'Google OAuth successful',
#         user: {
#           id: author.id,
#           email: author.email,
#           first_name: author.first_name,
#           last_name: author.last_name
#         },
#         jwt: token
#       }, status: :ok
#     else
#       render json: { error: 'Google login failed' }, status: :unauthorized
#     end
#   end

#   def failure
#     render json: { error: 'Google authentication failed' }, status: :unauthorized
#   end
# end
