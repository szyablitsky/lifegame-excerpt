class BusinesshackPolicy < ApplicationPolicy
  def index?
    general_access?
  end

  def show?
    author? ||
    admin? ||
    (published? && (active_subscription? || subscription? && free?))
  end

  def new?
    general_access?
  end

  def create?
    general_access?
  end

  def edit?
    update_access?
  end

  def update?
    update_access?
  end

  def tags?
    update_access?
  end

  def state?
    admin?
  end

  private

  def general_access?
    admin? || subscription?
  end

  def update_access?
    admin? || (subscription? && author?)
  end

  def subscription?
    user.subscriptions.for(:businesshacks).any?
  end

  def active_subscription?
    user.subscriptions.active.for(:businesshacks).any? do |subscription|
      subscription.cover_today?
    end
  end

  def published?
    !record.draft?
  end

  def free?
    record.free?
  end
end
