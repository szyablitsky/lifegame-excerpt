class Resources
  attr_accessor :time, :energy, :money

  def initialize(resources)
    @time = resources['time']
    @energy = resources['energy']
    @money = resources['money']
  end

  def persisted?() false; end
  def new_record?() false; end
  def marked_for_destruction?() false; end
  def _destroy() false; end
end
