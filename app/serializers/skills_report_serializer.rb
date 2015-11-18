class SkillsReportSerializer < ActiveModel::Serializer
  attributes :id, :content, :html
  belongs_to :author, serializer: UserSerializer

  def html
    context = Rails.configuration.paths['app/views']
    view = ActionView::Base.new(context)
    # view.class.include Rails.application.routes.url_helpers
    view.render 'skills_reports/skills_report', skills_report: object
  end
end
