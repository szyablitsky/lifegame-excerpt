import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { changeToggle } from '../actions/hack'
import Toggles from '../components/toggles'

const mapStateToProps = (state) => ({
  paid: state.hack.data.paid,
  dark: state.hack.data.dark,
  service: state.hack.data.service,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({ changeToggle }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Toggles)
