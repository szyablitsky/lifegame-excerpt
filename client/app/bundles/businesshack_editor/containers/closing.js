import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Closing from '../components/closing'
import { change, save } from '../actions/hack'

const mapStateToProps = (state) => ({
  status: state.hack.get('status'),
  closing: state.hack.getIn(['data', 'closing']),
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  change, save,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Closing)
