class SiteNavigation::Cell < Cell::Concept
  def show
    render
  end

  private

  def active(path)
    ' -active' if current_page?(path)
  end

  def sidebar_businesshacks_path
    if model.present?
      if model.admin? || active_subscription?
        businesshacks_path
      elsif no_subscription?
        promo_businesshacks_path
      else
        businesshacks_path
      end
    else
      promo_businesshacks_path
    end
  end

  def active_subscription?
    model.subscriptions.active.for('businesshacks').any? do |subscription|
      subscription.cover_today?
    end
  end

  def no_subscription?
    model.subscriptions.for('businesshacks').none?
  end
end
