class ApplicationController < ActionController::API
  protected

  # Centralized admin authentication
  def authenticate_admin!
    unless current_admin
      render json: { error: 'Unauthorized' }, status: :unauthorized
      return
    end

    # Security patch: If multiple user types are in session, clear non-admin sessions
    if session['warden.user.reader.key'].present?
      session.delete('warden.user.reader.key')
    end

    if session['warden.user.author.key'].present?
      session.delete('warden.user.author.key')
    end
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
