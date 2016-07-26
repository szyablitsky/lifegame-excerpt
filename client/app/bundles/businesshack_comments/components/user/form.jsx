import React, { PropTypes } from 'react'
import TextArea from 'react-autosize-textarea'
import bindAll from 'lodash/bindAll'

import Loader from 'shared/components/loader'

import css from './form.sass'

export default class Form extends React.Component {
  constructor(props) {
    super(props)
    bindAll(this, ['handleChange', 'handleKeyDown'])
  }

  handleChange(e) {
    this.props.change(e.target.value)
  }

  handleKeyDown(e) {
    const { content, submit } = this.props
    if (e.keyCode === 13 && e.ctrlKey && content.trim().length > 0) submit()
  }

  componentDidMount() {
    this.props.saveRef(this._textarea.getTextareaDOMNode())
  }

  render() {
    const { avatar, inProgress } = this.props
    return (
      <div className={css.container}>
        <img className={css.avatar} src={avatar} />
        {inProgress ? this.renderLoader() : this.renderForm()}
      </div>
    )
  }

  renderForm() {
    const { addressee, content } = this.props
    return (
      <div className={css.form}>
        {addressee ? this.renderAddressee() : null}
        <TextArea className={css.input} placeholder='Напишите комментарий...'
                  value={content} onChange={this.handleChange}
                  onKeyDown={this.handleKeyDown}
                  ref={(c) => { this._textarea = c }} />
        {content === '' ? null : // eslint-disable-line operator-linebreak
          <div className={css.help}>
            Чтобы отправить комментарий, нажмите <span className={css.key}>Ctrl+Enter</span>
          </div>
        }
      </div>
    )
  }

  renderAddressee() {
    const { addressee } = this.props
    return (
      <div className={css.addressee}>
        ответ: {addressee}
      </div>
    )
  }

  renderLoader() {
    return <div className={css.loader}><Loader color='primary' /></div>
  }
}

Form.propTypes = {
  avatar: PropTypes.string.isRequired,
  addressee: PropTypes.string,
  content: PropTypes.string.isRequired,
  inProgress: PropTypes.bool.isRequired,
  change: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  saveRef: PropTypes.func.isRequired,
}
