class RegistrationMailerPreview < ActionMailer::Preview
  def activation_required_email
    RegistrationMailer.activation_required_email(User.last)
  end

  def activation_success_email
    RegistrationMailer.activation_success_email(User.last)
  end
end
