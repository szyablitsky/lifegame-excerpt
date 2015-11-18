class Businesshack::Tag < ActiveRecord::Base
  has_many :businesshack_tags
  has_many :businesshacks, through: :businesshack_tags

  validates :name, presence: true
end
