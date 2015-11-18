import { USER_ADD_USED_SKILLS, USER_SKILLS_INCREMENT,
         USER_SET_USED_ALL_SKILL_POINTS, USER_UPDATE } from '../constants/action_types'
import UserEndpoint from '../endpoints/user'

export function userAddUsedSkills(skillIds) {
  return { type: USER_ADD_USED_SKILLS, skillIds }
}

export function userSkillsIncrement(skillIds) {
  return { type: USER_SKILLS_INCREMENT, skillIds }
}

export function userSetUsedAllSkillPoints() {
  return { type: USER_SET_USED_ALL_SKILL_POINTS }
}

export function userUpdate(user) {
  return { type: USER_UPDATE, user }
}
