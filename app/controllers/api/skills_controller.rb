module Api
  class SkillsController < BaseController
    before_action :require_logged_in

    def unlock
      result = Skill::Unlock.(params[:id], current_user)
      if result.success?
        render json: result, status: :ok
      else
        render json: { errors: { user_skill: result } }, status: :bad_request
      end
    end
  end
end
