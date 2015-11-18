class ScribedDecorator < Draper::Decorator
  private

  def check_scribe_empty?(text)
    text.blank? || text == '<p><br></p>'
  end

  def make_external_links(text)
    text.gsub('<a ', '<a target="_blank" ')
  end
end
