class UserSkillSerializer < ActiveModel::Serializer
  attribute :skill_id, key: :id
  attribute :count
end
