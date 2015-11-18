import { SKILLS_SET_ACTIVE_GROUP, SKILL_SELECT, SKILL_DETAILS_FORM_REQUEST,
         SKILL_DETAILS_FORM_SUCCESS, SKILL_DETAILS_FORM_FAILURE } from '../constants/action_types'
import { userUpdate } from './user'
import SkillsEndpoint from '../endpoints/skills'
import { normalize, Schema, arrayOf } from 'normalizr'

export function skillsSetActiveGroup(groupId) {
  return { type: SKILLS_SET_ACTIVE_GROUP, groupId }
}

export function skillSelect(skillId) {
  return { type: SKILL_SELECT, skillId }
}

function skillDetailsFormRequest() {
  return { type: SKILL_DETAILS_FORM_REQUEST }
}

function skillDetailsFormSuccess() {
  return { type: SKILL_DETAILS_FORM_SUCCESS }
}

function skillDetailsFormFailure() {
  return { type: SKILL_DETAILS_FORM_FAILURE }
}

export function skillUnlock(skillId) {
  return (dispatch, getState) => {
    if (getState().skillDetails.get('sending')) return Promise.reject();

    dispatch(skillDetailsFormRequest())
    return SkillsEndpoint.unlockSkill(skillId)
      .then(data => {
        if (data && data.user) {
          const userSkill = new Schema('user_skills')
          const normalizedUserSkills = normalize(data.user, { user_skills: arrayOf(userSkill) })
          const userData = Object.assign({}, data.user, {
            userSkills: normalizedUserSkills.result.user_skills
          })
          dispatch(userUpdate(userData))
          dispatch(skillDetailsFormSuccess())
        } else {
          dispatch(skillDetailsFormFailure())
          Growlyflash.error('Неверный ответ сервера. Попробуйте перезагрузить страницу.')
        }
      })
      .catch(data => {
        dispatch(skillDetailsFormFailure())
        if (data.responseJSON) {
          Growlyflash.error(data.responseJSON.errors.user_skill)
        } else {
          Growlyflash.error('Ошибка. Попробуйте перезагрузить страницу.')
        }
      })
  }
}
