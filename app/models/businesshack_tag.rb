class BusinesshackTag < ActiveRecord::Base
  self.table_name = 'businesshack_tags_businesshacks'

  belongs_to :businesshack
  belongs_to :tag, class_name: 'Businesshack::Tag', counter_cache: true
end
