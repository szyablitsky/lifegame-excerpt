# https://bibwild.wordpress.com/2014/07/17/activerecord-concurrency-in-rails4-avoid-leaked-connections/
# http://vigram-software-generals.blogspot.in/2014/03/ruby-threads-activerecord-too-many.html
# https://devcenter.heroku.com/articles/concurrency-and-database-connections
# http://stackoverflow.com/questions/26883127/proper-activerecord-connection-pool-size-with-sidekiq-and-postgres-for-multiple

class CommentMailer < ActionMailer::Base
  default from: 'LifeGame <info@lifegame.bz>'

  def commentable_email(comment)
    @commentable_author = comment.commentable.author
    @comment_author = comment.author
    @comment_content = comment.content
    set_commentable_type(comment)
    set_commentable_link(comment)
    mail(to: "#{@commentable_author.full_name} <#{@commentable_author.email}>",
         subject: 'LifeGame | Новый комментарий').tap do |_|
      # ActiveRecord::Base.connection.close if ActiveRecord::Base.connection
      ActiveRecord::Base.clear_active_connections!
    end
  end

  def addressee_email(comment)
    @addressee = comment.addressee
    @comment_author = comment.author
    @comment_content = comment.content
    set_commentable_link(comment)
    mail(to: "#{@addressee.full_name} <#{@addressee.email}>",
         subject: 'LifeGame | Ответ на ваш комментарий').tap do |_|
      # ActiveRecord::Base.connection.close if ActiveRecord::Base.connection
      ActiveRecord::Base.clear_active_connections!
    end
  end

  private

  def set_commentable_type(comment)
    @commentable_type = case comment.commentable
    when Businesshack then 'бизнесхак'
    when SkillsReport then 'отчет'
    end
  end

  def set_commentable_link(comment)
    @commentable_link = case comment.commentable
    when Businesshack then businesshack_url(comment.commentable, anchor: 'comments')
    when SkillsReport then posts_url(anchor: "post-comments-#{comment.commentable.id}")
    end
  end
end
