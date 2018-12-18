class Post < ApplicationRecord
    belongs_to :brewery_thread, counter_cache: true, touch: true
    belongs_to :user
  
    validates :body, presence: true
  
    scope :sorted, ->{ order(:created_at) } 
end
