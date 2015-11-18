require 'test_helper'

class Api::BusinesshacksControllerTest < ActionController::TestCase
  let(:today) { Date.today }

  def create_inactive_subscription
    @user.subscriptions.create(subject: :businesshacks, start_at: today, end_at: today)
  end

  describe 'PATCH update' do
    let(:hack) { businesshacks :one }
    let(:hack_params) { { title: 'new title', subtitle: 'new subtitle', description: 'new description' } }

    describe 'guest' do
      before { patch :update, id: hack.id, businesshack: hack_params }
      it { assert_response :unauthorized }
    end

    describe 'user' do
      before { login_user_one }
      before { create_inactive_subscription }
      before { patch :update, id: hack.id, businesshack: hack_params }

      it { assert_response :unauthorized }
    end

    describe 'author' do
      before { login_user_one }
      before { create_inactive_subscription }
      before { hack.update_attribute(:author, @user) }
      before { patch :update, id: hack.id, businesshack: hack_params }

      it('responds with success') { assert_response :success }
      it('updates hack') { hack.reload.title.must_equal 'new title' }
    end

    describe 'admin' do
      before { login_user_admin }
      before { patch :update, id: hack.id, businesshack: hack_params }

      it('responds with success') { assert_response :success }
      it('updates hack') { hack.reload.title.must_equal 'new title' }
    end
  end

  describe 'PATCH tags' do
    let(:hack) { businesshacks :one }
    let(:tags) { ['new', 'tag'] }

    describe 'guest' do
      before { patch :tags, id: hack.id, tags: tags }
      it { assert_response :unauthorized }
    end

    describe 'user' do
      before { login_user_one }
      before { create_inactive_subscription }
      before { patch :tags, id: hack.id, tags: tags }

      it { assert_response :unauthorized }
    end

    describe 'author' do
      before { login_user_one }
      before { create_inactive_subscription }
      before { hack.update_attribute(:author, @user) }
      before { patch :tags, id: hack.id, tags: tags }

      it('responds with success') { assert_response :success }
      it('updates hack') { hack.reload.tags.map(&:name).must_equal tags }
    end

    describe 'admin' do
      before { login_user_admin }
      before { patch :tags, id: hack.id, tags: tags }

      it('responds with success') { assert_response :success }
      it('updates hack') { hack.reload.tags.map(&:name).must_equal tags }
    end
  end

  describe 'PATCH state' do
    let(:hack) { businesshacks :one }
    let(:hack_params) { { free: true, draft: false } }

    describe 'guest' do
      before { patch :state, id: hack.id, businesshack: hack_params }
      it { assert_response :unauthorized }
    end

    describe 'user' do
      before { login_user_one }
      before { create_inactive_subscription }
      before { patch :state, id: hack.id, businesshack: hack_params }

      it { assert_response :unauthorized }
    end

    describe 'author' do
      before { login_user_one }
      before { create_inactive_subscription }
      before { hack.update_attribute(:author, @user) }
      before { patch :state, id: hack.id, businesshack: hack_params }

      it { assert_response :unauthorized }
    end

    describe 'admin' do
      before { login_user_admin }
      before { patch :state, id: hack.id, businesshack: hack_params }

      it('responds with success') { assert_response :success }
      it('updates free attribute') { hack.reload.free.must_equal true }
      it('updates draft attribute') { hack.reload.draft.must_equal false }
    end
  end
end
