module Api
  module Businesshacks
    class PicturesController < Api::PicturesController
      before_action only: :create do
        @imageable = Businesshack.find(params[:businesshack_id])
      end
    end
  end
end
