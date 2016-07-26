import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import CreateStep from '../components/create_step'
import { createStep } from '../actions/step'

const mapDispatchToProps = (dispatch) => bindActionCreators({ createStep }, dispatch)

export default connect(() => ({}), mapDispatchToProps)(CreateStep)
