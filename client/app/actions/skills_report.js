import { SKILLS_REPORT_FORM_UNFOLD, SKILLS_REPORT_FORM_ADD_SKILL, SKILLS_REPORT_FORM_REMOVE_SKILL,
         SKILLS_REPORT_FORM_CLEAR_ERROR, SKILLS_REPORT_FORM_REQUEST, SKILLS_REPORT_FORM_SUCCESS,
         SKILLS_REPORT_FORM_FAILURE } from '../constants/action_types'
import { userAddUsedSkills, userSkillsIncrement, userSetUsedAllSkillPoints, userUpdate } from './user'
import SkillsReportEndpoint from '../endpoints/skills_report'

export function skillsReportFormUnfold() {
  return { type: SKILLS_REPORT_FORM_UNFOLD }
}

export function skillsReportFormAddSkill(skillId, resources) {
  return { type: SKILLS_REPORT_FORM_ADD_SKILL, skillId, resources }
}

export function skillsReportFormRemoveSkill(skillId) {
  return { type: SKILLS_REPORT_FORM_REMOVE_SKILL, skillId }
}

export function skillsReportFormClearError(error) {
  return { type: SKILLS_REPORT_FORM_CLEAR_ERROR, error }
}

function skillsReportFormRequest() {
  return { type: SKILLS_REPORT_FORM_REQUEST }
}

function skillsReportFormSuccess(data) {
  return { type: SKILLS_REPORT_FORM_SUCCESS, data }
}

function skillsReportFormFailure(errors) {
  return { type: SKILLS_REPORT_FORM_FAILURE, errors }
}

function skillsReportFormValidate(skills, content, dispatch) {
  let errors = {}
  const ERROR_MESSAGE = 'не может быть пустым'
  if (content.length === 0) errors.content = ERROR_MESSAGE
  if (skills.length === 0) errors.skills_report_skills = ERROR_MESSAGE
  skills.forEach(skill => {
    if (typeof skill.content === 'undefined' ||  skill.content.length === 0) {
      errors[`skill${skill.skill_id}`] = ERROR_MESSAGE
    }
  })
  if (Object.keys(errors).length > 0) {
    dispatch(skillsReportFormFailure(errors))
    return false
  } else {
    return true
  }
}

export function skillsReportFormSubmit(skills, content) {
  return (dispatch, getState) => {
    if (getState().skillsReport.get('sending')) return Promise.reject();
    if (!skillsReportFormValidate(skills, content, dispatch)) return Promise.reject();

    dispatch(skillsReportFormRequest())
    return SkillsReportEndpoint.submitSkillsReport(skills, content)
      .then(data => {
        if (data && data.skills_report) {
          const skillIds = getState().skillsReport.get('skillIds')
          dispatch(userAddUsedSkills(skillIds))
          dispatch(userSkillsIncrement(skillIds))
          dispatch(userSetUsedAllSkillPoints())
          dispatch(userUpdate(data.skills_report.author))
          dispatch(skillsReportFormSuccess(data.skills_report))
          return Promise.resolve(data.skills_report.html)
        } else {
          dispatch(skillsReportFormFailure({error: 'bad response'}))
          Growlyflash.error('Неверный ответ сервера. Попробуйте перезагрузить страницу.')
        }
      })
      .catch(data => {
        if (data.responseJSON) {
          dispatch(skillsReportFormFailure(data.responseJSON.errors))
        } else {
          dispatch(skillsReportFormFailure({error: 'server errror'}))
          Growlyflash.error('Ошибка. Попробуйте перезагрузить страницу.')
        }
      })
  }
}
