Rails.application.config.session_store :cookie_store,
  key: '_itan_session',
  same_site: :none,
  secure: true,
  httponly: true,
  # domain: '.itan.app'
