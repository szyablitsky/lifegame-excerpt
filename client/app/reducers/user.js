import { USER_ADD_USED_SKILLS, SKILLS_REPORT_FORM_ADD_SKILL, SKILLS_REPORT_FORM_REMOVE_SKILL,
         USER_SET_USED_ALL_SKILL_POINTS, USER_UPDATE } from '../constants/action_types'
import { Map, List, fromJS } from 'immutable'
import { camelizeKeys } from 'humps'

function user(state = Map(), action) {
  switch (action.type) {
    case USER_ADD_USED_SKILLS:
      return state.update('usedSkillIds', list => list.concat(action.skillIds))
    case SKILLS_REPORT_FORM_ADD_SKILL:
      return state.updateIn(['skillPoints', 'report'], points => points - 1)
    case SKILLS_REPORT_FORM_REMOVE_SKILL:
      return state.updateIn(['skillPoints', 'report'], points => points + 1)
    case USER_SET_USED_ALL_SKILL_POINTS:
      return state.getIn(['skillPoints', 'report']) === 0 ?
        state.set('usedAllSkillPoints', true) : state
    case USER_UPDATE:
      const newUserData = camelizeKeys(action.user)
      return state.withMutations(user => {
        user.merge({
          level: newUserData.level,
          experience: fromJS(newUserData.experience),
          skillPoints: fromJS(newUserData.skillPoints),
          resources: fromJS(newUserData.resources)
        })
        if (newUserData.userSkills) {
          user.set('userSkills', List(newUserData.userSkills))
        }
      })
    default:
      return state
  }
}

export default user
