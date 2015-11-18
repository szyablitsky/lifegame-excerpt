module Api
  module Posts
    class CommentsController < Api::CommentsController
      before_action only: [:index, :create] do
        @commentable = Post.find(params[:post_id])
      end
    end
  end
end
