import { includes } from 'lodash'
import { createSelector, createStructuredSelector } from 'reselect'

const groupIds = state => state.skills.get('groupIds')
const groups = state => state.entities.skillGroups
const activeGroupId = state => state.skills.get('activeGroupId')
const selectedSkillId = state => state.skills.get('selectedId')

function children(parent, userSkillIds, skills) {
  return skills
    .filter(skill => {
      return skill.ancestry === `${parent.ancestry ? `${parent.ancestry}/` : ''}${parent.id}`
    })
    .map(skill => {
      return {
        id: skill.id,
        name: skill.name,
        thumb: skill.thumb,
        unlocked: includes(userSkillIds, skill.id),
        root: false,
        children: children(skill, userSkillIds, skills)
      }
    })
}

const skills = createSelector(
  groups, activeGroupId,
  state => state.user.get('userSkills').toJS(),
  state => state.entities.skills,
  (groups, activeGroupId, userSkillIds, skills) => {
    const skillsArray = Object.keys(skills).map(key => skills[key])
    return groups[activeGroupId].skills
      .filter(id => skills[id].ancestry === null)
      .map(id => {
        const skill = skills[id]
        return {
          id,
          name: skill.name,
          thumb: skill.thumb,
          unlocked: includes(userSkillIds, id),
          root: true,
          branchName: skill.branchName,
          children: children(skill, userSkillIds, skillsArray)
        }
      })
  }
)

const skillsMapSelector = createStructuredSelector({
  groupIds, groups, activeGroupId, skills, selectedSkillId
})

export default skillsMapSelector
