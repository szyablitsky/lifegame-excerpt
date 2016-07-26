import React from 'react'

import Toggles from '../containers/toggles'
import Buttons from '../containers/buttons'

import css from './form.sass'

export default class Form extends React.Component {
  render() {
    const { onClose } = this.props
    return (
      <div className={css.form}>
        <Toggles />
        <Buttons onClose={onClose} />
      </div>
    )
  }
}

Form.propTypes = {
  onClose: React.PropTypes.func.isRequired,
}
