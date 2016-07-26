import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { publish } from '../actions/hack'
import Buttons from '../components/buttons'

const mapStateToProps = (state) => ({
  inProgress: state.hack.requestInProgress,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({ publish }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Buttons)
