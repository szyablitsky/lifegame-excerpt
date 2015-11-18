module Api
  module Businesshacks
    class CommentsController < Api::CommentsController
      before_action only: [:index, :create] do
        @commentable = Businesshack.find(params[:businesshack_id])
      end
    end
  end
end
