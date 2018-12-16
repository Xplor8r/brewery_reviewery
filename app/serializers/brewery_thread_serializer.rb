class BreweryThreadSerializer < ActiveModel::Serializer
  attributes :id, :brewery, :brewery_state_id, :posts_attributes
  has_many :posts
  belongs_to :brewery_state
  belongs_to :user
end
