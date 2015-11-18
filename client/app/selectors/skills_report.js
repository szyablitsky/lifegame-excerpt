import { createSelector, createStructuredSelector } from 'reselect'

const folded = state => state.skillsReport.get('folded')
const avatar = state => state.user.get('avatar')
const level = state => state.user.get('level')
const points = state => state.user.getIn(['skillPoints', 'report'])
const skillIds = state => state.skillsReport.get('skillIds').toJS()
const skills = state => state.entities.skills
const resources = state => state.skillsReport.get('resources').toJS()
const errors = state => state.skillsReport.get('errors').toJS()
const sending = state => state.skillsReport.get('sending')
const usedAllSkillPoints = state => state.user.get('usedAllSkillPoints')
const noAvailableSkills = state => state.user.get('userSkills').size === 0

const skillsReportSelector = createStructuredSelector({
  folded, avatar, level, points, skillIds, skills, resources, errors, sending,
  usedAllSkillPoints, noAvailableSkills
})

export default skillsReportSelector
