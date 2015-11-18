# https://bibwild.wordpress.com/2014/07/17/activerecord-concurrency-in-rails4-avoid-leaked-connections/
# http://vigram-software-generals.blogspot.in/2014/03/ruby-threads-activerecord-too-many.html
# https://devcenter.heroku.com/articles/concurrency-and-database-connections
# http://stackoverflow.com/questions/26883127/proper-activerecord-connection-pool-size-with-sidekiq-and-postgres-for-multiple

class ResetPasswordMailer < ActionMailer::Base
  default from: 'LifeGame <info@lifegame.bz>'

  def reset(user)
    @user = user
    mail(to: user.email, subject: "Инструкции по смене пароля").tap do |_|
      # ActiveRecord::Base.connection.close if ActiveRecord::Base.connection
      ActiveRecord::Base.clear_active_connections!
    end
  end
end
