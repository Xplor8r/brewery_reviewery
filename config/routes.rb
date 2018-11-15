Rails.application.routes.draw do
  get "/signin", to: "sessions#new"
  post "/sessions/create", to: "sessions#create"
  delete "/signout", to: "sessions#destroy"
  resources :users
  resources :brewery_threads, path: :threads do
    collection do
      get :author
      get :participant
      get "brewery_state/:id", to: "brewery_states#index", as: :brewery_state
    end
    resources :posts, path: :posts
  end
  root to: "brewery_threads#index"
end
