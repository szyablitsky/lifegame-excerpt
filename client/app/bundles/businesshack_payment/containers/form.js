import React from 'react'
import { Provider } from 'react-redux'

import PaymentForm from '../components/form'
import createStore from '../store'

export default class PaymentFormContainer extends React.Component {
  render() {
    return (
      <Provider store={createStore(this.props)}>
        <PaymentForm onClose={this.props.onClose}/>
      </Provider>
    )
  }
}

PaymentFormContainer.propTypes = {
  id: React.PropTypes.number.isRequired,
  price: React.PropTypes.number.isRequired,
  onClose: React.PropTypes.func.isRequired,
}
