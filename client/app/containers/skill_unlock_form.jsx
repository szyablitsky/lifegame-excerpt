import { Provider } from 'react-redux';
import SkillUnlockForm from '../components/skill/unlock_form'
import getStore from '../store'

const Factory = (props) => {
  return (
    <Provider store={getStore(props.initialState)}>
      <SkillUnlockForm images={props.images} />
    </Provider>
  )
}

export default Factory
