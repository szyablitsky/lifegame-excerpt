class BusinesshackSerializer < ActiveModel::Serializer
  attributes :id, :title, :subtitle, :description, :benefits, :results, :tags
  has_many :steps

  def tags
    object.tags.map(&:name)
  end
end
