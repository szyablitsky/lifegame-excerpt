import * as actionTypes from '../constants'
import HackEndpoint from '../endpoints/hack'
import { notifySuccess } from 'shared/components/notifier'

export function changeToggle(key, value) {
  return { type: actionTypes.CHANGE_TOGGLE, key, value }
}

export function changePrice(e) {
  const { value } = e.target
  return { type: actionTypes.CHANGE_PRICE, value }
}

function publishStart() {
  return { type: actionTypes.PUBLISH_START }
}

function publishError(error) {
  return { type: actionTypes.PUBLISH_ERROR, error }
}

function publishFailure() {
  return { type: actionTypes.PUBLISH_FAILURE }
}

function validate(dispatch, getState) {
  const { price } = getState().hack.data
  if (!(/^\d+$/).test(price)) {
    dispatch(publishError('Введите число'))
    return false
  }

  const value = parseInt(price, 10)
  if (value < 99 || value > 99999) {
    dispatch(publishError('Введите число от 99 до 99 999'))
    return false
  }

  return true
}

export function publish(onClose) {
  return (dispatch, getState) => {
    const { requestInProgress, id, data } = getState().hack
    if (requestInProgress) return
    if (!validate(dispatch, getState)) return

    dispatch(publishStart())
    HackEndpoint.publish(id, data)
    .then((response) => {
      if (response.success) {
        onClose()
        notifySuccess('Бизнесхак опубликован')
        Turbolinks.visit(`/businesshacks/${id}`)
      } else {
        dispatch(publishFailure())
      }
    })
    .catch(() => dispatch(publishFailure()))
  }
}
