import { connect } from 'react-redux'

import Steps from '../components/steps'

const mapStateToProps = (state) => ({
  stepIds: state.steps.get('stepIds').toJS(),
})

export default connect(mapStateToProps)(Steps)
