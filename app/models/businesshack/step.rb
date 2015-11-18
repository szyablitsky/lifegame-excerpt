class Businesshack::Step < ActiveRecord::Base
  belongs_to :businesshack, touch: true, required: true
  has_many :pictures, as: :imageable, dependent: :destroy

  validates :title, :position, presence: true

  default_scope -> { ordered }
  scope :ordered, -> { order(:position) }
end
