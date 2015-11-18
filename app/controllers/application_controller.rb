class ApplicationController < ActionController::Base
  include Pundit
  protect_from_forgery with: :exception
  use_growlyflash

  rescue_from Pundit::NotAuthorizedError, with: :not_authorized

  before_action :not_authenticated
  before_action :set_disqus
  before_action :set_global_frontend_initial_state

  after_action :allow_iframe, if: :metrika?

  helper_method :admin?, :home_controller?, :manage_namespace?

  private

  def not_authenticated
    redirect_to root_path unless logged_in?
  end

  def not_authorized
    flash[:alert] = 'У вас нет доступа к запрашиваемому ресурсу'
    redirect_to(request.referrer || posts_path)
  end

  def set_disqus
    @sso_params = Disqus.new(current_user).get_sso_params if logged_in?
  end

  def set_global_frontend_initial_state
    @frontend_initial_state = {}
    return unless logged_in?

    @frontend_initial_state[:user] =
      ActiveModel::SerializableResource.new(current_user).serializable_hash[:user]
  end

  def admin?
    current_user && current_user.admin?
  end

  def home_controller?
    params[:controller] =~ /home/
  end

  def allow_iframe
    response.headers.delete 'X-Frame-Options'
  end

  def metrika?
    request.referer =~ %r(^https?://([^/]+metrika.yandex\.(ru|ua|com|com\.tr|by|kz)|([^/]+\.)?webvisor\.com))
  end
end
