import React from 'react'
import Modal from '../modal'
import { AuthForm } from './auth_form'

class AuthModal extends React.Component {
  componentWillMount() {
    this.promise = new Promise((resolve, _) => {
      this.close = resolve
    })
  }

  render() {
    return (
      <Modal onClose={this.close}>
        <AuthForm mode={this.props.mode} onClose={this.close} />
      </Modal>
    )
  }
}

window.AuthModal = AuthModal
export default AuthModal
