Rails.application.config.session_store :active_record_store,
  key: '_itan_session',
  same_site: :none,
  secure: true,
  httponly: true,
  domain: '.itan.app',
  expire_after: 14.days