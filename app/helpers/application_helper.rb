module ApplicationHelper
  def image_urls(images)
    images.map { |image| [image, image_url(image)] }.to_h
  end

  def sidebar_businesshacks_path
    if logged_in?
      if current_user.admin? || active_subscription?
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

  private

  def active_subscription?
    current_user.subscriptions.active.for('businesshacks').any? do |subscription|
      subscription.cover_today?
    end
  end

  def no_subscription?
    current_user.subscriptions.for('businesshacks').none?
  end
end
