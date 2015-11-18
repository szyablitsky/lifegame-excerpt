module Api
  class OrdersController < BaseController
    def create
      @form = OrderForm.new(params[:order].merge(user: current_user, context: self))
      if @form.save
        render json: { url: @form.url }, status: :ok
      else
        render json: { errors: @form.errors }, status: :bad_request
      end
    end
  end
end
