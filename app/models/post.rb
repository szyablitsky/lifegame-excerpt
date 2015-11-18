class Post < ActiveRecord::Base
  belongs_to :author, class_name: 'User', required: true
  has_many :comments, as: :commentable, dependent: :destroy
end
