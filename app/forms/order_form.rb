class OrderForm
  include ActiveModel::Model

  delegate :url_helpers, to: 'Rails.application.routes'

  attr_accessor :first_name, :last_name, :email, :phone, :type, :demo, :user, :context
  attr_reader :order

  validates :first_name, :last_name, :email, :phone, presence: true
  validates :phone, length: { minimum: 11 }

  # TODO: refactor with Result class and write tests!!!
  def save
    normalize_phone
    return false unless valid?

    create_order
    update_user_phone
    inform_intercom
    true
  end

  def url
    if demo
      url_helpers.demo_access_businesshacks_path
    else
      YandexKassa::URL.(order)
    end
  end

  private

  def create_order
    orderable = create_orderable
    @order = Order.create!(
      user: find_or_create_user,
      orderable: orderable,
      price: orderable.price
    )
  end

  def create_orderable
    case type[:orderable]
    when 'Subscription' then create_subscription

    end
  end

  def create_subscription
    start_at = Date.new(2015, 11, 15)
    Subscription.create!(
      user: find_or_create_user,
      subject: 'businesshacks',
      start_at: start_at,
      end_at: start_at + 1.year,
      price: 4990
    )
  end

  def find_or_create_user
    return user if user.present?

    @user = User.find_by(email: email)
    return user if user.present?

    password = SecureRandom.hex(8)
    @user = User.create(first_name: first_name, last_name: last_name,
                        email: email, phone: phone, password: password)
    context.auto_login(@user)
    @user
  end

  def update_user_phone
    user.update_attribute(:phone, phone) if user.phone != phone
  end

  def inform_intercom
    IntercomEndpoint.create_event(user.id, 'Оставил заявку на Бизнесхак')
  end

  def normalize_phone
    phone.gsub!(/[^\d]/, '') if phone.present?
  end
end
