module Api
  class CommentsController < BaseController
    def index
      render json: @commentable.comments, status: :ok
    end

    def create
      comment = @commentable.comments.new(comment_params)
      comment.addressee = User.find(params[:comment][:addressee]) if params[:comment][:addressee]
      comment.author = current_user
      if comment.save
        Comment::Notify.(comment)
        render json: comment, status: :ok
      else
        render json: { errors: comment.errors }, status: :bad_request
      end
    end

    private

    def comment_params
      params.require(:comment).permit(:content)
    end
  end
end
