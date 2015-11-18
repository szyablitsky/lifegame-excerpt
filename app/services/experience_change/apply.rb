class ExperienceChange::Apply
  def self.call(user, action, count = 1)
    new(user, action, count).()
  end

  def initialize(user, action, count)
    @user = user
    @action = action
    @count = count
  end

  def call()
    ActiveRecord::Base.transaction do
      user.update_attributes(level: level, experience: new_experience, skill_points: skill_points)
      user.experience_changes.create(action: action, amount: amount)
    end
  end

  private

  attr_reader :user, :action, :count

  def amount
    @amount ||= ExperienceChange::AMOUNT[action] * count
  end

  def new_experience
    @new_experience ||= user.experience + amount
  end

  def level
    @level ||= User::Experience.level(new_experience)
  end

  def skill_points
    user.skill_points + skill_points_gain
  end

  def skill_points_gain
    level - user.level
  end
end
