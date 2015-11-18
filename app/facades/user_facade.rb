class UserFacade
  DAILY_REPORT_SKILL_POINTS = 3

  delegate :normal_image_url, to: :decorated_user
  delegate :level, to: :experience
  delegate :in_current_level, :for_next_level, to: :experience, prefix: true

  def initialize(user)
    @user = user
  end

  def user_skills
    user.user_skills.map { |user_skill| user_skill_attributes(user_skill) }
  end

  def used_skill_ids
    @used_skill_ids ||=
      SkillsReportFinder.for_today_by(user).flat_map do |report|
        report.skills_report_skills.map { |srs| srs.skill.id }
      end
  end

  def report_skill_points
    DAILY_REPORT_SKILL_POINTS - used_skill_ids.size
  end

  def used_all_skill_points
    DAILY_REPORT_SKILL_POINTS == used_skill_ids.size
  end

  private

  attr_reader :user

  def user_skill_attributes(user_skill)
    ActiveModel::SerializableResource.new(user_skill).serializable_hash[:user_skill]
  end

  def decorated_user
    @decorated_user ||= user.decorate
  end

  def experience
    @experience ||= User::Experience.(user)
  end
end
