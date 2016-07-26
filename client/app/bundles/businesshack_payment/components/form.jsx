import React from 'react'

import User from '../containers/user'
import PaymentTypes from '../containers/payment_types'
import Buttons from '../containers/buttons'

import css from './form.sass'

export default class Form extends React.Component {
  render() {
    return (
      <div className={css.form}>
        <div className={css.header}>
          <div className={css.title}>Получи доступ к этому хаку</div>
          <div className={css.subtitle}>прямо сейчас!</div>
        </div>
        {true ? <div>
          <User />
          <PaymentTypes />
          <Buttons />
        </div> : null
        }
      </div>
    )
  }
}

Form.propTypes = {
  onClose: React.PropTypes.func.isRequired,
}
