import { connect } from 'react-redux'

import PaymentTypes from '../components/payment_types'

const mapStateToProps = (state) => ({
  price: state.hack.price,
})

export default connect(mapStateToProps)(PaymentTypes)
