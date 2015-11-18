class Disqus
  def initialize(user)
    @user = user
  end

  def get_sso_params
    # create a JSON packet of our data attributes
    data = 	{
      'id' => @user.id,
      'username' => "#{@user.first_name} #{@user.last_name}",
      'email' => @user.email,
      'avatar' => @user.image_url
    }.to_json

    # encode the data to base64
    message = Base64.encode64(data).gsub("\n", "")
    # generate a timestamp for signing the message
    timestamp = Time.now.to_i
    # generate our hmac signature
    sig = OpenSSL::HMAC.hexdigest('sha1', DISQUS_SECRET_KEY, '%s %s' % [message, timestamp])

    # return a script tag to insert the sso message
    return {message: message, sig: sig, timestamp: timestamp}
  end
end
