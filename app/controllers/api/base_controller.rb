module Api
  class BaseController < ApplicationController
    skip_before_action  :not_authenticated

    private

    def require_logged_in
      not_authorized unless logged_in?
    end

    def not_authorized
      render json: nil, status: :unauthorized
    end
  end
end
