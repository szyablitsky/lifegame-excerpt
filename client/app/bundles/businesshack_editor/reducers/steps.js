import { fromJS } from 'immutable'

import * as editorStatus from '../constants/status'
import * as actionTypes from '../constants/hack'

export const initialState = fromJS({
  stepIds: [],
  steps: {},
  requestInProgress: false,
  status: editorStatus.SAVED,
})

/* eslint-disable no-shadow */

export function stepsReducer(state = initialState, action = null) {
  const { type, id, key, value, position, order } = action
  const path = ['steps', `${id}`]

  switch (type) {

    case actionTypes.CHANGE_STEP:
      return state.setIn(path, state.getIn(path).mergeDeep({
        status: editorStatus.CHANGED,
        data: { [key]: value },
      }))

    // create ------------------------------------------------------------------

    case actionTypes.CREATE_STEP_START:
      return state.merge({
        status: editorStatus.SAVING,
        requestInProgress: true,
      })

    case actionTypes.CREATE_STEP_SUCCESS:
      return state
        .merge({
          status: editorStatus.SAVED,
          requestInProgress: false,
        })
        .update('stepIds', (ids) => ids.insert(position, id))
        .update('steps', (steps) => steps.merge({
          [id]: {
            data: { title: '', content: '' },
            status: editorStatus.SAVED,
          },
        }))

    case actionTypes.CREATE_STEP_FAILURE:
      return state.merge({
        status: editorStatus.ERROR,
        requestInProgress: false,
      })

    // update / delete ---------------------------------------------------------

    case actionTypes.SAVE_STEP_START:
    case actionTypes.DELETE_STEP_START:
      return state.setIn(path, state.getIn(path).merge({
        status: editorStatus.SAVING,
        requestInProgress: true,
      }))

    case actionTypes.SAVE_STEP_SUCCESS:
      return state.setIn(path, state.getIn(path).merge({
        status: editorStatus.SAVED,
        requestInProgress: false,
      }))

    case actionTypes.DELETE_STEP_SUCCESS:
      return state
        .update('stepIds', (ids) =>
          ids.delete(ids.findKey((value) => value === id))
        )
        .update('steps', (steps) => steps.delete(`${id}`))

    case actionTypes.SAVE_STEP_FAILURE:
    case actionTypes.DELETE_STEP_FAILURE:
      return state.setIn(path, state.getIn(path).merge({
        status: editorStatus.ERROR,
        requestInProgress: false,
      }))

    // sort --------------------------------------------------------------------

    case actionTypes.SORT_START:
      return state.merge({
        status: editorStatus.SAVING,
        requestInProgress: true,
      })

    case actionTypes.SORT_SUCCESS:
      return state
        .merge({
          stepIds: order,
          status: editorStatus.SAVED,
          requestInProgress: false,
        })

    case actionTypes.SORT_FAILURE:
      return state.merge({
        status: editorStatus.ERROR,
        requestInProgress: false,
      })

    default:
      return state

  }
}
