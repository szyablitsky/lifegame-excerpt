import { USER_SKILLS_INCREMENT } from '../constants/action_types'

function entities(state = {}, action) {
  switch (action.type) {
    case USER_SKILLS_INCREMENT:
      return Object.assign(state, {
        userSkills: state.userSkills.withMutations(skills => {
          action.skillIds.forEach(id => {
            const skillId = id.toString()
            const skill = skills.get(skillId)
            skills.set(skillId, skill.update('count', count => count + 1))
          })
        })
      })
    default:
      return state
  }
}

export default entities
