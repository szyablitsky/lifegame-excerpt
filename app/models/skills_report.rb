class SkillsReport < Post
  has_many :skills_report_skills, dependent: :destroy
  accepts_nested_attributes_for :skills_report_skills

  validates :content, :skills_report_skills, presence: true
  validates :content, length: { minimum: 100, message: 'Нужно ввести минимум 100 символов' }
end
