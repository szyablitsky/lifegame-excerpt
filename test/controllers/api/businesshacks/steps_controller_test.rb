require 'test_helper'

class Api::Businesshacks::StepsControllerTest < ActionController::TestCase
  describe 'POST create' do
    let(:hack) { businesshacks :one }

    describe 'guest' do
      before { post :create, businesshack_id: hack.id }
      it { assert_response :unauthorized }
    end

    describe 'user' do
      before { login_user_one }
      subject { post :create, businesshack_id: hack.id, step: step_attributes }

      describe 'with valid attributes' do
        let(:step_attributes) { { title: 'title' } }

        it('responds with success') { subject; assert_response :success }
        it('creates step') { assert_difference('hack.steps.count', +1) { subject } }
        it('assingns position to step') { subject; hack.steps.last.position.must_equal 2 }
        it('assingns content to step') { subject; hack.steps.last.title.must_equal 'title' }
        it('renders step content') { subject; json_response['businesshack/step']['title'].must_equal 'title' }
      end

      describe 'with invalid attributes' do
        let(:step_attributes) { { title: nil } }

        it('responds with success') { subject; assert_response :bad_request }
        it('does not create step') { assert_difference('hack.steps.count', 0) { subject } }
        it('renders errors') { subject; json_response['errors'].keys.must_include 'title' }
      end
    end
  end

  describe 'PATCH update' do
    let(:step) { businesshack_steps :one }
    let(:params) { { businesshack_id: step.businesshack.id, id: step.id, step: { content: 'new' } } }

    describe 'guest' do
      before { patch :update, params }
      it { assert_response :unauthorized }
    end

    describe 'user' do
      before { login_user_one }
      before { patch :update, params }

      it('responds with success') { assert_response :success }
      it('updates step') { step.reload.content.must_equal 'new' }
    end
  end

  describe 'DELETE destroy' do
    let(:step) { businesshack_steps :one }
    let(:params) { { businesshack_id: step.businesshack.id, id: step.id } }

    describe 'guest' do
      before { delete :destroy, params }
      it { assert_response :unauthorized }
    end

    describe 'user' do
      before { login_user_one }
      before { @step_after = step.businesshack.steps.create(title: 'step', position: 2) }
      subject { delete :destroy, params }

      it('responds with success') { subject; assert_response :success }
      it('destroys step') { assert_difference('Businesshack::Step.count', -1) { subject } }
      it('corrects positions') { subject; @step_after.reload.position.must_equal 1 }
    end
  end
end
