# Cookie configuration for session-based authentication
Rails.application.config.session_store :cookie_store, {
  key: '_itan_session',
  same_site: Rails.env.production? ? :none : :lax,
  secure: Rails.env.production?,
  httponly: true
}
