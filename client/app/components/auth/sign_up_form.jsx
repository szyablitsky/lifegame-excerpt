import React from 'react'
import Confirmation from '../../mixins/confirmation'
import SignUpConfirmation from './sign_up_confirmation'
import FormField from '../controls/form_field'

const SignUpForm = React.createClass({
  displayName: 'SignUpForm',
  mixins: [Confirmation(SignUpConfirmation)],

  getInitialState() {
    return { errors: {} }
  },

  handleSubmit(e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        user: {
          first_name: this.refs.firstName.value,
          last_name: this.refs.lastName.value,
          email: this.refs.email.value,
          password: this.refs.password.value
        }
      }),
      url: '/users/registrations'
    })
    .done(() => {
      window.yaCounterReachGoal('SIGN_UP_SUBMIT')
      if (this.props.onClose) this.props.onClose()
      this.setState({errors: {}})
      this.confirm()
    })
    .fail((data) => {
      if (data.responseJSON) {
        this.setState({errors: data.responseJSON.errors})
      } else {
        Growlyflash.error('Ошибка обработки. Попробуйте перезагрузить страницу.')
      }
    })
  },

  render() {
    return (
      <form className='auth-form' onSubmit={this.handleSubmit}>
        <div className='form-header'>
          <span className='action'>Регистрация</span>
          {' или '}
          <a className='alternative' onClick={this.props.switchToSignIn}>Вход</a>
        </div>
        <div className='description'>Зарегистрируйтесь чтобы войти бесплатно</div>
        <FormField className='-name -padded' errors={this.state.errors} field='first_name'>
          <input type='text' ref='firstName' className='input-field' placeholder='Имя' />
        </FormField>
        <FormField className='-name' errors={this.state.errors} field='last_name'>
          <input type='text' ref='lastName' className='input-field' placeholder='Фамилия' />
        </FormField>
        <FormField errors={this.state.errors} field='email'>
          <input type='email' ref='email' className='input-field' placeholder='Электронная почта' />
        </FormField>
        <FormField errors={this.state.errors} field='password'>
          <input type='password' ref='password' className='input-field' placeholder='Пароль' />
        </FormField>
        <input type='submit' className='submit-button -stretch' value='Зарегистрироваться' />
      </form>
    )
  }
})

export default SignUpForm
