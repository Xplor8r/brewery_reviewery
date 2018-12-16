class PostSerializer < ActiveModel::Serializer
  attributes :id, :body
  belongs_to :user
  belongs_to :brewery_thread
end
