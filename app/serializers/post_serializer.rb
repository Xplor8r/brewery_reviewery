class PostSerializer < ActiveModel::Serializer
  attributes :id, :body, :user, :brewery_thread_id, :created_at
  belongs_to :user
  belongs_to :brewery_thread
end
