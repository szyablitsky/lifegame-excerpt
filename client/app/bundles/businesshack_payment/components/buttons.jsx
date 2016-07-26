import React from 'react'

import Loader from 'shared/components/loader'

import css from './form.sass'

export default class Buttons extends React.Component {
  handleClick() {
    const { inProgress, create } = this.props
    if (!inProgress) create()
  }

  render() {
    const { inProgress } = this.props
    return (
      <div className={css.buttons}>
        <button className={css.button} onClick={this.handleClick.bind(this)}>
          {inProgress ? <Loader /> : 'Оплатить'}
        </button>
      </div>
    )
  }
}

Buttons.propTypes = {
  inProgress: React.PropTypes.bool.isRequired,
  create: React.PropTypes.func.isRequired,
}
