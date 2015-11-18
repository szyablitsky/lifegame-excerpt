import { SKILL_DETAILS_FORM_REQUEST, SKILL_DETAILS_FORM_SUCCESS,
         SKILL_DETAILS_FORM_FAILURE } from '../constants/action_types'
import { Map, List } from 'immutable'

function skillsReport(state = Map(), action) {
  switch (action.type) {
    case SKILL_DETAILS_FORM_REQUEST:
      return state.set('sending', true)
    case SKILL_DETAILS_FORM_SUCCESS:
      return state.set('sending', false)
    case SKILL_DETAILS_FORM_FAILURE:
      return state.set('sending', false)
    default:
      return state
  }
}

export default skillsReport
