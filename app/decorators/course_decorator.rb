class CourseDecorator < Draper::Decorator
  delegate_all

  def image_style
    opacity = image_opacity.present? ? (100.0 - image_opacity) / 100 : 1
    "opacity: #{opacity};"
  end
end
