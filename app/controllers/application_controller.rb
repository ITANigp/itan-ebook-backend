class ApplicationController < ActionController::API
  protected

  # Centralized admin authentication with security patch
  def authenticate_admin!
    # Check if admin is authenticated via session (current approach)
    unless current_admin
      render json: { error: 'Unauthorized' }, status: :unauthorized
      return
    end

    # Security patch: If multiple user types are in session, clear non-admin sessions
    # This maintains backward compatibility while fixing the security issue
    if session['warden.user.reader.key'].present?
      Rails.logger.warn '⚠️ Security: Clearing reader session during admin access'
      session.delete('warden.user.reader.key')
    end

    if session['warden.user.author.key'].present?
      Rails.logger.warn '⚠️ Security: Clearing author session during admin access'
      session.delete('warden.user.author.key')
    end

    Rails.logger.info "✅ Admin access granted: #{current_admin.email}"
  end
end
