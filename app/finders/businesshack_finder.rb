class BusinesshackFinder < BaseFinder
  model Businesshack

  def index(params, user)
    hacks = ordered.page(params[:page])
    hacks = new(hacks).published(user) unless user.admin?
    hacks
  end

  def published(user)
    scope.where("draft = 'f' or author_id = ?", user.id)
  end

  def ordered
    scope.order(updated_at: :desc)
  end
end
