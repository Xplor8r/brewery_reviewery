class User < ApplicationRecord
    has_many :brewery_threads
    has_many :posts
    has_secure_password

    validates: name, presence: true
    validates: email, presence: true, uniqueness: true

    def name
        "#{first_name} #{last_name}"
    end
end
