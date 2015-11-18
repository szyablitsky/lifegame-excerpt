import React from 'react'

class BusinesshackStateForm extends React.Component {
  constructor(props) {
    super(props)
    const { draft, free } = this.props.businesshack
    this.state = { sending: false, draft, free }
  }

  save(key) {
    if (this.state.sending) return
    this.setState({ sending: true })
    $.ajax({
      type: 'patch',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({ businesshack: { [key]: !this.state[key] } }),
      url: `/api/businesshacks/${this.props.businesshack.id}/state`
    })
    .done(() => {
      this.setState({ [key]: !this.state[key], sending: false })
    })
    .fail(() => {
      this.setState({ sending: false })
      Growlyflash.error('Ошибка обработки. Попробуйте перезагрузить страницу.')
    })
  }

  render() {
    return (
      <div className={`businesshack-state-form${this.state.sending ? ' -sending' : ''}`}>
        <div style={{ marginBottom: 10 }}>
          <span className='value'>
            { this.state.draft ? 'Черновик' : 'Опубликован' }
          </span>
          { ' | ' }
          <a className='action' onClick={this.save.bind(this, 'draft')}>
            { this.state.draft ? 'Опубликован' : 'Черновик' }
          </a>
        </div>
        <div>
          <span className='value'>
            { this.state.free ? 'Бесплатный' : 'Платный' }
          </span>
          { ' | ' }
          <a className='action' onClick={this.save.bind(this, 'free')}>
            { this.state.free ? 'Платный' : 'Бесплатный' }
          </a>
        </div>
      </div>
    )
  }
}

const Factory = (props) => <BusinesshackStateForm {...props} />

export default Factory
