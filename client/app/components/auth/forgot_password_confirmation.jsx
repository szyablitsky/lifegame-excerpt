import React from 'react'
import Modal from '../modal'

const ForgotPasswordConfirmation = React.createClass({
  displayName: 'ForgotPasswordConfirmation',

  componentWillMount() {
    this.promise = new Promise((resolve, _) => {
      this.close = resolve
    })
  },

  render() {
    return(
      <Modal onClose={this.close}>
        <div className='message'>Письмо с инструкциями по смене пароля отправлено вам на почту</div>
      </Modal>
    )
  }
})

export default ForgotPasswordConfirmation
