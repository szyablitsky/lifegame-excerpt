class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :created_at, :updated_at, :author, :addressee

  def author
    {
      id: object.author.id,
      first_name: object.author.first_name,
      last_name: object.author.last_name,
      avatar: object.author.decorate.normal_image_url(50, 50)
    }
  end

  def addressee
    return nil unless object.addressee.present?
    {
      name: object.addressee.full_name
    }
  end
end
