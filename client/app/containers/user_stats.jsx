import { Provider } from 'react-redux';
import UserStats from '../components/user/stats'
import getStore from '../store'

const Factory = (props) => {
  return (
    <Provider store={getStore(props.initialState)}>
      <UserStats images={props.images} />
    </Provider>
  )
}

export default Factory
