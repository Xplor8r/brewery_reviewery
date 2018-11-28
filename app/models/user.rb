class User < ApplicationRecord
    extend FriendlyId
    friendly_id :name, use: :slugged
    has_many :brewery_threads
    has_many :posts
    validates :name, presence: true
    validates :email, presence: true, uniqueness: true

    has_secure_password

end
