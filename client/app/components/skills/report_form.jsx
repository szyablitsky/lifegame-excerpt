import React from 'react'
import TextArea from 'react-textarea-autosize'
import FormField from '../controls/form_field'
import SkillField from './report_skill'
import imagePath from '../../helpers/image_path'

const SkillsReportForm = React.createClass({
  getInitialState() {
    return { content: '', skills: {} }
  },

  skillChange(id, e) {
    const skillId = `skill${id}`
    this.props.skillsReportFormClearError(skillId)
    this.state.skills[skillId] = e.target.value // TODO: fix this
    this.setState({skills: this.state.skills})
  },

  skillRemove(id) {
    this.props.skillsReportFormRemoveSkill(id)
  },

  contentChange(e) {
    this.props.skillsReportFormClearError('content')
    this.setState({content: e.target.value})
  },

  skills() {
    return this.props.skillIds.map((id) => {
      return { skill_id: id, content: this.state.skills[`skill${id}`] }
    })
  },

  cleanupAndAddReport(html) {
    if (Object.keys(this.props.errors).length !== 0) return

    this.setState({content: '', })
    $(html).hide().prependTo('.posts-list').slideDown()
    $(document).trigger('ajax:success') // Growlyflash trigger?
  },

  submit(e) {
    e.preventDefault()
    if (this.props.sending) return
    this.props.skillsReportFormSubmit(this.skills(), this.state.content)
      .then(html => this.cleanupAndAddReport(html))
  },

  render() {
    const { noAvailableSkills, usedAllSkillPoints, folded } = this.props
    const content = noAvailableSkills ? this.renderNoAvailableSkillsMessage() :
      usedAllSkillPoints ?  this.renderUsedAllPointsMessage() :
      folded ? this.renderUnfoldMessage() : this.renderForm()

    return (
      <div className='skills-report-form-container'>{content}</div>
    )
  },

  renderNoAvailableSkillsMessage() {
    return (
      <div className='form-message'>
        Откройте <a href='/skills'>навыки</a>, чтобы поделиться своими достижениями.
      </div>
    )
  },

  renderUsedAllPointsMessage() {
    return (
      <div className='form-message'>
        Сегодня вы использовали все доступные очки навыков для отчета.
        Завтра вам будут начислены новые очки навыков.
      </div>
    )
  },

  renderUnfoldMessage() {
    return (
      <div className='form-message'>
        <a className='link' onClick={this.props.skillsReportFormUnfold}>
          Поделиться своими достижениями
        </a>
      </div>
    )
  },

  renderForm() {
    const { avatar, level, points, errors, sending } = this.props
    const submitClass = `submit-button -right${sending ? ' -disabled' : ''}`
    const submitValue = sending ? 'Отправка' : 'Отправить'

    return (
      <div className='user-related-block'>
        <div className='avatar-container'>
          <img className='avatar' src={avatar} />
          <div className='level'>lv {level}</div>
        </div>
        <div className='main-container'>
          <form className='skills-report-form' onSubmit={this.submit}>
            <div className='help'>Сегодня я улучшил(а) навыки:</div>
            {this.renderSkills()}
            <FormField errors={errors} field='content'>
              <TextArea className='input-field -text-area' placeholder='Краткий вывод по всем добавленным навыкам'
                value={this.state.content} onChange={this.contentChange} maxRows={20} />
              <div className='character-count'>{this.state.content.length}</div>
            </FormField>
            <div className='skills-report-legend'>
              <div className='skills-report-points'>
                Не распределено очков
                <span className='value'>{points}</span>
                <img src={imagePath('skill/report.png')} height={18} width={'auto'} />
              </div>
              {this.renderResources()}
            </div>
            <input type='submit' className={submitClass} value={submitValue} />
          </form>
        </div>
      </div>
    )
  },

  renderSkills() {
    const { skillIds, skills, errors } = this.props
    if (skillIds.length === 0) {
      return this.renderSkillsPrompt()
    } else {
      return skillIds.map(id => {
        return (
          <FormField key={id} errors={errors} field={`skill${id}`}>
            <SkillField skill={skills[id]} onChange={this.skillChange.bind(null, id)}
              onRemoveSkill={this.skillRemove.bind(null, id)} />
          </FormField>
        )
      })
    }
  },

  renderSkillsPrompt() {
    const error = typeof this.props.errors.skills_report_skills !== 'undefined'
    const style = error ? { color: 'red' } : null
    return (
      <FormField>
        <div style={style}>
          <span>Выберите навык (в списке справа). </span>
          <span style={{opacity: 0.6}}>Можно добавлять сразу несколько навыков.</span>
        </div>
      </FormField>
    )
  },

  renderResources() {
    const RESOURCES = { time: 'Время', energy: 'Энергия', money: 'Деньги' }
    const { resources } = this.props
    return (
      <div className='skills-report-resources'>
        {Object.keys(RESOURCES).map(key => {
          const value = resources[key]
          return (
            <span className='resource' key={key}>
              <img className='icon' src={imagePath(`resource/${key}.png`)} />
              {RESOURCES[key]}
              <span className='value'>{ value > 0 ? `+${value}` : value }</span>
            </span>
          )
        })}
      </div>
    )
  }
})

import skillsReportSelector from '../../selectors/skills_report'
import { skillsReportFormUnfold, skillsReportFormRemoveSkill, skillsReportFormSubmit,
         skillsReportFormClearError } from '../../actions/skills_report'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

function actions(dispatch) {
  return bindActionCreators({
    skillsReportFormUnfold, skillsReportFormRemoveSkill,
    skillsReportFormClearError, skillsReportFormSubmit
  }, dispatch)
}

export default connect(skillsReportSelector, actions)(SkillsReportForm)
