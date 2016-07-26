import React from 'react'

import css from './create_step.sass'

export default class CreateStep extends React.Component {
  render() {
    const { position, createStep } = this.props

    return (
      <div className={css.container}>
        <div className={css.button} title='Добавить шаг'
             onClick={createStep.bind(null, position)} />
      </div>
    )
  }
}

CreateStep.propTypes = {
  position: React.PropTypes.number.isRequired,
  createStep: React.PropTypes.func.isRequired,
}
