class UserUploader < BaseUploader
  version :normal do
    process resize_to_fill: [150, 150]
    process convert: 'jpg'
  end

  version :thumb do
    process resize_to_fill: [45, 45]
    process convert: 'jpg'
  end
end
