class Skill::Unlock
  UNLOCKED_MESSAGE = 'Навык уже открыт'
  NOT_ENOUGH_MESSAGE = 'Недостаточно очков опыта'
  ANCESTOR_MESSAGE = 'Сначала нужно открыть все предыдущие навыки в ветке'

  def self.call(id, user)
    new(id, user).()
  end

  def initialize(id, user)
    @skill = Skill.find(id)
    @user = user
  end

  def call()
    return Result.new(false, UNLOCKED_MESSAGE) if skill_already_unlocked?
    return Result.new(false, NOT_ENOUGH_MESSAGE) if not_enough_skill_points?
    return Result.new(false, ANCESTOR_MESSAGE) if ancestor_locked?

    unlock_skill
    add_user_experience
    Result.new(true, user: user_data)
  end

  private

  attr_reader :skill, :user

  def skill_already_unlocked?
    user_skills.include? skill
  end

  def not_enough_skill_points?
    skill.price > user.skill_points
  end

  def ancestor_locked?
    locked, tested_skill = false, skill
    while tested_skill = tested_skill.parent do
      locked = true if user_skills.exclude? tested_skill
    end
    locked
  end

  def user_skills
    @user_skills ||= user.skills
  end

  def unlock_skill
    user.decrement(:skill_points, skill.price)
    user.skills << skill
    IntercomEndpoint.create_event(user.id, 'Разблокировал навык', 'Наименование' => skill.name)
  end

  def add_user_experience
    ExperienceChange::Apply.(user, :skill_unlock, 1)
  end

  def user_data
    ActiveModel::SerializableResource.new(user)
      .serializable_hash[:user]
      .merge(user_skills: UserFacade.new(user).user_skills)
  end
end
