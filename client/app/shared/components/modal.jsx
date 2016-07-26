import React from 'react'
import bindAll from 'lodash/bindAll'

import css from './modal.sass'

export default class Modal extends React.Component {
  constructor(props) {
    super(props)
    bindAll(this, ['handleEscape', 'disableScroll', 'close'])
  }

  componentDidMount() {
    $(document).on('keyup', this.handleEscape)
  }

  componentWillUnmount() {
    $(document).off('keyup', this.handleEscape)
  }

  handleEscape(event) {
    if (event.keyCode == 27) this.close()
  }

  disableScroll(event) {
    event.preventDefault()
  }

  close() {
    this.props.onClose()
  }

  render() {
    return (
      <div className={css.container} onWheel={this.disableScroll}
           onTouchMove={this.disableScroll}>
        <div className={css.close} onClick={this.close} />
        {this.props.children}
      </div>
    )
  }
}

Modal.propTypes = {
  children: React.PropTypes.node,
  onClose: React.PropTypes.func,
}
