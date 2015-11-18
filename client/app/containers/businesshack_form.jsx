import { Provider } from 'react-redux';
import BusinesshackForm from '../components/businesshack/form'
import getStore from '../store'

const Factory = (props) => {
  return (
    <Provider store={getStore(props.initialState)}>
      <BusinesshackForm businesshack={props.businesshack} />
    </Provider>
  )
}

export default Factory
