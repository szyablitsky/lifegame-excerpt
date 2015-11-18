import React from 'react'
import DisplayError from '../../mixins/display_error'
import FormField from '../controls/form_field'

const SignInForm = React.createClass({
  displayName: 'SignInForm',
  mixins: [DisplayError],

  handleSubmit(e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        user: {
          email: this.refs.email.value,
          password: this.refs.password.value,
          remember_me: this.refs.rememberMe.checked
        }
      }),
      url: '/users/sessions'
    })
    .done((data) => {
      window.yaCounterReachGoal('SIGN_IN_SUBMIT')
      if (data && data.url) {
        window.location = window.location.origin + data.url
      } else if (window.location.pathname == '/') {
        window.location = window.location.origin + '/posts'
      } else {
        window.location.reload()
      }
    })
    .fail((data) => {
      if (data.responseJSON) {
        this.setState({error: data.responseJSON.error})
      } else {
        Growlyflash.error('Ошибка обработки. Попробуйте перезагрузить страницу.')
      }
    })
  },

  render() {
    return (
      <form className='auth-form' onSubmit={this.handleSubmit}>
        <div className='form-header'>
          <span className='action'>Вход</span>
          {' или '}
          <a className='alternative' onClick={this.props.switchToSignUp}>Регистрация</a>
        </div>
        <div className='description'>Введите адрес электронной почты и пароль</div>
        {this.errorMessage()}
        <FormField>
          <input type='email' ref='email' className='input-field' placeholder='Электронная почта' />
        </FormField>
        <FormField>
          <input type='password' ref='password' className='input-field' placeholder='Пароль' />
        </FormField>
        <FormField>
          <div className='check-box'>
            <input type='checkbox' ref='rememberMe' id='remember_me' />
            <label className='label' htmlFor='remember_me'>Запомнить меня</label>
          </div>
        </FormField>
        <input type='submit' className='submit-button -stretch' value='Войти' />
        <div className='forgot-password'>
          <a className='link' onClick={this.props.switchToForgotPassword}>
            Забыли пароль?
          </a>
        </div>
      </form>
    )
  }
})

export default SignInForm
