import { camelizeKeys, decamelizeKeys } from 'humps'

import * as actionTypes from '../constants'
import HackEndpoint from 'shared/endpoints/hack'

export const change = (content) => ({ type: actionTypes.CHANGE, content })

export const addresseeSet = (id, name) => ({ type: actionTypes.ADDRESSEE_SET, id, name })
export const addresseeRemove = () => ({ type: actionTypes.ADDRESSEE_REMOVE })

const submitStart = () => ({ type: actionTypes.SUBMIT_START })
const submitSuccess = (comment) => ({ type: actionTypes.SUBMIT_SUCCESS, comment })
const submitFailure = () => ({ type: actionTypes.SUBMIT_FAILURE })

export function submit() {
  return (dispatch, getState) => {
    const { comments } = getState()
    const { businesshackId, addresseeId, content, requestInProgress } = comments
    if (requestInProgress) return

    dispatch(submitStart())
    HackEndpoint.submitComment(businesshackId, decamelizeKeys({ content, addresseeId }))
    .then((response) => {
      if (response.success) {
        dispatch(submitSuccess(camelizeKeys(response.json.comment)))
      } else {
        dispatch(submitFailure())
      }
    })
    .catch(() => dispatch(submitFailure()))
  }
}
