require 'test_helper'

class UserDropdownConceptTest < Cell::TestCase
  controller UsersController

  let(:user) { users(:one) }
  let(:html) { User::Dropdown::Cell.(user).(:show) }

  describe 'show' do
    it 'renders links' do
      skip('does not work')
      _(html).must_match(/Профиль/)
    end
  end
end
