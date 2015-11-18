require 'test_helper'

class BusinesshacksControllerTest < ActionController::TestCase
  let(:hack) { businesshacks :one }
  let(:today) { Date.today }

  class << self
    def check_no_access_visitor
      describe 'visitor' do
        before { subject }
        it('redirects to root') { assert_redirected_to root_path }
      end
    end

    def check_no_access_user_without_subscription
      describe 'user without subscription' do
        before { login_user_one; subject }
        it('redirects to posts') { assert_redirected_to posts_path }
      end
    end

    def check_access_admin
      describe 'admin' do
        before { login_user_admin; subject }
        it('responds with success') { assert_response :success }
      end
    end

    def check_create
      describe 'with correct params' do
        it('redirects to edit') { subject; assert_redirected_to edit_businesshack_path(Businesshack.last) }
        it('assigns user to new hack') { subject; Businesshack.last.author.must_equal @user }
        it('creates new hack') { assert_difference('Businesshack.count', 1) { subject } }
      end

      describe 'with empty params' do
        let(:params) { { title: '', subtitle: '' } }
        it('renders new view again') { subject; assert_template 'new' }
        it('does not create new hack') { assert_difference('Businesshack.count', 0) { subject } }
      end
    end
  end

  def create_inactive_subscription
    @user.subscriptions.create(subject: :businesshacks, start_at: today, end_at: today)
  end

  def create_outdated_subscription
    @user.subscriptions.create(subject: :businesshacks, start_at: today - 2.days, end_at: today - 1.day, active: true)
  end

  def create_active_subscription
    @user.subscriptions.create(subject: :businesshacks, start_at: today, end_at: today, active: true)
  end

  describe 'GET index' do
    subject { get :index }

    check_no_access_visitor
    check_no_access_user_without_subscription
    check_access_admin

    describe 'user with subscription' do
      before do
        login_user_one
        create_inactive_subscription
        subject
      end

      it('responds with success') { assert_response :success }
    end
  end

  describe 'GET show' do
    subject { get :show, id: hack }

    check_no_access_visitor
    check_no_access_user_without_subscription
    check_access_admin

    describe 'user with inactive subscription' do
      before do
        login_user_one
        create_inactive_subscription
        subject
      end

      describe 'draft hack' do
        it('redirects to posts') { assert_redirected_to posts_path }
      end

      describe 'published hack' do
        let(:hack) { businesshacks :published }
        it('redirects to posts') { assert_redirected_to posts_path }
      end

      describe 'published free hack' do
        let(:hack) { businesshacks :free }
        it('responds with success') { assert_response :success }
      end
    end

    describe 'user with outdated subscription' do
      before do
        login_user_one
        create_outdated_subscription
        subject
      end

      describe 'draft hack' do
        it('redirects to posts') { assert_redirected_to posts_path }
      end

      describe 'published hack' do
        let(:hack) { businesshacks :published }
        it('redirects to posts') { assert_redirected_to posts_path }
      end

      describe 'published free hack' do
        let(:hack) { businesshacks :free }
        it('responds with success') { assert_response :success }
      end
    end

    describe 'user with active subscription' do
      before do
        login_user_one
        @user.subscriptions.create(subject: :businesshacks, start_at: today, end_at: today, active: true)
      end

      describe 'draft hack' do
        before { subject }
        it('redirects to posts') { assert_redirected_to posts_path }
      end

      describe 'published hack' do
        let(:hack) { businesshacks :published }
        it('responds with success') { assert_response :success }
      end

      describe 'published free hack' do
        let(:hack) { businesshacks :free }
        it('responds with success') { assert_response :success }
      end
    end

    describe 'author' do
      before do
        login_user_one
        hack.update_attribute(:author, @user)
      end

      it('responds with success') { assert_response :success }
    end
  end

  describe 'GET new' do
    subject { get :new }

    check_no_access_visitor
    check_no_access_user_without_subscription
    check_access_admin

    describe 'user with subscription' do
      before do
        login_user_one
        create_inactive_subscription
        subject
      end

      it('responds with success') { assert_response :success }
    end
  end

  describe 'POST create' do
    let(:params) { { title: 'title', subtitle: 'subtitle' } }
    subject { post :create, businesshack: params }

    check_no_access_visitor
    check_no_access_user_without_subscription

    describe 'user with subscription' do
      before do
        login_user_one
        create_inactive_subscription
      end

      check_create
    end

    describe 'admin' do
      before { login_user_admin }
      check_create
    end
  end

  describe 'GET edit' do
    subject { get :edit, id: hack }

    check_no_access_visitor
    check_no_access_user_without_subscription
    check_access_admin

    describe 'user with active subscription' do
      before do
        login_user_one
        create_active_subscription
        subject
      end

      it('redirects to posts') { assert_redirected_to posts_path }
    end

    describe 'author' do
      before do
        login_user_one
        create_inactive_subscription
        hack.update_attribute(:author, @user)
        subject
      end

      it('responds with success') { assert_response :success }
    end
  end
end
