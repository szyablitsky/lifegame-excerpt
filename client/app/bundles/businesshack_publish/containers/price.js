import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { changePrice } from '../actions/hack'
import Price from '../components/price'

const mapStateToProps = (state) => ({
  price: state.hack.data.price,
  error: state.hack.errors.price,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({ changePrice }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Price)
