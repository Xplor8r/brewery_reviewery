class User < ApplicationRecord
    has_many :brewery_threads
    has_many :posts
    has_many :posts, through: :brewery_threads
    has_secure_password

end
