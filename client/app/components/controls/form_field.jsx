import React from 'react'

class FormField extends React.Component{
  error() {
    const errors = this.props.errors
    return (errors && errors[this.props.field])
  }

  className() {
    const error = this.error() ? ' -error' : ''
    const className = this.props.className || ''
    return 'field-wrapper ' + className + error
  }

  render() {
    return (
      <div className={this.className()}>
        {this.props.children}
        {this.renderMessage()}
      </div>
    )
  }

  renderMessage() {
    const { help } = this.props
    if (this.error()) {
      return this.renderErrorMessage()
    } else if (help) {
      return <div className='help'>{help}</div>
    }
  }

  renderErrorMessage() {
    let value = this.props.errors[this.props.field]
    if (Array.isArray(value)) { value = value.join(', ') }
    return <div className='error'>{value}</div>
  }
}

export default FormField
