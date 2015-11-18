class Businesshack::ApplyTags
  def self.call(businesshack, tags)
    new(businesshack, tags).()
  end

  def initialize(businesshack, tags)
    @businesshack = businesshack
    @new_tags = tags
  end

  def call()
    remove_unneded_tags
    add_new_tags
    delete_tags_without_hacks
  end

  private

  attr_reader :businesshack, :new_tags

  def old_tags
    @old_tags ||= businesshack.tags.map(&:name)
  end

  def remove_unneded_tags
    (old_tags - new_tags).each do |tag_name|
      businesshack.tags.destroy(Businesshack::Tag.find_by(name: tag_name))
    end
  end

  def add_new_tags
    (new_tags - old_tags).each do |tag_name|
      businesshack.tags << Businesshack::Tag.find_or_create_by!(name: tag_name)
    end
  end

  def delete_tags_without_hacks
    Businesshack::Tag.where(businesshack_tags_count: 0).destroy_all
  end
end
