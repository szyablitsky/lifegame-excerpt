class PostDecorator < Draper::Decorator
  delegate :url_helpers, to: 'Rails.application.routes'

  def comments_props(user)
    {
      limit: 3,
      user_id: user.id,
      url: url_helpers.api_post_comments_path(object.id),
      count: object.comments.count,
      comments: object.comments.for_preview(3).map do |comment|
        ActiveModel::SerializableResource.new(comment).serializable_hash[:comment]
      end
    }
  end
end
