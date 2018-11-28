class BreweryState < ApplicationRecord
    extend FriendlyId
    friendly_id :name, use: :slugged
    has_many :brewery_threads
    has_many :users, through: :brewery_threads
    
    scope :sorted, ->{order(name: :asc)}
    validates :name, :slug, presence: true
end
