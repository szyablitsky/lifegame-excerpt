class ResetPasswordMailerPreview < ActionMailer::Preview
  def reset
    user = User.last
    user.reset_password_token = '00token00'
    ResetPasswordMailer.reset(user)
  end
end
