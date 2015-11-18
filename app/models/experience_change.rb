class ExperienceChange < ActiveRecord::Base
  belongs_to :user

  AMOUNT = { skills_report: 30, skill_unlock: 5 }

  enum action: { skills_report: 1, skill_unlock: 2 }
end
