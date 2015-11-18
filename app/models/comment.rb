class Comment < ActiveRecord::Base
  belongs_to :commentable, polymorphic: true, touch: true
  belongs_to :author, class_name: 'User'
  belongs_to :addressee, class_name: 'User'

  validates :content, presence: true

  default_scope { order(created_at: :asc) }

  # http://www.elabs.se/blog/72-retrieving-the-last-n-ordered-records-with-activerecord
  def self.for_preview(limit = 5)
    all.only(:order).from(all.reverse_order.limit(limit), table_name)
  end
end
