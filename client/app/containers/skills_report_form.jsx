import { Provider } from 'react-redux';
import SkillsReportForm from '../components/skills/report_form'
import getStore from '../store'

const Factory = (props) => {
  return (
    <Provider store={getStore(props)}>
      <SkillsReportForm />
    </Provider>
  )
}

export default Factory
