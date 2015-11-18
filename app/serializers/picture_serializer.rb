class PictureSerializer < ActiveModel::Serializer
  include Imgix::Rails::ViewHelper

  attributes :id, :thumb, :full

  def thumb
    ix_image_url(object.image.path, w: 560, h: 420, fit: 'max')
  end

  def full
    ix_image_url(object.image.path, w: 1800, h: 1100, fit: 'max')
  end
end
