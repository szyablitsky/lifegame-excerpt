import * as actionTypes from '../constants'

export const initialState = {
  data: {
    paid: false,
    price: '490',
    dark: false,
    service: false,
    tags: [],
  },
  errors: {},
  id: null,
  tags: [],
  requestInProgress: false,
}

export function hackReducer(state = initialState, action = null) {
  const { type, key, value, error } = action
  const { data } = state

  switch (type) {
    case actionTypes.CHANGE_TOGGLE:
      return { ...state, data: { ...data, [key]: value } }

    case actionTypes.CHANGE_PRICE:
      return { ...state, data: { ...data, price: value }, errors: {} }

    case actionTypes.PUBLISH_START:
      return { ...state, requestInProgress: true }

    case actionTypes.PUBLISH_ERROR:
      return { ...state, errors: { price: error } }

    case actionTypes.PUBLISH_FAILURE:
      return { ...state, requestInProgress: false }

    default:
      return state

  }
}
