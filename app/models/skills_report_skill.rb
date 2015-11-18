class SkillsReportSkill < ActiveRecord::Base
  belongs_to :skills_report
  belongs_to :skill

  validates :content, presence: true
end
