class BusinesshacksFacade
  def initialize(user)
    @user = user
  end

  def show_payment_button?
    !user.admin? && demo_user?
  end

  def order_to_pay
    user.subscriptions.inactive.for('businesshacks').last.order
  end

  def members_count
    members.size
  end

  def members
    Subscription.active.for('businesshacks')
      .map { |subscription| subscription.user }
      .uniq
  end

  private

  def demo_user?
    user.subscriptions.active.for('businesshacks').none? do |subscription|
      subscription.cover_today?
    end
  end

  attr_reader :user
end
