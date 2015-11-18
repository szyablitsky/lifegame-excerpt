require 'test_helper'

class Api::HelpControllerTest < ActionController::TestCase
  describe 'POST dismiss' do
    let(:help) { 'some_help' }
    let(:help_params) { { id: help } }

    describe 'guest' do
      before { post :dismiss, help_params }
      it { assert_response :unauthorized }
    end

    describe 'user' do
      before { login_user_one }
      before { post :dismiss, help_params }

      it('responds with success') { assert_response :success }
      it('adds help to dissmissed array') { @user.reload.dismissed_help.must_include help }
    end
  end
end
