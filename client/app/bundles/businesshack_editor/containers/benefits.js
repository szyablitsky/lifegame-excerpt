import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Benefits from '../components/benefits'
import { changeBenefit, save } from '../actions/hack'

const mapStateToProps = (state) => ({
  benefits2: state.hack.getIn(['data', 'benefits2']).toJS(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  changeBenefit, save,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Benefits)
