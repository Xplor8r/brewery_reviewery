class PostSerializer < ActiveModel::Serializer
  attributes :id, :body, :brewery_thread_id
  belongs_to :user, serializer: UserSerializer
  belongs_to :brewery_thread
end
