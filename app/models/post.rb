class Post < ApplicationRecord
    belongs_to :brewery_thread, counter_cache: true, touch: true
    belongs_to :user
  
    validates :user_id, :body, presence: true
  
    scope :sorted, ->{ order(:created_at) } 
end
