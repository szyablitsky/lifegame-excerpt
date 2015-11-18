class PostFinder < BaseFinder
  model Post

  def for_list(params, user)
    new(default).by_filter(params[:filter], user).page(params[:page])
  end

  def by_filter(filter, user)
    case filter
    when 'my' then by_author(user)
    else scope
    end
  end

  def default
    scope.order(created_at: :desc).includes(:comments)
    # .where(comments: { commentable_type: 'Post' }).references(:comments)
  end

  def by_author(user)
    scope.where(author: user)
  end
end
