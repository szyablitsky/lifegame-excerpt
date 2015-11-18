import React from 'react'
import TextArea from 'react-textarea-autosize'
import debounce from 'debounce'
import BusinesshackStepEndpoint from '../../endpoints/businesshack_step'
import ScribeEditor from '../controls/scribe_editor'

const BusinesshackStep = React.createClass({
  getInitialState() {
    return {
      title: this.props.step.title,
      content: this.props.step.content,
      changed: false,
      saving: false,
      error: false
    }
  },

  handleChange(key, e) {
    if (this.state[key] === e.target.value) return
    const newState = { changed: true }
    newState[key] = e.target.value
    this.setState(newState)
    this.save(this)
  },

  save: debounce((self) => {
    if (self.state.saving) return
    self.setState({ saving: true })
    BusinesshackStepEndpoint.saveStep(self.props.businesshackId, self.props.id, {
      title: self.state.title,
      content: self.state.content
    }).then(() => {
      self.setState({ changed: false, saving: false, error: false })
    }).catch(() => {
      self.setState({ saving: false, error: true })
    })
  }, 500),

  render() {
    const { businesshackId, id } = this.props
    const imagesUploadUrl = `/api/businesshacks/${businesshackId}/steps/${id}/pictures`
    return (
      <div className='businesshack-step highlighted-block'>
        <div className='header'>
          <div className='delete' title='Удалить шаг' onClick={this.props.onDelete}>×</div>
          {this.renderStatus()}
        </div>
        <div className='title-container'>
          <span className='number -edit'>{this.props.step.position}.</span>
          <input className='title' value={this.state.title}
                 onChange={this.handleChange.bind(null, 'title')}
                 placeholder='Заголовок шага (обязательно)' />
        </div>
        <ScribeEditor content={this.state.content} imagesUploadUrl={imagesUploadUrl}
                  onChange={this.handleChange.bind(null, 'content')}
                  placeholder='Описание шага (необязательно)' />
      </div>
    )
  },

  renderStatus() {
    return this.state.error ? <div className='state -error' title='ошибка!' /> :
      this.state.saving ? <div className='state -saving' title='сохранение' /> :
      this.state.changed ? <div className='state -changed' title='изменено' /> :
        <div className='state -saved' title='сохранено' />
  },
})

export default BusinesshackStep
