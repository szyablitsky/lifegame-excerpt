module Api
  class SkillsReportsController < BaseController
    before_action :require_logged_in

    def create
      result = SkillsReport::Submit.(skills_report_params, current_user)
      if result.success?
        render json: result, status: :ok
      else
        render json: { errors: result.errors }, status: :bad_request
      end
    end

    private

    def skills_report_params
      params.require(:skills_report)
        .permit(:content, skills_report_skills_attributes: [:skill_id, :content])
    end
  end
end
