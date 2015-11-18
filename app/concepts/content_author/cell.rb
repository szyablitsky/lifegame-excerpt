class ContentAuthor::Cell < Cell::Concept
  include Imgix::Rails::ViewHelper

  def show
    render
  end

  private

  delegate :short_description, :description, to: :model

  def avatar
    model.image.try(:path)
  end

  def name
    model.full_name
  end
end
