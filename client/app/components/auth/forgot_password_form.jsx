import React from 'react'
import DisplayError from '../../mixins/display_error'
import Confirmation from '../../mixins/confirmation'
import ForgotPasswordConfirmation from './forgot_password_confirmation'
import FormField from '../controls/form_field'

const ForgotPasswordForm = React.createClass({
  displayName: 'ForgotPasswordForm',
  mixins: [DisplayError, Confirmation(ForgotPasswordConfirmation)],

  handleSubmit(e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        email: this.refs.email.value
      }),
      url: '/users/password_resets'
    })
    .done(() => {
      $('.auth-form > .error').hide()
      if (this.props.onClose) this.props.onClose()
      this.confirm()
    })
    .fail((data) => {
      if (data.responseJSON) {
        this.setState({error: data.responseJSON.error})
      } else {
        window.Growlyflash.error('Ошибка обработки. Попробуйте перезагрузить страницу.')
      }
    })
  },

  render() {
    return(
      <form className='auth-form' onSubmit={this.handleSubmit}>
        <div className='form-header'>
          <span className='action'>Изменить пароль</span>
          {' или '}
          <a className='alternative' onClick={this.props.switchToSignIn}>Вход</a>
        </div>
        <div className='description'>Введите адрес электронной почты</div>
        {this.errorMessage()}
        <FormField>
          <input type='email' ref='email' className='input-field' placeholder='Электронная почта' />
        </FormField>
        <button className='submit-button -stretch'>Получить инструкции</button>
      </form>
    )
  }
})

export default ForgotPasswordForm
