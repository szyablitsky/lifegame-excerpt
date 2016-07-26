import { fromJS } from 'immutable'

import * as editorStatus from '../constants/status'
import * as actionTypes from '../constants/hack'

export const initialState = fromJS({
  status: editorStatus.SAVED,
  requestInProgress: false,
  uploadInProgress: false,
  data: {
    subtitle: '',
    description2: '',
    image: '',
    darken: 0,
    benefits2: ['', '', ''],
    closing: '',
  },
})

export function hackReducer(state = initialState, action = null) {
  const { type, key, i, value, image, benefits } = action

  switch (type) {

    case actionTypes.CHANGE:
      return state.mergeDeep({
        status: editorStatus.CHANGED,
        data: { [key]: value },
      })

    case actionTypes.SAVE_START:
      return state.merge({
        status: editorStatus.SAVING,
        requestInProgress: true,
      })

    case actionTypes.SAVE_SUCCESS:
      return state.merge({
        status: editorStatus.SAVED,
        requestInProgress: false,
      })

    case actionTypes.SAVE_FAILURE:
      return state.merge({
        status: editorStatus.ERROR,
        requestInProgress: false,
      })

    case actionTypes.UPLOAD_START:
      return state.set('uploadInProgress', true)

    case actionTypes.UPLOAD_SUCCESS:
      return state.mergeDeep({
        uploadInProgress: false,
        data: { image },
      })

    case actionTypes.UPLOAD_FAILURE:
      return state.set('uploadInProgress', false)

    case actionTypes.CHANGE_BENEFIT:
      return state.withMutations((state) => { // eslint-disable-line no-shadow
        state.set('status', editorStatus.CHANGED)
        state.setIn(['data', 'benefits2', i], value)
      })

    case actionTypes.CHANGE_BENEFITS:
      return state.setIn(['data', 'benefits2'], fromJS(benefits))

    default:
      return state

  }
}
