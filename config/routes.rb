Rails.application.routes.draw do
  get 'users/edit'
  get 'users/new'
  get 'users/show'
  get 'brewery_threads/edit'
  get 'brewery_threads/index'
  get 'brewery_threads/new'
  get 'brewery_threads/show'
  get 'posts/edit'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
