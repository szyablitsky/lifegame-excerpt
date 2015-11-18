class Skill::Group < ActiveRecord::Base
  self.table_name = 'skill_groups'

  has_many :skills, fully_load: true

  default_scope -> { order :position }
  scope :published, -> { where draft: false }
end
