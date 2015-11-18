class User::Experience
  def self.call(user)
    new(user).()
  end

  def self.level(experience)
    new(nil).level(experience)
  end

  def initialize(user)
    @user = user
  end

  def call()
    OpenStruct.new(
      level: level,
      in_current_level: in_current_level,
      for_next_level: for_next_level
    )
  end

  def level(experience = user.experience)
    return @_level if defined? @_level
    level = 0
    while experience >= experience_for(level) do level += 1 end
    @_level = level - 1
  end

  private

  POWER = 1.6
  MULTIPLIER = 100

  attr_reader :user

  def experience_for(_level)
    (_level ** POWER * MULTIPLIER).ceil
  end

  def in_current_level
    user.experience - experience_for(level)
  end

  def for_next_level
    experience_for(level + 1) - experience_for(level)
  end
end
