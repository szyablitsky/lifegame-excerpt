class User::Links::Cell < Cell::Concept
  def show
    render
  end

  private

  def hide_signup
    model && model[:hide_signup]
  end
end
