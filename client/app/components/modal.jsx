import React from 'react'
import imagePath from '../helpers/image_path'

const Modal = React.createClass({
  displayName: 'Modal',

  close() {
    $(document).off('keyup')
    this.props.onClose()
  },

  componentDidMount() {
    $(document).on('keyup', (e) => {
      if (e.keyCode == 27) this.close()
    })
  },

  backdrop() {
    return(
      <div className='modal-backdrop'>
        <div className='close' onClick={this.close}>
          <img src={imagePath('modal_close.png')} />
        </div>
      </div>
    )
  },

  modal() {
    return(
      <div className='modal-content'>
        {this.props.children}
      </div>
    )
  },

  render() {
    return(
      <div>
        {this.backdrop()}
        {this.modal()}
      </div>
    )
  }
})

export default Modal
