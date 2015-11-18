import { Map, List, fromJS } from 'immutable'
import { normalize, Schema, arrayOf } from 'normalizr'
import { camelizeKeys } from 'humps'

function initialState(props) {
  props = camelizeKeys(props)

  // skills
  const skill = new Schema('skills')
  const group = new Schema('skillGroups')
  group.define({ skills: arrayOf(skill) })
  const normalizedSkillGroups = props.skillGroups ?
    normalize(props, {skillGroups: arrayOf(group)}) :
    { result: {}, entities: {} }

  const skillGroupIds = normalizedSkillGroups.result.skillGroups || []
  const skillGroups = normalizedSkillGroups.entities.skillGroups
  const skills = normalizedSkillGroups.entities.skills
  const selectedId = skillGroups ? skillGroups[skillGroupIds[0]].skills[0] : null

  // user
  const userSkill = new Schema('userSkills')
  const normalizedUserSkills = props.user ?
    normalize(props.user, {userSkills: arrayOf(userSkill)}) :
    { result: {}, entities: {} }

  const userSkillIds = normalizedUserSkills.result.userSkills || []
  const userSkills = normalizedUserSkills.entities.userSkills || {}

  const userData = props.user ?
    fromJS(props.user).withMutations((user) => {
      user.set('userSkills', List(userSkillIds))
    }) : {}

  // state
  return {
    user: userData,
    skillsReport: Map({
      folded: true,
      sending: false,
      errors: Map(),
      skillIds: List(),
      skillsResources: Map(),
      resources: Map({
        time: 0,
        energy: 0,
        money: 0
      })
    }),
    skillDetails: Map({
      sending: false
    }),
    skills: Map({
      groupIds: skillGroupIds,
      activeGroupId: skillGroupIds[0],
      selectedId
    }),
    entities: {
      skillGroups,
      skills,
      userSkills: fromJS(userSkills)
    }
  }
}

export default initialState
