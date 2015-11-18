import React from 'react'
import SkillInfo from './info'

const SkillUnlockForm = React.createClass({
  getInitialState() {
    return { promptOpen: false }
  },

  togglePrompt() {
    if (this.props.sending) return
    this.setState({ promptOpen: !this.state.promptOpen })
  },

  unlock() {
    const { skill, skillUnlock } = this.props
    this.togglePrompt()
    skillUnlock(skill.id)
  },

  render() {
    const { id } = this.props
    const content = id ? this.renderForm() : this.renderPrompt()

    return <div className='skill-unlock-container'>{content}</div>
  },

  renderPrompt() {
    return (<div>Выберите навык</div>)
  },

  renderForm() {
    const { skill, images } = this.props

    return (
      <div className='skill-unlock-form'>
        <SkillInfo skill={skill} images={images} />
        <div className='skill-price'>
          <span className='text'>Стоимость</span>
          <span className='value'>
            <img className='icon' src={images['skill/unlock.png']} />
            <span className='number'>{skill.price}</span>
          </span>
        </div>
        {this.renderUnlockSection()}
      </div>
    )
  },

  renderUnlockSection() {
    const { unlocked, availability } = this.props
    return unlocked ? null :
      availability.available ? this.renderPromptSection() :
        this.renderUnavailable(availability.reason)
  },

  renderUnavailable(message) {
    return (
      <div className='status'>
        <div>Навык не доступен</div>
        <div className='message'>{message}</div>
      </div>
    )
  },

  renderPromptSection() {
    const { sending } = this.props
    const promptClass = `unlock-prompt${this.state.promptOpen ? ' -open' : ''}`
    const buttonClass = `submit-button -center${sending ? ' -disbled' : ''}`
    const buttonText = sending ? 'Обработка...' : 'Открыть'

    return (
      <div className='unlock-section'>
        <button className={buttonClass} onClick={this.togglePrompt}>
          {buttonText}
        </button>
        <div className={promptClass}>
          <div className='message'>Распределить очки опыта?</div>
          <div className='buttons'>
            <button className='submit-button' onClick={this.unlock}>Да</button>
            <button className='cancel-button' onClick={this.togglePrompt}>Нет</button>
          </div>
        </div>
      </div>
    )
  }
})

import skillUnlockSelector from '../../selectors/skill_unlock'
import { skillUnlock } from '../../actions/skills'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

function actions(dispatch) {
  return bindActionCreators({ skillUnlock }, dispatch)
}

export default connect(skillUnlockSelector, actions)(SkillUnlockForm)
