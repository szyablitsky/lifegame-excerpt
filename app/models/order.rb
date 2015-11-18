class Order < ActiveRecord::Base
  belongs_to :user
  belongs_to :orderable, polymorphic: true

  before_destroy :destroy_orderable

  scope :sorted, -> { order created_at: :desc }

  private

  def destroy_orderable
    return false if complete?
    orderable.destroy unless orderable.is_a?(Course)
  end
end
