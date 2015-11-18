class Subscription < ActiveRecord::Base
  belongs_to :user
  has_one :order, as: :orderable

  enum subject: { businesshacks: 1 }

  attr_accessor :price

  validates :subject, :start_at, :end_at, presence: true

  scope :for, -> (subject) { where(subject: self.subjects[subject]) }
  scope :active, -> { where(active: true) }
  scope :inactive, -> { where(active: false) }

  def cover_today?
    (start_at..end_at).cover? Date.today
  end
end
