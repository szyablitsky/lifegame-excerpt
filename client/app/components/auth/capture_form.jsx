import React, { PropTypes } from 'react'
import FormField from '../controls/form_field'
import MaskedInput from 'react-maskedinput'

class CaptureForm extends React.Component {
  constructor(props) {
    super(props)
    const { firstName, lastName, email, phone } = this.props.user
    this.state = { firstName, lastName, email, phone, errors: {} }
  }

  handleChange(key, e) {
    this.setState({ [key]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        order: {
          type: { orderable: 'Subscription', subscription: 'businesshacks' },
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          email: this.state.email,
          phone: this.state.phone,
          demo: e.demo === true
        }
      }),
      url: '/api/orders'
    })
    .done((data) => {
      window.yaCounterReachGoal('CAPTURE_FORM_SUBMIT')
      window.location = data.url
    })
    .fail((data) => {
      if (data.responseJSON) {
        this.setState({errors: data.responseJSON.errors})
      } else {
        Growlyflash.error('Ошибка обработки. Попробуйте перезагрузить страницу.')
      }
    })
  }

  render() {
    return (
      <div className='auth-form-container'>
        <form className='auth-form -capture-form' onSubmit={this.handleSubmit.bind(this)}>
          <FormField className='-name -padded' errors={this.state.errors} field='first_name'>
            <input type='text' ref='firstName' className='input-field' placeholder='Имя'
                   value={this.state.firstName} onChange={this.handleChange.bind(this, 'firstName')} />
          </FormField>
          <FormField className='-name' errors={this.state.errors} field='last_name'>
            <input type='text' ref='lastName' className='input-field' placeholder='Фамилия'
                   value={this.state.lastName} onChange={this.handleChange.bind(this, 'lastName')} />
          </FormField>
          <FormField errors={this.state.errors} field='email'>
            <input type='email' ref='email' className='input-field' placeholder='Электронная почта'
                   value={this.state.email} onChange={this.handleChange.bind(this, 'email')} />
          </FormField>
          <FormField errors={this.state.errors} field='phone' help='вводите только цифры' >
            <MaskedInput mask='+1 111 111-11-11 1111' ref='phone' className='input-field' placeholder='Телефон'
                         value={this.state.phone} onChange={this.handleChange.bind(this, 'phone')} />
          </FormField>
          <input type='submit' className='submit-button -stretch' value={this.props.cta} />
          <input type='button' className='cancel-button -stretch' value='Демо-доступ'
                 onClick={this.handleSubmit.bind(this, { demo: true, preventDefault: () => {} })} />
        </form>
      </div>
    )
  }
}

CaptureForm.propTypes = {
  user: PropTypes.object.isRequired,
  cta: PropTypes.string.isRequired
}

const Factory = (props) => <CaptureForm {...props} />
export default Factory
