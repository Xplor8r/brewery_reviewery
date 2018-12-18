class PostSerializer < ActiveModel::Serializer
  attributes :id, :body, :brewery_thread_id, :created_at
  belongs_to :user, serializer: PostUserSerializer
  belongs_to :brewery_thread
end
