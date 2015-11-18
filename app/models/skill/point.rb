class Skill::Point < ActiveRecord::Base
  self.table_name = 'skill_points'
  default_scope -> { order :created_at }
end
