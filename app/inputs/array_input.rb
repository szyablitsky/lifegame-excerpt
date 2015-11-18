class ArrayInput < SimpleForm::Inputs::StringInput
  def input(wrapper_options)
    input_html_options[:type] ||= input_type

    array.map do |array_el|
      '<div>'.html_safe +
      @builder.text_field(nil, input_html_options.merge(value: array_el, name: "#{object_name}[#{attribute_name}][]")) +
      '<button class="remove_benefit">Удалить</button></div>'.html_safe
    end.join +
    '<button class="add_benefit">Добавить</button>'
  end

  def input_type
    :text
  end

  private

  def array
    object.public_send(attribute_name).tap do |a|
      a << '' if a.empty?
    end
  end
end
