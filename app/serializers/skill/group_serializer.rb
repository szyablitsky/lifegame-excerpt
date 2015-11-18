class Skill::GroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :skills
  has_many :skills
end
