class Api::V1::Authors::OmniauthCallbacksController < Devise::OmniauthCallbacksController  
  # Handle OAuth initiation - let parent class handle it
  def passthru
    super
  end

  # Google OAuth callback
  def google_oauth2
    author = Author.from_omniauth(request.env['omniauth.auth'])

    if author.persisted?
      if author.two_factor_enabled
        # Store author ID for verification
        session[:author_id_for_2fa] = author.id
        # Send verification code
        author.send_two_factor_code

        # Redirect to frontend with 2FA requirement
        frontend_url = Rails.env.production? ? "https://publish.itan.app" : "http://localhost:9000"
        redirect_to "#{frontend_url}/auth/verify-2fa"
      else
        # Sign in and redirect to frontend
        sign_in(author)
        
        frontend_url = Rails.env.production? ? "https://publish.itan.app" : "http://localhost:9000"
        redirect_to "#{frontend_url}/auth/callback"
      end
    else
      # Handle case where author couldn't be created/found
      frontend_url = Rails.env.production? ? "https://publish.itan.app" : "http://localhost:9000"
      redirect_to "#{frontend_url}/author/sign_up?error=oauth_failed"
    end
  end

  # Handle general OAuth failures
  def failure
    frontend_url = Rails.env.production? ? "https://publish.itan.app" : "http://localhost:9000"
    redirect_to "#{frontend_url}/author/sign_up?error=#{params[:message]}"
  end
end
