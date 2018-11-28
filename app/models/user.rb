class User < ApplicationRecord
    extend FriendlyId
    friendly_id :name, use: :slugged
    has_many :brewery_threads
    has_many :posts
    has_many :brewery_states, through: :brewery_threads
    validates :name, presence: true
    validates :email, presence: true, uniqueness: true

    has_secure_password

end
