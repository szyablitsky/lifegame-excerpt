module Api
  class PicturesController < BaseController
    def create
      @picture = @imageable.pictures.new(picture_params)
      if @picture.save
        render json: @picture, status: :ok
      else
        render json: { errors: @picture.errors }, status: :bad_request
      end
    end

    private

    def picture_params
      params.require(:picture).permit(:image)
    end
  end
end
