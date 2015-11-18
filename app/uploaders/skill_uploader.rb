class SkillUploader < BaseUploader
  version :thumb do
    process resize_to_fill: [100, 78]
    process convert: 'jpg'
  end
end
