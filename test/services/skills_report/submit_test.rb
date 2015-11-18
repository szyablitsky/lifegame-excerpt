require 'test_helper'

class SkillsReport::SubmitTest < ActiveSupport::TestCase
  let(:skill) { skills :one }
  let(:skills_attributes) { { skill_id: skill.id, content: 'skill content' } }
  let(:skills_report_params) do
    {
      content: 'report content' * 10,
      skills_report_skills_attributes: [skills_attributes]
    }
  end
  let(:user) { users :one }
  subject { described_class.(skills_report_params, user) }

  describe 'with valid params' do
    before { @user_skill = UserSkill.create(user: user, skill: skill) }

    it('saves report') { subject; Post.count.must_equal 1 }
    it('succeds') { subject.success?.must_equal true }
    it('returns report') { subject.must_be_instance_of SkillsReport }

    it 'increases user skill count' do
      @user_skill.count.must_equal 0
      subject
      @user_skill.reload.count.must_equal 1
    end

    it 'calls experience change apply' do
      mock(ExperienceChange::Apply).call(user, :skills_report, 1)
      subject
    end

    describe 'resources adjustment' do
      let(:skill2) { skills :two }
      let(:skills_attributes_two) { { skill_id: skill2.id, content: 'skill content' } }
      let(:skills_report_params) do
        {
          content: 'report content' * 10,
          skills_report_skills_attributes: [skills_attributes, skills_attributes_two]
        }
      end

      before { UserSkill.create(user: user, skill: skill2) }

      it 'adjusts user resources' do
        user.update_attribute(:resources, time: 10, energy: 10, money: 10)
        skill.update_attribute(:resources, time: 1, energy: -1, money: 0)
        skill2.update_attribute(:resources, time: -2, energy: 0, money: 5)
        subject
        user_resources = user.reload.resources

        user_resources.time.must_equal 9
        user_resources.energy.must_equal 9
        user_resources.money.must_equal 15
      end
    end
  end

  describe 'with invalid params' do
    let(:skills_report_params) { nil }

    it('does not save report') { subject; Post.count.must_equal 0 }
    it('fails') { subject.success?.must_equal false }
  end
end
