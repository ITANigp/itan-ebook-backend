Rails.application.routes.draw do
  # Devise routes
  devise_for :authors, controllers: {
    sessions: 'api/v1/authors/sessions',
    registrations: 'api/v1/authors/registrations',
    confirmations: 'api/v1/authors/confirmations',
    passwords: 'api/v1/authors/passwords',
    omniauth_callbacks: 'api/v1/authors/omniauth_callbacks'
  }, path: 'api/v1/authors'

  devise_for :admins, controllers: {
    sessions: 'api/v1/admins/sessions'
  }, skip: [:registrations], path: 'api/v1/admins'

  devise_for :readers, controllers: {
    sessions: 'api/v1/readers/sessions',
    registrations: 'api/v1/readers/registrations'
  }, defaults: { format: :json }, path: 'api/v1/readers'

  # API routes
  namespace :api do
    namespace :v1 do
      # Books routes
      resources :books do
        collection do
          get :my_books
          get :storefront
          get 'by-slug/*slug', to: 'books#show_by_slug'  # slug route
        end

        member do
          get :storefront
          get :content
        end
      end

      # Admin namespace
      namespace :admin do
        resources :books do
          member do
            patch :approve
            patch :reject
          end
        end

        resources :authors, only: [:index, :show]

        resources :author_revenues, only: [:index, :show] do
          collection do
            post :process_payments
            post :transfer_funds
            get :processed_batches
            get :transferred_batches
            get :transferred_authors
          end
        end

        resources :analytics, only: [] do
          collection do
            get :financial_summary
          end
        end

        get 'revenue_dashboard', to: 'dashboard#revenue'
      end

      # Author routes
      namespace :authors do
        resource :profile, only: [:show, :update, :create]
        post 'verify', to: 'verifications#verify'
        post 'resend_verification', to: 'verifications#resend_verification'
        patch 'kyc/update-step', to: 'kyc#update_step'

        resource :two_factor, only: [] do
          get :status
          post :enable_email
          post :setup_sms
          post :verify_sms
          delete :disable
        end
      end

      namespace :author do
        resources :earnings, only: [] do
          collection do
            get :summary
            get :breakdowns
            get :recent_sales
            get :approved_payments
          end
        end

        resources :payment_histories, only: [:index, :show]

        resource :banking_details, only: [:show, :update] do
          post :verify
          get :banks
          post :verify_account_preview
        end
      end

      # Reader routes
      namespace :readers do
        resource :profile, only: [:show, :update, :create]
      end

      namespace :reader do
        resources :current_reads, only: [:index] do
          patch ':book_id', to: 'current_reads#update', on: :collection
        end

        resources :finished_books, only: [:index]
      end

      # Purchases, reviews & likes
      resources :purchases, only: [:create, :index] do
        collection do
          post :verify
          post :refresh_reading_token
          get :check_status
        end
      end

      resources :reviews, only: [:create, :destroy]
      resources :likes, only: [:index, :create, :destroy]
      resource :direct_uploads, only: [:create]
    end
  end

  # Additional routes
  devise_scope :author do
    post '/api/v1/authors/confirmation/confirm', to: 'api/v1/authors/confirmations#confirm'
  end

  get "up" => "rails/health#show", as: :rails_health_check
  root "api/v1/status#index"
end
