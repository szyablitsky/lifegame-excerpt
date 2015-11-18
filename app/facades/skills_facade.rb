class SkillsFacade
  def skill_groups
    ActiveModel::SerializableResource.new(Skill::Group.published).serializable_hash[:"skill/groups"]
  end
end
