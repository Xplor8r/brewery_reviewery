Rails.application.routes.draw do
  get 'users/edit'
  get 'users/new'
  get 'users/show'
  get 'brewery_threads/edit'
  get 'brewery_threads/index'
  get 'brewery_threads/new'
  get 'brewery_threads/show'
  get 'posts/edit'
  resources :brewery_threads, path: :threads do
    get "brewery_state/:id", to: "brewery_states#index", as: :brewery_state
    resources :posts, path: :posts
  end
  root to: "brewery_threads#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
