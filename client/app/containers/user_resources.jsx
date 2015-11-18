import { Provider } from 'react-redux';
import UserResources from '../components/user/resources'
import getStore from '../store'

const Factory = (props) => {
  return (
    <Provider store={getStore(props.initialState)}>
      <UserResources images={props.images} />
    </Provider>
  )
}

export default Factory
