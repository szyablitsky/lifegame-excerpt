import React from 'react'
import map from 'lodash/map'

import PaymentType from '../containers/payment_type'

import css from './form.sass'

const TYPES = [
  { id: 'AC', name: 'Банковская карта', icons: ['visa', 'masterCard'] },
  { id: 'PC', name: 'Яндекс.Деньги', icons: ['yandexMoney'] },
  { id: 'WM', name: 'WebMoney', icons: ['webMoney'] },
]

export default class PaymentTypes extends React.Component {
  render() {
    const { price } = this.props
    return (
      <div className={css.paymentTypesContainer}>
        <div className={css.price}>{price}<i className='fa fa-rub' /> за хак</div>
        <div className={css.types}>
          {map(TYPES, (type) => <PaymentType key={type.id} type={type} />)}
        </div>
      </div>
    )
  }
}

PaymentTypes.propTypes = {
  price: React.PropTypes.number.isRequired,
}
