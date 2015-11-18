ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'rr'

class ActiveSupport::TestCase
  include Sorcery::TestHelpers::Rails::Controller
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  DatabaseCleaner.strategy = :truncation

  def login_user_one
    @user = users :one
    login_user
  end

  def login_user_admin
    @user = users :admin
    login_user
  end

  def json_response
    JSON.parse response.body
  end
end
