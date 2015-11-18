class BusinesshackDecorator < ScribedDecorator
  delegate_all

  def author_name
    object.author.full_name
  end

  def author_image
    object.author.decorate.normal_image_url(37, 37)
  end

  def description?
    !check_scribe_empty?(object.description)
  end

  def description
    make_external_links(object.description)
  end

  def benefits?
    !check_scribe_empty?(object.benefits)
  end

  def benefits
    make_external_links(object.benefits)
  end

  def results?
    !check_scribe_empty?(object.results)
  end

  def results
    make_external_links(object.results)
  end
end
