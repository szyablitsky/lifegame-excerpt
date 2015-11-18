import React from 'react'
import TextArea from 'react-textarea-autosize'

class CommentsForm extends React.Component {
  constructor(props) {
    super(props)
    const open = this.props.addressee ? true : false
    this.state = { open, comment: '' }
  }

  componentWillReceiveProps(newProps) {
    const oldAddressee = this.props.addressee || {}
    if (newProps.addressee && oldAddressee !== newProps.addressee) {
      let newState = { open: true }
      const emptyComment = this.state.comment === ''
      const generatedComment = oldAddressee.name && this.state.comment === `${oldAddressee.name}, `
      if (emptyComment || generatedComment) {
        newState.comment = `${newProps.addressee.name}, `
      }
      this.setState(newState)
      setTimeout(() => { this.refs.input.focus() })
    }
  }

  handleChange(e) {
    this.setState({ comment: e.target.value })
  }

  open() {
    if (this.state.open) return
    this.setState({ open: true })
  }

  send(e) {
    e.preventDefault()
    if (!this.validate()) return

    this.setState({ sending: true })
    $.ajax({
      type: 'post',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        comment: {
          addressee: this.props.addressee ? this.props.addressee.id : null,
          content: this.state.comment
        }
      }),
      url: this.props.url
    })
    .done((data) => {
      this.props.onAddComment(data.comment)
      this.setState({ sending: false, open: false, comment: '' })
      // this.refs.input.blur()
    })
    .fail(() => {
      this.setState({ sending: false })
      Growlyflash.error('Ошибка обработки. Попробуйте перезагрузить страницу.')
    })
  }

  validate() {
    return this.state.comment !== ''
  }

  render() {
    return (
      <form className='comment-form' onSubmit={this.send.bind(this)}
            onClick={this.open.bind(this)} >
        <TextArea ref='input' value={this.state.comment} placeholder='Комментировать'
                  onChange={this.handleChange.bind(this)}/>
        {this.renderButton()}
        <div className={`overlay${this.state.sending ? ' -show' : ''}`} />
      </form>
    )
  }

  renderButton() {
    if (!this.state.open) return null
    return (
      <div>
        <input type='submit' className='submit-button' value='Отправить' />
        {this.renderAddressee()}
      </div>
    )
  }

  renderAddressee() {
    if (!this.props.addressee) return null

    return (
      <span>
        <i className='fa fa-angle-right' />
        {this.props.addressee.fullName}
      </span>
    )
  }
}

export default CommentsForm
