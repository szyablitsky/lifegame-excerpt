import React from 'react'

import Loader from 'shared/components/loader'

import css from './form.sass'

export default class Buttons extends React.Component {
  handleSave() {
    const { inProgress, publish, onClose } = this.props
    if (!inProgress) publish(onClose)
  }


  render() {
    const { inProgress, onClose } = this.props
    return (
      <div className={css.buttons}>
        <button className='button -primary' onClick={this.handleSave.bind(this)}>
          {inProgress ? <Loader color='primary' /> : 'Опубликовать'}
        </button>
        <div className='button-spacer' />
        <button className='button -default' onClick={onClose}>Отмена</button>
      </div>
    )
  }
}

Buttons.propTypes = {
  inProgress: React.PropTypes.bool.isRequired,
  publish: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired,
}
