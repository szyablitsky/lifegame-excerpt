import { Provider } from 'react-redux';
import UserBalanceWheel from '../components/user/balance_wheel'
import getStore from '../store'

const Factory = (props) => {
  return (
    <Provider store={getStore(props)}>
      <UserBalanceWheel />
    </Provider>
  )
}

export default Factory
