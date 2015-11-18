require 'test_helper'

class Skill::UnlockTest < ActiveSupport::TestCase
  let(:skill) { skills :one }
  let(:user) { users :one }
  subject { described_class.(skill.id, user) }

  describe 'when locked and available' do
    it('succeds') { subject.success?.must_equal true }
    it('creates user skill') { subject; UserSkill.count.must_equal 1 }
    it('assigns user to user skill') { subject; UserSkill.last.user.must_equal user }
    it('assigns skill to user skill') { subject; UserSkill.last.skill.must_equal skill }
    it('returns hash') { subject.must_be_kind_of Hash }

    it 'calls experience change apply' do
      mock(ExperienceChange::Apply).call(user, :skill_unlock, 1)
      subject
    end

    it 'substracts skill price from user skill points' do
      skill.update_attribute(:price, 1)
      user.update_attribute(:skill_points, 1)
      subject
      user.reload.skill_points.must_equal 0
    end
  end

  describe 'when unlocked' do
    before { user.skills << skill }

    it('does not create new user skill') { subject; UserSkill.count.must_equal 1 }
    it('fails') { subject.success?.must_equal false }
  end

  describe 'when user does not have enough skill points' do
    before { skill.update_attribute(:price, 2) }

    it('does not create new user skill') { subject; UserSkill.count.must_equal 0 }
    it('fails') { subject.success?.must_equal false }
  end

  describe 'when ancestor is unlocked' do
    before do
      grandparent = Skill.create(name: 'grandparent', price: 1)
      parent = grandparent.children.create(name: 'parent', price: 1)
      user.skills << parent
      skill.parent = parent
      skill.save!
    end

    it('does not create new user skill') { subject; UserSkill.count.must_equal 1 }
    it('fails') { subject.success?.must_equal false }
  end
end
