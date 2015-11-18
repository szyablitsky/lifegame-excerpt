class User < ActiveRecord::Base
  include ResourcesField

  authenticates_with_sorcery!

  enum role: { user: 0, admin: 1, author: 2 }
  enum segment: { business_owner: 0, serial_entrepreneur: 1, personal_development_fan: 2 }

  has_many :user_skills, dependent: :destroy
  has_many :skills, through: :user_skills
  has_many :orders, dependent: :destroy
  has_many :posts, dependent: :destroy, foreign_key: :author_id
  has_many :businesshacks, dependent: :restrict_with_exception, foreign_key: :author_id
  has_many :subscriptions, dependent: :destroy
  has_many :experience_changes, dependent: :destroy

  mount_uploader :image, UserUploader

  validates :first_name, :last_name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: /@/ }
  validates :password, presence: true, confirmation: true, on: :create
  validates :skill_points, numericality: { greater_than_or_equal: 0 }
  validates :business_niche, presence: true, if: -> (user) { user.business_owner? }

  scope :sorted, -> { order(created_at: :desc) }
  scope :authors, -> { where(role: [roles[:admin], roles[:author]]) }

  def full_name
    [first_name, last_name].join(' ')
  end

  def time_left
    return if business_age_limit.blank?

    (birth_date + business_age_limit.years).to_time.to_i
  end
end
