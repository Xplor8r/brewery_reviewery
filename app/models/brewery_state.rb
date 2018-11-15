class BreweryState < ApplicationRecord
    extend FriendlyId
    has_many :brewery_threads
    friendly_id :name, use: :slugged
    scope :sorted, ->{order(name: :asc)}
    validates :name, :slug, presence: true
end
