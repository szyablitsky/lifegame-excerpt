class Post::Filter::Cell < Cell::Concept
  FILTERS = {
    all: 'Все',
    # popular: 'Популярные',
    # friends: 'Друзей',
    my: 'Мои'
  }
  USER_FLTERS = %i(friends my)
  DEFAULT_FILTER = :all

  def show
    render
  end

  private

  def current_filter
    model && FILTERS.keys.include?(model.to_sym) ? model.to_sym : DEFAULT_FILTER
  end

  def item(filter)
    if filter == current_filter
      content_tag(:span, class: 'link -active') { FILTERS[filter] }
    else
      link_to FILTERS[filter], posts_path(filter: filter), class: 'link'
    end
  end

  def items
    filters.map { |filter| item(filter) }.join(' | ')
  end

  def filters
    if @options[:user].present?
      FILTERS.keys.tap do |a|
        # a.delete :friends if @options[:user].friends.size.zero?
      end
    else
      FILTERS.keys - USER_FLTERS
    end
  end
end
