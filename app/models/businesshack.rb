class Businesshack < ActiveRecord::Base
  belongs_to :author, class_name: 'User', required: true
  has_many :steps, class_name: 'Businesshack::Step', dependent: :destroy
  has_many :comments, as: :commentable, dependent: :destroy
  has_many :pictures, as: :imageable, dependent: :destroy
  has_many :businesshack_tags, dependent: :destroy
  has_many :tags, through: :businesshack_tags

  validates :title, :subtitle, presence: true

  scope :published, -> { where(draft: false) }
end
