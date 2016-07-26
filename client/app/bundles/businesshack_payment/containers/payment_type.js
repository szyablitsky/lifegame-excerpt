import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { change } from '../actions/hack'
import PaymentType from '../components/payment_type'

const mapStateToProps = (state) => ({
  selected: state.hack.paymentType,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({ change }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PaymentType)
