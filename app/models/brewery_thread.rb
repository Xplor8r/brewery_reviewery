class BreweryThread < ApplicationRecord
    extend FriendlyId
    friendly_id :brewery, use: :slugged
    belongs_to :brewery_state
    belongs_to :user
    has_many :posts
    has_many :users, through: :posts

    accepts_nested_attributes_for :posts
  
    validates :brewery_state, presence: true
    validates :user_id, :brewery, presence: true
    validates_associated :posts
 
    scope :sorted, ->{order(updated_at: :desc)}
end
