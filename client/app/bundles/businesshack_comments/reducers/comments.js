import * as actionTypes from '../constants'

export const initialState = {
  businesshackId: null,
  content: '',
  addresseeId: null,
  requestInProgress: false,
  ids: [],
  comments: {},
  users: {},
}

export function commentsReducer(state = initialState, action = null) {
  const { type, id, name, content, comment } = action

  switch (type) {

    case actionTypes.CHANGE:
      return { ...state, content }

    case actionTypes.ADDRESSEE_SET:
      return { ...state, addresseeId: id, content: `${name}, ` }

    case actionTypes.ADDRESSEE_REMOVE:
      return { ...state, addresseeId: null }

    case actionTypes.SUBMIT_START:
      return { ...state, requestInProgress: true }

    case actionTypes.SUBMIT_SUCCESS:
      return {
        ...state,
        content: '',
        addresseeId: null,
        requestInProgress: false,
        ids: [comment.id, ...state.ids],
        comments: {
          ...state.comments,
          [comment.id]: comment,
        },
      }

    case actionTypes.SUBMIT_FAILURE:
      return { ...state, requestInProgress: false }

    default:
      return state

  }
}
