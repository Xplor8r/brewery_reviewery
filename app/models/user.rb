class User < ApplicationRecord
    has_many :brewery_threads
    has_many :posts
    has_secure_password
    extend FriendlyId
    friendly_id :name, use: :slugged
end
