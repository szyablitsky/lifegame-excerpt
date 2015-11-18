import React from 'react'
import Modal from '../modal'
import imagePath from '../../helpers/image_path'

const SignUpConfirmation = React.createClass({
  displayName: 'SignUpConfirmation',

  componentWillMount() {
    this.promise = new Promise((resolve, _) => {
      this.close = resolve
    })
  },

  render() {
    return(
      <Modal onClose={this.close}>
        <div className='title'>Спасибо за регистрацию</div>
        <div className='message'>Письмо с подтверждением отправлено вам на почту</div>
        <img src={imagePath('auth/sign_up_confirmation.png')} />
        <div className='skill-badge'>
          <span className='flaticon-compass79' />
          Первый шаг <strong>+1</strong>
        </div>
      </Modal>
    )
  }
})

export default SignUpConfirmation
