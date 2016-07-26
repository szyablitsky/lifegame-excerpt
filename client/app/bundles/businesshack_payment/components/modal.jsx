import React from 'react'

import Modal from 'shared/components/modal'
import PaymentForm from '../containers/form'

export default class PaymentModal extends React.Component {
  componentWillMount() {
    this.promise = new Promise((resolve) => {
      this.close = resolve
    })
  }

  render() {
    const { id, price } = this.props
    return (
      <Modal onClose={this.close}>
        <PaymentForm id={id} price={price} onClose={this.close} />
      </Modal>
    )
  }
}

PaymentModal.propTypes = {
  id: React.PropTypes.number.isRequired,
  price: React.PropTypes.number.isRequired,
}
