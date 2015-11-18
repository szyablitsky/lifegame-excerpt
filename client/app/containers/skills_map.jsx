import { Provider } from 'react-redux';
import SkillsMap from '../components/skills/map'
import getStore from '../store'

const Factory = (props) => {
  return (
    <Provider store={getStore(props.initialState)}>
      <SkillsMap images={props.images} />
    </Provider>
  )
}

export default Factory
