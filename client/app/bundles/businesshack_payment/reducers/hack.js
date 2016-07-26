import * as actionTypes from '../constants'

export const initialState = {
  id: null,
  price: null,
  paymentType: 'AC',
  requestInProgress: false,
}

export function hackReducer(state = initialState, action = null) {
  const { type, key, value } = action

  switch (type) {

    case actionTypes.CHANGE:
      return { ...state, [key]: value }

    case actionTypes.CREATE_START:
      return { ...state, requestInProgress: true }

    case actionTypes.CREATE_FAILURE:
      return { ...state, requestInProgress: false }

    default:
      return state

  }
}
