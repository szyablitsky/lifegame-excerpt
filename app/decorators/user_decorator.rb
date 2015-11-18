class UserDecorator < Draper::Decorator
  delegate_all

  SEGMENT_IMAGES = {
    'business_owner' => -> { h.asset_path('user/segment0.png') },
    'serial_entrepreneur' => -> { h.asset_path('user/segment1.png') },
    'personal_development_fan' => -> { h.asset_path('user/segment2.png') }
  }

  def normal_image_url(width = 72, height = 72)
    url = h.ix_image_url(image.path, w: width, h: height, fit: 'facearea', faceindex: 1, facepad: 2) if image.present?
    url = SEGMENT_IMAGES[segment].call() if url.nil? && segment.present?
    url = h.asset_path('user/segment2.png') unless url.present?
    url
  end
end
