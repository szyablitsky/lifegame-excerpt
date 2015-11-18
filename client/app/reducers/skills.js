import { SKILLS_SET_ACTIVE_GROUP, SKILL_SELECT } from '../constants/action_types'

function skills(state = {}, action) {
  switch (action.type) {
    case SKILLS_SET_ACTIVE_GROUP:
      return state.set('activeGroupId', action.groupId)
    case SKILL_SELECT:
      return state.set('selectedId', action.skillId)
    default:
      return state
  }
}

export default skills
