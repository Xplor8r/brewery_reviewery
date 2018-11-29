Rails.application.routes.draw do
  get "/login", to: "sessions#new"
  post '/sessions/create', to: 'sessions#create'
  delete "/logout", to: "sessions#destroy"
  get '/auth/google_oauth2/callback' => 'sessions#google'
  post '/auth/google_oauth2/callback' => 'sessions#create'
  get '/users/:id/states', to: "users#states", as: :users_states
  resources :users
  resources :brewery_threads, path: :threads do
    collection do
      get "brewery_state/:id", to: "brewery_states#index", as: :brewery_state
    end
    resources :posts, path: :posts
  end
  root to: "brewery_threads#index"
end
