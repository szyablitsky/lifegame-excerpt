module Api
  class BusinesshacksController < BaseController
    before_action :require_logged_in

    def update
      find_and_authorize_businesshack
      if @businesshack.update_attributes(businesshack_attributes)
        render json: nil, status: :ok
      else
        render json: { errors: @businesshack.errors }, status: :bad_request
      end
    end

    def tags
      find_and_authorize_businesshack
      Businesshack::ApplyTags.(@businesshack, params[:tags])
      render json: nil, status: :ok
    end

    def state
      find_and_authorize_businesshack
      if @businesshack.update_attributes(state_attributes)
        render json: @businesshack, status: :ok
      else
        render json: { errors: @businesshack.errors }, status: :bad_request
      end
    end

    private

    def find_and_authorize_businesshack
      @businesshack = Businesshack.find(params[:id] || params[:businesshack_id])
      authorize @businesshack
    end

    # TODO: refactor with Pundit
    def businesshack_attributes
      params.require(:businesshack).permit(:title, :subtitle, :benefits, :description, :results)
    end

    def state_attributes
      params.require(:businesshack).permit(:draft, :free)
    end
  end
end
