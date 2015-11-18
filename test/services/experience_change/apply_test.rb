require 'test_helper'

class ExperienceChange::ApplyTest < ActiveSupport::TestCase
  let(:user) { users :one }
  let(:action) { :skills_report }
  let(:count) { 2 }
  subject { described_class.(user, action, count) }

  it 'increases user experience' do
    user.experience.must_equal 0
    subject
    user.reload.experience.must_equal ExperienceChange::AMOUNT[action] * count
  end

  describe 'experience change' do
    let(:change) { ExperienceChange.last }
    before { subject }

    it('creates new') { ExperienceChange.count.must_equal 1 }
    it('assigns user') { change.user.must_equal user }
    it('sets amount') { change.amount.must_equal ExperienceChange::AMOUNT[action] * count }
    it('sets action') { change.action.must_equal action.to_s }
  end

  describe 'level up' do
    describe 'when experience change crosses level boundary' do
      before do
        user.update_attributes(level: 1, experience: 300, skill_points: 0)
        subject
      end
      it('increments user level') { user.reload.level.must_equal 2 }
      it('increments user skill points') { user.reload.skill_points.must_equal 1 }
    end

    describe 'when experience change does not cross level boundary' do
      before do
        user.update_attributes(level: 1, experience: 100, skill_points: 0)
        subject
      end
      it('does not change user level') { user.reload.level.must_equal 1 }
      it('does not change user skill points') { user.reload.skill_points.must_equal 0 }
    end
  end
end
