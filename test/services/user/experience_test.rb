require 'test_helper'

class User::ExperienceTest < ActiveSupport::TestCase
  let(:user) { users :one }
  subject { described_class.(user) }

  describe '100' do
    before { user.update_attribute(:experience, 100) }
    it('calculates level') { subject.level.must_equal 1 }
    it('calculates experience in current level') { subject.in_current_level.must_equal 0 }
    it('calculates experience for next level') { subject.for_next_level.must_equal 204 }
  end

  describe '1000' do
    before { user.update_attribute(:experience, 1000) }
    it('calculates level') { subject.level.must_equal 4 }
    it('calculates experience in current level') { subject.in_current_level.must_equal 1000-919 }
    it('calculates experience for next level') { subject.for_next_level.must_equal 1314-919 }
  end

  describe '2785' do
    before { user.update_attribute(:experience, 2785) }
    it('calculates level') { subject.level.must_equal 7 }
    it('calculates experience in current level') { subject.in_current_level.must_equal 2785-2250 }
    it('calculates experience for next level') { subject.for_next_level.must_equal 2786-2250 }
  end

  describe '2786' do
    before { user.update_attribute(:experience, 2786) }
    it('calculates level') { subject.level.must_equal 8 }
    it('calculates experience in current level') { subject.in_current_level.must_equal 0 }
    it('calculates experience for next level') { subject.for_next_level.must_equal 3364-2786 }
  end

  describe 'level calculation without user' do
    let(:level) { described_class.level(experience) }

    describe '100' do
      let(:experience) { 100 }
      it('calculates level') { level.must_equal 1 }
    end

    describe '1000' do
      let(:experience) { 1000 }
      it('calculates level') { level.must_equal 4 }
    end

    describe '2785' do
      let(:experience) { 2785 }
      it('calculates level') { level.must_equal 7 }
    end

    describe '100' do
      let(:experience) { 2786 }
      it('calculates level') { level.must_equal 8 }
    end
  end
end
