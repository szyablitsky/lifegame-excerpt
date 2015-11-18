class BusinesshackFacade
  delegate :url_helpers, to: 'Rails.application.routes'

  def initialize(businesshack, user)
    @businesshack = businesshack
    @user = user
  end

  def attributes
    ActiveModel::SerializableResource.new(businesshack).serializable_hash[:businesshack]
  end

  def state_attributes
    {
      id: @businesshack.id,
      draft: @businesshack.draft,
      free: @businesshack.free
    }
  end

  def comments_props
    {
      limit: 5,
      user_id: user.id,
      url: url_helpers.api_businesshack_comments_path(businesshack.id),
      count: businesshack.comments.count,
      comments: businesshack.comments.for_preview.map do |comment|
        ActiveModel::SerializableResource.new(comment).serializable_hash[:comment]
      end
    }
  end

  def tag_names
    Businesshack::Tag.pluck(:name)
  end

  private

  attr_reader :businesshack, :user
end
