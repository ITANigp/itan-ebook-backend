# require_relative "boot"

# require "rails"
# # Pick the frameworks you want:
# require "active_model/railtie"
# require "active_job/railtie"
# require "active_record/railtie"
# require "active_storage/engine"
# require "action_controller/railtie"
# require "action_mailer/railtie"
# require "action_mailbox/engine"
# require "action_text/engine"
# require "action_view/railtie"
# require "action_cable/engine"
# require "dotenv/load"
# # require "rails/test_unit/railtie"

# # Require the gems listed in Gemfile, including any gems
# # you've limited to :test, :development, or :production.
# Bundler.require(*Rails.groups)

# if ['development', 'test'].include? ENV['RAILS_ENV']
#   Dotenv::Rails.load
# end

# module ItanAudiobookBackend
#   class Application < Rails::Application
#     # Initialize configuration defaults for originally generated Rails version.
#     config.load_defaults 7.1

#     # Please, add to the `ignore` list any other `lib` subdirectories that do
#     # not contain `.rb` files, or that should not be reloaded or eager loaded.
#     # Common ones are `templates`, `generators`, or `middleware`, for example.
#     config.autoload_lib(ignore: %w(assets tasks))

#     # Configuration for the application, engines, and railties goes here.
#     #
#     # These settings can be overridden in specific environments using the files
#     # in config/environments, which are processed later.
#     #
#     # config.time_zone = "Central Time (US & Canada)"
#     # config.eager_load_paths << Rails.root.join("extras")

#     # Only loads a smaller set of middleware suitable for API only apps.
#     # Middleware like session, flash, cookies can be added back manually.
#     # Skip views, helpers and assets when generating a new resource.
#     config.api_only = true

#     # Ensure session and cookies middleware are loaded for OmniAuth
#     config.middleware.use ActionDispatch::Cookies
#     config.middleware.use ActionDispatch::Session::CookieStore

#     config.active_storage.variant_processor = :mini_magick

#     config.middleware.use Rack::MethodOverride
#     config.middleware.use ActionDispatch::Flash
#     config.middleware.use ActionDispatch::Cookies
#     # Session store configured in config/initializers/session_store.rb
#   end
# end






require_relative "boot"

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_mailbox/engine"
require "action_text/engine"
require "action_view/railtie"
require "action_cable/engine"
require "dotenv/load"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

if ['development', 'test'].include? ENV['RAILS_ENV']
  Dotenv::Rails.load
end

module ItanAudiobookBackend
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.1

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w(assets tasks))

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true

    # --- CORRECTED SESSION AND COOKIES MIDDLEWARE ---
    # Add Cookies first, then SessionStore, then Flash
    config.middleware.use ActionDispatch::Cookies

    # IMPORTANT: Pass the session store configuration directly here
    # Use Rails.env.production? to ensure 'secure: true' is only in production
    # and 'same_site: :none' for cross-origin APIs.
    config.middleware.use ActionDispatch::Session::CookieStore,
      key: '_itan_session',
      same_site: :none,
      secure: Rails.env.production?, # <--- Use this for production
      httponly: true
      # Do NOT include `domain: '.itan.app'` here, as we removed it from initializer too.

    # If you need flash messages (uncommon for pure APIs but sometimes used)
    config.middleware.use ActionDispatch::Flash

    # Other middleware (Rack::MethodOverride can go anywhere after cookies, flash)
    config.middleware.use Rack::MethodOverride

    # REMOVE the duplicate ActionDispatch::Cookies and the comment, it's already added above
    # config.middleware.use ActionDispatch::Cookies
    # Session store configured in config/initializers/session_store.rb
    # -----------------------------------------------

    config.active_storage.variant_processor = :mini_magick

  end
end
