import { includes } from 'lodash'
import { createSelector, createStructuredSelector } from 'reselect'

const groupIds = state => state.skills.get('groupIds')
const groups = state => state.entities.skillGroups
const activeGroupId = state => state.skills.get('activeGroupId')

const skills = createSelector(
  groups, activeGroupId,
  state => state.user.get('userSkills').toJS(),
  state => state.entities.userSkills.toJS(),
  state => state.entities.skills,
  state => state.user.get('usedSkillIds').toJS(),
  state => state.user.getIn(['skillPoints', 'report']) === 0,
  state => state.skillsReport.get('skillIds').toJS(),

  (groups, activeGroupId, userSkillIds, userSkills, skills,
  usedSkillIds, usedAllSkillPoints, reportSkillIds) => {
    return groups[activeGroupId].skills
      .filter((id) => includes(userSkillIds, id))
      .map((id) => {
        const skill = skills[id]
        skill.count = userSkills[id].count
        skill.unavailable = usedAllSkillPoints ||
                            includes(usedSkillIds, id) ||
                            includes(reportSkillIds, id)
        return skill
      })
  }
)

const userSkillsSelector = createStructuredSelector({
  groupIds, groups, activeGroupId, skills
})

export default userSkillsSelector
