import React from 'react'
import SignUpForm from './sign_up_form'
import SignInForm from './sign_in_form'
import ForgotPasswordForm from './forgot_password_form'

const AuthForm = React.createClass({
  displayName: 'AuthForm',

  getDefaultProps() {
    return {mode: 'sign-up'}
  },

  getInitialState() {
    return {mode: this.props.mode}
  },

  switchTo(mode) {
    this.setState({mode})
  },

  form() {
    switch (this.state.mode) {
      case 'sign-up':
        return <SignUpForm authData={this.state.authData} onClose={this.props.onClose}
                           switchToSignIn={this.switchTo.bind(this, 'sign-in')} />
      case 'sign-in':
        return <SignInForm authData={this.state.authData} switchToSignUp={this.switchTo.bind(this, 'sign-up')}
                           switchToForgotPassword={this.switchTo.bind(this, 'forgot-password')} />
      case 'forgot-password':
        return <ForgotPasswordForm authData={this.state.authData} onClose={this.props.onClose}
                                   switchToSignIn={this.switchTo.bind(this, 'sign-in')} />
    }
  },

  render() {
    return (
      <div className='auth-form-container'>
        <div className='topborder' />
        {this.form()}
      </div>
    )
  }
})

export { AuthForm }

const Factory = (props) => <AuthForm {...props} />
window.AuthForm = Factory
export default Factory
