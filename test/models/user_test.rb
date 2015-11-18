require 'test_helper'

class UserTest < ActiveSupport::TestCase
  include ActiveJob::TestHelper

  test 'should send a greet email' do
    perform_enqueued_jobs do
      user = User.create(
        email: 'test@lifegame.ru', first_name: 'Test', last_name: 'Test',phone: '+78978978585',
        birth_date: Date.today - 25.years, password: 'foobar', password_confirmation: 'foobar',
        business_age_limit: 60
      )

      assert_equal ActionMailer::Base.deliveries.last.to, [user.email]
      assert_equal ActionMailer::Base.deliveries.last.subject, "LifeGame | подтверждение регистрации"
    end
  end
end
