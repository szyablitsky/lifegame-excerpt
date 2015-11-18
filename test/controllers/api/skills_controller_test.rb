require 'test_helper'

class Api::SkillsControllerTest < ActionController::TestCase
  describe 'POST unlock' do
    let(:skill) { skills :one }
    let(:skill_params) { { id: skill.id } }

    describe 'guest' do
      before { post :unlock, skill_params }
      it { assert_response :unauthorized }
    end

    describe 'user' do
      before { login_user_one }

      describe 'when skill is locked and avaliable' do
        before { post :unlock, skill_params }

        it('responds with success') { assert_response :success }
        it('creates user skill') { UserSkill.count.must_equal 1 }
        it('renders user') { json_response.must_be_kind_of Hash }
      end

      describe 'when skill is unlocked' do
        before do
          @user.skills << skill
          post :unlock, skill_params
        end

        it('responds with error') { assert_response :bad_request }
        it('does not create new user skill') { UserSkill.count.must_equal 1 }

        it('renders error') { json_response['errors'].keys.must_include 'user_skill' }
      end

      describe 'when skill is unavailable' do
        before do
          skill.update_attribute(:price, 2)
          post :unlock, skill_params
        end

        it('responds with error') { assert_response :bad_request }
        it('does not create new user skill') { UserSkill.count.must_equal 0 }

        it('renders error') { json_response['errors'].keys.must_include 'user_skill' }
      end
    end
  end
end
