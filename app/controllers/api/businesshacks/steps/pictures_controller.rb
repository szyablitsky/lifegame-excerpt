module Api
  module Businesshacks
    module Steps
      class PicturesController < Api::PicturesController
        before_action only: :create do
          @imageable = Businesshack.find(params[:businesshack_id]).steps.find(params[:step_id])
        end
      end
    end
  end
end
