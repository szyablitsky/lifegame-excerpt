class OrderDecorator < Draper::Decorator
  delegate_all
  delegate :email, :phone, :business_niche, to: :user, prefix: true

  def user_name
    object.user.full_name
  end

  def orderable_link
    h.link_to orderable_name, orderable_path
  end

  private

  def orderable_name
    case object.orderable
    when Course then %(Курс "#{object.orderable.name}")
    when Subscription then subscription_name
    end
  end

  def orderable_path
    case object.orderable
    when Course then h.course_path(object.orderable)
    when Subscription then subscription_path
    end
  end

  def subscription_name
    case object.orderable.subject
    when 'businesshacks' then 'Подписка "Бизнесхаки"'
    end
  end

  def subscription_path
    case object.orderable.subject
    when 'businesshacks' then h.businesshacks_path
    end
  end
end
