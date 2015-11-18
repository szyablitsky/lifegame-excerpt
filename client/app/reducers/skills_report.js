import { SKILLS_REPORT_FORM_UNFOLD, SKILLS_REPORT_FORM_ADD_SKILL, SKILLS_REPORT_FORM_REMOVE_SKILL,
         SKILLS_REPORT_FORM_CLEAR_ERROR, SKILLS_REPORT_FORM_REQUEST, SKILLS_REPORT_FORM_SUCCESS,
         SKILLS_REPORT_FORM_FAILURE } from '../constants/action_types'
import { Map, List } from 'immutable'

function skillsReport(state = Map(), action) {
  switch (action.type) {
    case SKILLS_REPORT_FORM_UNFOLD:
      return state.set('folded', false)
    case SKILLS_REPORT_FORM_ADD_SKILL:
      const addedSkillResources = state.get('resources').withMutations(resources => {
        resources.merge({
          time: resources.get('time') + action.resources.time,
          energy: resources.get('energy') + action.resources.energy,
          money: resources.get('money') + action.resources.money
        })
      })
      return state.withMutations(form => { form
        .merge({ folded: false, resources: addedSkillResources })
        .setIn(['skillsResources', action.skillId], action.resources)
        .update('skillIds', list => list.push(action.skillId))
        .deleteIn(['errors', 'skills_report_skills'])
      })
    case SKILLS_REPORT_FORM_REMOVE_SKILL:
      const skillResources = state.getIn(['skillsResources', action.skillId])
      const removedSkillResources = state.get('resources').withMutations(resources => {
        resources.merge({
          time: resources.get('time') - skillResources.time,
          energy: resources.get('energy') - skillResources.energy,
          money: resources.get('money') - skillResources.money
        })
      })
      return state.withMutations(form => { form
        .set('resources', removedSkillResources)
        .update('skillIds', list => list.filter((id) => id !== action.skillId))
      })
    case SKILLS_REPORT_FORM_CLEAR_ERROR:
      return state.deleteIn(['errors', action.error])
    case SKILLS_REPORT_FORM_REQUEST:
      return state.set('sending', true)
    case SKILLS_REPORT_FORM_SUCCESS:
      return state.merge({sending: false, errors: {}, skillIds: []})
    case SKILLS_REPORT_FORM_FAILURE:
      return state.merge({sending: false, errors: action.errors})
    default:
      return state
  }
}

export default skillsReport
