class UserSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :brewery_threads
  has_many :posts
end
