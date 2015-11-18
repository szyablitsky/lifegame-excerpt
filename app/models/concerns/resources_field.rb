module ResourcesField
  extend ActiveSupport::Concern

  included do
    def resources
      Resources.new(read_attribute(:resources))
    end

    def resources_attributes=(resources)
      write_attribute(:resources, resources.each_with_object({}) { |(k, v), r| r[k] = v.to_i })
    end
  end
end
