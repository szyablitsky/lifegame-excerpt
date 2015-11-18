class HomeController < ApplicationController
  skip_before_action :not_authenticated

  layout 'landing'

  def index
    redirect_to posts_path if logged_in? && external_view
    @user = User.new
  end

  private

  def external_view
    return true if request.referer.nil?
    request.host != URI(request.referer).host
  end
end
