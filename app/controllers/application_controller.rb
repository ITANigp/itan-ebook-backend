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

  # Centralized author authentication
  def authenticate_author!
    # Debug session information only in production if needed
    if Rails.env.production?
      Rails.logger.info "🔍 Session debug - Author auth check:"
      Rails.logger.info "- Session ID: #{session.id rescue 'No session'}"
      Rails.logger.info "- Author session present: #{session['warden.user.author.key'].present?}"
      Rails.logger.info "- Cookies: #{request.cookies['_itan_session'].present? ? 'Present' : 'Missing'}"
    end
    
    unless current_author
      Rails.logger.warn "❌ Author authentication failed"
      render json: { error: 'Unauthorized' }, status: :unauthorized
      return
    end

    Rails.logger.info "✅ Author access granted: #{current_author.email}"
  end

  # Centralized reader authentication  
  def authenticate_reader!
    unless current_reader
      render json: { error: 'Unauthorized' }, status: :unauthorized
      return
    end

    Rails.logger.info "✅ Reader access granted: #{current_reader.email}"
  end
end
