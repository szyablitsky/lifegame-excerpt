class SkillsReport::Submit
  def self.call(params, user)
    new(params, user).()
  end

  def initialize(params, user)
    @params = params
    @user = user
  end

  def call()
    save_skills_report
    if skills_report.persisted?
      increment_user_skills_count
      add_user_experience
      adjust_user_resources
      IntercomEndpoint.create_event(user.id, 'Написал отчет по навыкам')
    end
    Result.new(skills_report.persisted?, skills_report)
  end

  private

  attr_reader :params, :user, :skills_report

  def save_skills_report
    @skills_report = SkillsReport.new(params)
    skills_report.author = user
    skills_report.save
  end

  def increment_user_skills_count
    skills.each do |skill|
      user_skill = user.user_skills.find_by(skill: skill)
      user_skill.increment!(:count)
    end
  end

  def add_user_experience
    count = skills_report.skills_report_skills.size
    ExperienceChange::Apply.(user, :skills_report, count)
  end

  def adjust_user_resources
    adjusted_resources = skills.map(&:resources)
      .each_with_object(user_resources) do |resources, result|
        result[:time] += resources.time
        result[:energy] += resources.energy
        result[:money] += resources.money
      end
    user.update_attribute(:resources, adjusted_resources)
  end

  def skills
    @skills ||= skills_report.skills_report_skills.map(&:skill)
  end

  def user_resources
    resources = user.resources
    {
      time: resources.time,
      energy: resources.energy,
      money: resources.money
    }
  end
end
