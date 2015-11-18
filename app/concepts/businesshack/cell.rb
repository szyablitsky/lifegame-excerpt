class Businesshack::Cell < Cell::Concept
  include ActionView::Helpers::DateHelper
  include Rails::Timeago::Helper

  property :title, :subtitle, :updated_at, :draft?, :author_image, :author_name

  def show
    render
  end

  private

  delegate :benefits?, :benefits, :results?, :results, to: :decorated_model

  def tags
    model.tags.map(&:name)
  end

  def comments_count
    model.comments.size
  end

  def demo?
    inactive_subscription? && paid? && !admin? && !author?
  end

  def inactive_subscription?
    @options[:user].subscriptions.active.for('businesshacks').none? do |subscription|
      subscription.cover_today?
    end
  end

  def admin?
    @options[:user].admin?
  end

  def author?
    model.author == @options[:user]
  end

  def paid?
    ! model.free?
  end

  def decorated_model
    @decorated_model ||= model.decorate
  end
end
