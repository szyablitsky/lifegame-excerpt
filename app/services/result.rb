class Result < SimpleDelegator
  def initialize(success, object = nil)
    @success = success
    super(object)
  end

  def success?
    @success
  end

  def class
    __getobj__.class
  end
end
