import React from 'react'
import ReactDOM from 'react-dom'

import PaymentModal from '../../bundles/businesshack_payment/components/modal'
import authModal from '../auth'

function paymentModal(props) {
  let component = null
  // eslint-disable-next-line max-statements-per-line
  const element = <PaymentModal {...props} ref={(c) => { component = c }} />
  const wrapper = document.body.appendChild(document.createElement('div'))
  ReactDOM.render(element, wrapper)

  component.promise.then(() => {
    ReactDOM.unmountComponentAtNode(wrapper)
    setTimeout(() => {
      wrapper.remove()
    })
  })
}

export default function initPaymentButton() {
  console.log($('.js-hack-payment'));
  $('.js-hack-payment').on('click', function () {
    console.log('payment!');
    if (window.appData.loggedIn) {
      const id = $(this).data('id')
      const price = $(this).data('price')
      paymentModal({ id, price })
    } else {
      authModal('sign-in')
    }
  })
}
