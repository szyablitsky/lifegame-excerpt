import React from 'react'
import TextArea from 'react-textarea-autosize'
import debounce from 'debounce'
import { normalize, Schema, arrayOf } from 'normalizr'
import BusinesshackEndpoint from '../../endpoints/businesshack'
import BusinesshackStepEndpoint from '../../endpoints/businesshack_step'
import ScribeEditor from '../controls/scribe_editor'
import Step from './step'

const BusinesshackForm = React.createClass({
  getInitialState() {
    const { title, subtitle, benefits, description, results } = this.props.businesshack
    const step = new Schema('steps')
    const normalizedSteps = normalize(this.props.businesshack, { steps: arrayOf(step) })
    return {
      title,
      subtitle,
      description,
      benefits,
      results,
      stepIds: normalizedSteps.result.steps,
      steps: normalizedSteps.entities.steps,
      stepTitle: '',
      changed: false,
      saving: false,
      error: false,
      errors: []
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
    BusinesshackEndpoint.saveBusinesshack(self.props.businesshack.id, {
      title: self.state.title,
      subtitle: self.state.subtitle,
      description: self.state.description,
      benefits: self.state.benefits,
      results: self.state.results
    }).then(() => {
      self.setState({ changed: false, saving: false, error: false })
    }).catch(() => {
      self.setState({ saving: false, error: true })
    })
  }, 500),

  addStep(e) {
    e.preventDefault()

    BusinesshackStepEndpoint.createStep(this.props.businesshack.id, this.state.stepTitle)
    .then((data) => {
      if (data && data['businesshack/step']) {
        const step = data['businesshack/step']
        const stepObject = {}
        stepObject[step.id] = step
        this.setState({
          stepIds: [...this.state.stepIds, step.id],
          steps: Object.assign({}, this.state.steps, stepObject),
          stepTitle: ''
        })
      }
    })
  },

  deleteStep(id) {
    if (!window.confirm('Удалить шаг?')) retrun

    BusinesshackStepEndpoint.deleteStep(this.props.businesshack.id, id)
    .then(() => {
      let i = this.state.stepIds.indexOf(id)
      // XXX: what a shame!!!
      this.state.stepIds.splice(i, 1)
      delete this.state.steps[id]
      for (; i < this.state.stepIds.length; i++) {
        const stepId = this.state.stepIds[i]
        this.state.steps[stepId].position--
      }
      this.setState({
        stepIds: this.state.stepIds,
        steps: this.state.steps
      })
    })
  },

  render() {
    const imagesUploadUrl = `/api/businesshacks/${this.props.businesshack.id}/pictures`
    return (
      <div className='businesshack'>
        {this.renderStatus()}
        <input className='title' value={this.state.title}
               onChange={this.handleChange.bind(null, 'title')}
               placeholder='Заголовок (обязательно)' />
        <TextArea className='subtitle' value={this.state.subtitle}
                  onChange={this.handleChange.bind(null, 'subtitle')}
                  placeholder='Краткое описание (обязательно)' />
        <ScribeEditor content={this.state.description} imagesUploadUrl={imagesUploadUrl}
                  onChange={this.handleChange.bind(null, 'description')}
                  placeholder='Описание (необязательно)' />
        <div className='additional-info'><div className='title'>Что даёт</div></div>
        <ScribeEditor content={this.state.benefits} imagesUploadUrl={imagesUploadUrl}
                  onChange={this.handleChange.bind(null, 'benefits')}
                  placeholder='Что дает (необязательно)' />
        <div className='additional-info'><div className='title'>Результаты</div></div>
        <ScribeEditor content={this.state.results} imagesUploadUrl={imagesUploadUrl}
                  onChange={this.handleChange.bind(null, 'results')}
                  placeholder='Что дает (необязательно)' />
        {this.renderSteps()}
      </div>
    )
  },

  renderStatus() {
    return this.state.error ? <div className='state -error' title='ошибка!' /> :
      this.state.saving ? <div className='state -saving' title='сохранение' /> :
      this.state.changed ? <div className='state -changed' title='изменено' /> :
        <div className='state -saved' title='сохранено' />
  },

  renderSteps() {
    return (
      <div className='businesshack-steps-list'>
        {this.state.stepIds.map(id => {
          return (
            <Step key={id} businesshackId={this.props.businesshack.id} id={id}
                  step={this.state.steps[id]} onDelete={this.deleteStep.bind(null, id)} />
          )
        })}
        <form className='new-step' onSubmit={this.addStep}>
          <strong>Новый шаг</strong>
          <input value={this.state.stepTitle} onChange={this.handleChange.bind(null, 'stepTitle')}
                 placeholder='Заголовок шага (обязательно)' />
          <button type='submit'>Добавить</button>
        </form>
      </div>
    )
  }
})

export default BusinesshackForm
