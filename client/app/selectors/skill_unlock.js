import { includes } from 'lodash'
import { createSelector, createStructuredSelector } from 'reselect'

const id = state => state.skills.get('selectedId')
const skills = state => state.entities.skills
const skill = createSelector(id, skills, (id, skills) => id ? skills[id] : {})
const userSkillIds = state => state.user.get('userSkills').toJS()
const points = state => state.user.getIn(['skillPoints', 'unlock'])
const unlocked = createSelector(id, userSkillIds, (id, userSkillIds) => includes(userSkillIds, id))
const sending = state => state.skillDetails.get('sending')

const availability = createSelector(
  skill, skills, userSkillIds, points,
  (skill, skills, userSkillIds, points) => {
    if (skill.price > points) {
      return { available: false, reason: 'Недостаточно очков разблокирования навыков.' }
    }

    let unlockedSkillName = null
    while (skill.parentId) {
      skill = skills[skill.parentId]
      if (!includes(userSkillIds, skill.id)) unlockedSkillName = skill.name
    }

    if (unlockedSkillName) {
      return { available: false, reason: `Необходимо разблокировать навык '${unlockedSkillName}'.` }
    } else {
      return { available: true }
    }
  }
)

const skillUnockSelector = createStructuredSelector({
  id, skill, unlocked, availability, sending
})

export default skillUnockSelector
