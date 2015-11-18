require 'test_helper'

class User::LinksConceptTest < Cell::TestCase
  describe 'show' do
    subject { concept('user/links/cell').(:show) }

    it do
      skip('does not work')
      must_match(/Вход/)
    end

    it do
      skip('does not work')
      must_match(/Регистрация/)
    end
  end
end
