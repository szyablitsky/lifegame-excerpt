import { Provider } from 'react-redux';
import UserSkills from '../components/user/skills'
import getStore from '../store'

const Factory = (props) => {
  return (
    <Provider store={getStore(props.initialState)}>
      <UserSkills images={props.images} />
    </Provider>
  )
}

export default Factory
