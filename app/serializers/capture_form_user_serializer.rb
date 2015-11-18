class CaptureFormUserSerializer
  NullUser = Struct.new(:first_name, :last_name, :email, :phone)

  def initialize(user)
    @user = user || NullUser.new
  end

  def serialized_hash
    {
      firstName: @user.first_name,
      lastName: @user.last_name,
      email: @user.email,
      phone: @user.phone
    }
  end
end
