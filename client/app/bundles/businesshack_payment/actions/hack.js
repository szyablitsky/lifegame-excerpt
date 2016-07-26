import { decamelizeKeys } from 'humps'

import * as actionTypes from '../constants'
import OrderEndpoint from '../endpoints/order'

export const change = (key, value) => ({ type: actionTypes.CHANGE, key, value })

const createStart = () => ({ type: actionTypes.CREATE_START })
const createFailure = () => ({ type: actionTypes.CREATE_FAILURE })

export function create() {
  return (dispatch, getState) => {
    const { requestInProgress, id, paymentType } = getState().hack
    if (requestInProgress) return

    dispatch(createStart())
    OrderEndpoint.create(decamelizeKeys({ subject: 'businesshack', id, paymentType }))
    .then((response) => {
      if (response.success) {
        window.location = response.json.url
      } else {
        dispatch(createFailure())
      }
    })
    .catch(() => dispatch(createFailure()))
  }
}
