class BreweryStateSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :brewery_threads
end
