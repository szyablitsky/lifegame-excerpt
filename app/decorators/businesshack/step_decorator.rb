class Businesshack::StepDecorator < ScribedDecorator
  delegate_all

  def content?
    !check_scribe_empty?(object.content)
  end

  def content
    make_external_links(object.content)
  end
end
