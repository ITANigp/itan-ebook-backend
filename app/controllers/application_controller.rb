class ApplicationController < ActionController::API
  protected

  # Centralized admin authentication
  def authenticate_admin!
    unless current_admin
      render json: { error: 'Unauthorized' }, status: :unauthorized
      return
    end

    # Security patch: If multiple user types are in session, clear non-admin sessions
    # Only clear other sessions if we're actually in an admin context
    # if current_admin && session['warden.user.reader.key'].present?
    #   Rails.logger.info "Clearing reader session for admin authentication"
    #   session.delete('warden.user.reader.key')
    # end

    # DON'T clear author session if we're just checking admin auth
    # Only clear if there's actually an admin logged in AND an author
    # if current_admin && session['warden.user.author.key'].present?
    #   Rails.logger.info "Clearing author session for admin authentication"
    #   session.delete('warden.user.author.key')
    # end
  end

  # Centralized author authentication
  def authenticate_author!
    unless current_author
      render json: { error: 'Unauthorized' }, status: :unauthorized
      return
    end
  end

  # Centralized reader authentication  
  def authenticate_reader!
    unless current_reader
      render json: { error: 'Unauthorized' }, status: :unauthorized
      return
    end
  end
end
