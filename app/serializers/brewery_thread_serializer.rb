class BreweryThreadSerializer < ActiveModel::Serializer
  attributes :id, :brewery, :brewery_state_id, :created_at
  has_many :posts
  belongs_to :brewery_state
  belongs_to :user
end
