class Comment::Notify
  def self.call(comment)
    new(comment).()
  end

  def initialize(comment)
    @comment = comment
  end

  def call()
    notify_commentable_author unless self_comment? || addressee_is_commentable_author?
    notify_addressee if comment.addressee.present?
  end

  private

  attr_reader :comment

  def self_comment?
    comment.commentable.author == comment.author
  end

  def addressee_is_commentable_author?
    comment.addressee.present? &&
      comment.addressee == comment.commentable.author
  end

  def notify_commentable_author
    CommentMailer.commentable_email(comment).deliver_later
  end

  def notify_addressee
    CommentMailer.addressee_email(comment).deliver_later
  end
end
