class BaseUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :fog

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  def store_dir
    "#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end

  def filename
    "image.jpg" if original_filename.present?
  end
end
