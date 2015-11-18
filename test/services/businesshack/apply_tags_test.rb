require 'test_helper'

class Businesshack::ApplyTagsTest < ActiveSupport::TestCase
  let(:businesshack) { businesshacks :one }
  let(:tag_name_one) { 'one' }
  let(:tag_name_two) { 'two' }

  before { businesshack.tags << Businesshack::Tag.create(name: tag_name_one) }

  describe 'adding tags' do
    subject { described_class.(businesshack, [tag_name_one, tag_name_two]) }

    it('creates new tag') { assert_difference('Businesshack::Tag.count', 1) { subject } }
    it('adds new tag to hack') { subject; businesshack.tags.map(&:name).must_include tag_name_two }
    it('keeps old tag') { subject; businesshack.tags.map(&:name).must_include tag_name_one }
  end

  describe 'removing tags' do
    subject { described_class.(businesshack, [tag_name_two]) }

    it('adds new tag to hack') { subject; businesshack.tags.map(&:name).must_include tag_name_two }
    it('removes old tag from businesshack') { subject; businesshack.tags.map(&:name).wont_include tag_name_one }
    it('removes old tag from database') { subject; Businesshack::Tag.where(name: tag_name_one).count.must_equal 0 }
  end
end
