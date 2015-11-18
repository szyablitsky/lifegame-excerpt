class User::Dropdown::Cell < Cell::Concept
  include Imgix::Rails::ViewHelper

  property :image

  def show
    render
  end

  private

  def user
    model
  end

  def avatar
    image.try(:path)
  end

  def admin?
    model.admin?
  end
end
