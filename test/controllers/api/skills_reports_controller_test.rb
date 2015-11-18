require 'test_helper'

class Api::SkillsReportsControllerTest < ActionController::TestCase
  describe 'POST create' do
    let(:report_params) do
      { skills_report: { skills_report_skills_attributes: [], content: nil } }
    end

    describe 'guest' do
      before { post :create, report_params }
      it { assert_response :unauthorized }
    end

    describe 'user' do
      before { login_user_one }

      describe 'with content and skills' do
        before { UserSkill.create(user: @user, skill: skill) }
        before { post :create, report_params }

        let(:report_content) { 'created report content' * 5 }
        let(:skill_content) { 'created skill content' }
        let(:skill) { skills :one }
        let(:skill_attributes) { { skill_id: skill.id, content: skill_content } }
        let(:report_params) do
          {
            skills_report: {
              skills_report_skills_attributes: [skill_attributes],
              content: report_content
            }
          }
        end

        it('responds with success') { assert_response :success }
        it('creates report') { SkillsReport.count.must_equal 1 }

        it('sets new report content') { SkillsReport.last.content.must_equal report_content }
        it('sets new report skill') { SkillsReport.last.skills_report_skills.last.skill.must_equal skill }
        it('sets new report skill content') { SkillsReport.last.skills_report_skills.last.content.must_equal skill_content }
        it('assigns current user to new report') { SkillsReport.last.author.must_equal @user }

        it('renders post id') { json_response['skills_report']['id'].must_equal Post.last.id }
        it('renders post content') { json_response['skills_report']['content'].must_equal report_content }
        it('renders post author') { json_response['skills_report']['author']['id'].must_equal @user.id }
      end

      describe 'without content or skills' do
        before { post :create, report_params }

        it('responds with error') { assert_response :bad_request }
        it('does not create post') { Post.count.must_equal 0 }

        it('renders error for content') { json_response['errors'].keys.must_include 'content' }
        it('renders error for post skills') { json_response['errors'].keys.must_include 'skills_report_skills' }
      end

      describe 'without skill content' do
        let(:skill) { skills :one }
        let(:report_params) do
          {
            skills_report: {
              skills_report_skills_attributes: [{ skill_id: skill.id }],
              content: 'content'
            }
          }
        end

        before { post :create, report_params }

        it('responds with error') { assert_response :bad_request }
        it('does not create post') { Post.count.must_equal 0 }

        it('renders error') { json_response['errors'].keys.must_include 'skills_report_skills.content' }
      end
    end
  end
end
