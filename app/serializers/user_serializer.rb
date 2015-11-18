class UserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :avatar, :level, :experience, :skill_points, :resources

  def avatar
    facade.normal_image_url
  end

  def experience
    {
      in_current_level: facade.experience_in_current_level,
      for_next_level: facade.experience_for_next_level,
      total: object.experience
    }
  end

  def skill_points
    {
      unlock: object.skill_points,
      report: facade.report_skill_points
    }
  end

  def resources
    resources = object.resources
    {
      time: resources.time,
      energy: resources.energy,
      money: resources.money
    }
  end

  private

  def facade
    @facade ||= UserFacade.new(object)
  end
end
