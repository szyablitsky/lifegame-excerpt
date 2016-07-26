import * as actionTypes from '../constants/hack'
import StepEndpoint from '../endpoints/step'

export function changeStep(id, key, value) {
  return { type: actionTypes.CHANGE_STEP, id, key, value }
}

// create ----------------------------------------------------------------------

function createStepStart() {
  return { type: actionTypes.CREATE_STEP_START }
}

function createStepSuccess(position, id) {
  return { type: actionTypes.CREATE_STEP_SUCCESS, position, id }
}

function createStepFailure() {
  return { type: actionTypes.CREATE_STEP_FAILURE }
}

export function createStep(position) {
  return (dispatch, getState) => {
    if (getState().steps.get('requestInProgress')) return

    const businesshackId = getState().hack.getIn(['data', 'id'])

    dispatch(createStepStart())
    StepEndpoint.create(businesshackId, { position })
      .then((data) => { // eslint-disable-line no-shadow
        if (data.success) {
          dispatch(createStepSuccess(position, data.json['businesshack/step'].id))
        } else {
          dispatch(createStepFailure())
        }
      })
      .catch(() => dispatch(createStepFailure()))
  }
}

// save ------------------------------------------------------------------------

function saveStepStart(id) {
  return { type: actionTypes.SAVE_STEP_START, id }
}

function saveStepSuccess(id) {
  return { type: actionTypes.SAVE_STEP_SUCCESS, id }
}

function saveStepFailure(id) {
  return { type: actionTypes.SAVE_STEP_FAILURE, id }
}

export function saveStep(id) {
  return (dispatch, getState) => {
    if (getState().steps.getIn(['steps', `${id}`, 'requestInProgress'])) return

    const businesshackId = getState().hack.getIn(['data', 'id'])
    const data = getState().steps.getIn(['steps', `${id}`, 'data']).toJS()

    dispatch(saveStepStart(id))
    StepEndpoint.update(businesshackId, id, data)
      .then((data) => { // eslint-disable-line no-shadow
        if (data.success) {
          dispatch(saveStepSuccess(id))
        } else {
          dispatch(saveStepFailure(id))
        }
      })
      .catch(() => dispatch(saveStepFailure(id)))
  }
}

// delete ----------------------------------------------------------------------

function deleteStepStart(id) {
  return { type: actionTypes.DELETE_STEP_START, id }
}

function deleteStepSuccess(id) {
  return { type: actionTypes.DELETE_STEP_SUCCESS, id }
}

function deleteStepFailure(id) {
  return { type: actionTypes.DELETE_STEP_FAILURE, id }
}

export function deleteStep(id) {
  return (dispatch, getState) => {
    if (getState().steps.getIn(['steps', `${id}`, 'requestInProgress'])) return

    const businesshackId = getState().hack.getIn(['data', 'id'])

    dispatch(deleteStepStart(id))
    StepEndpoint.delete(businesshackId, id)
      .then((data) => { // eslint-disable-line no-shadow
        if (data.success) {
          dispatch(deleteStepSuccess(id))
        } else {
          dispatch(deleteStepFailure(id))
        }
      })
      .catch(() => dispatch(deleteStepFailure(id)))
  }
}

// move ------------------------------------------------------------------------

function sortStart() {
  return { type: actionTypes.SORT_START }
}

function sortSuccess(order) {
  return { type: actionTypes.SORT_SUCCESS, order }
}

function sortFailure() {
  return { type: actionTypes.SORT_FAILURE }
}

export function sort(id, dispatch, getState, direction) {
  const { steps } = getState()
  if (steps.get('requestInProgress')) return

  const businesshackId = getState().hack.getIn(['data', 'id'])
  const ids = steps.get('stepIds')
  const index = ids.findKey((value) => value === id)
  const offset = direction === 'up' ? -1 : 1
  const order = ids.delete(index).insert(index + offset, id)

  dispatch(sortStart())
  StepEndpoint.sort(businesshackId, { order: order.toJS() })
    .then((data) => { // eslint-disable-line no-shadow
      if (data.success) {
        dispatch(sortSuccess(order))
      } else {
        dispatch(sortFailure())
      }
    })
    .catch(() => dispatch(sortFailure(id)))
}

export function moveUp(id) {
  return (dispatch, getState) => {
    sort(id, dispatch, getState, 'up')
  }
}

export function moveDown(id) {
  return (dispatch, getState) => {
    sort(id, dispatch, getState, 'down')
  }
}
