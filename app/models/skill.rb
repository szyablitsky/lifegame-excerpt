class Skill < ActiveRecord::Base
  include Achievments
  include Requirements
  include ResourcesField

  has_one :course
  has_many :milestones, through: :course
  has_many :skillings, dependent: :destroy # TODO: delete this
  has_many :user_skills, dependent: :destroy
  has_many :skills_report_skills, dependent: :destroy
  belongs_to :group, class_name: 'Skill::Group'

  validates :name, presence: true
  validates :price, numericality: { greater_than: -1 }

  has_ancestry orphan_strategy: :adopt
  mount_uploader :image, SkillUploader

  scope :published, -> { where draft: false }
end
