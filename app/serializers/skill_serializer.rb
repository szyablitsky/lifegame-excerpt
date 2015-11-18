class SkillSerializer < ActiveModel::Serializer
  include Imgix::Rails::ViewHelper

  attributes :id, :name, :description, :examples, :resources, :price, :ancestry,
             :parent_id, :thumb, :image, :branch_name

  def thumb
    ix_image_url(object.image.path, w: 72, h: 72, fit: 'crop', crop: 'entropy') if object.image.present?
  end

  def image
    ix_image_url(object.image.path, w: 280, h: 280, fit: 'crop', crop: 'entropy') if object.image.present?
  end
end
