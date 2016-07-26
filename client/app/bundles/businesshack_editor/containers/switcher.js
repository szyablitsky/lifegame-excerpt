import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Switcher from '../components/switcher'
import { changeBenefitsCount } from '../actions/hack'

const mapStateToProps = (state) => ({
  count: state.hack.getIn(['data', 'benefits2']).size,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  changeBenefitsCount,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Switcher)
