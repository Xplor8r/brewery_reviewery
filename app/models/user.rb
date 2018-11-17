class User < ApplicationRecord
    has_many :brewery_threads
    has_many :posts
    has_secure_password

    def self.create_with_omniauth(auth)
        create! do |user|
            user.provider = auth["provider"]
            user.uid = auth["uid"]
            user.name = auth["info"]["name"]
        end
    end
end
