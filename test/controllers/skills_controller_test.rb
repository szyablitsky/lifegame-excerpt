require 'test_helper'

class SkillsControllerTest < ActionController::TestCase
  describe 'GET index' do
    before { get :index }
    it('redirects to root') { assert_redirected_to root_path }
  end
end
