module Api
  class HelpController < BaseController
    before_action :require_logged_in

    def dismiss
      unless current_user.dismissed_help.include?(params[:id])
        current_user.dismissed_help << params[:id]
      end

      if current_user.save
        render json: nil, status: :ok
      else
        render json: { errors: current_user.errors }, status: :bad_request
      end
    end
  end
end
