import compact from 'lodash/compact'
import map from 'lodash/map'

import * as actionTypes from '../constants/hack'
import HackEndpoint from '../endpoints/hack'
import { getAuthenticityToken } from 'shared/endpoints/base'
import { notifyError } from 'shared/components/notifier'

export function change(key, value) {
  return { type: actionTypes.CHANGE, key, value }
}

function saveStart() {
  return { type: actionTypes.SAVE_START }
}

function saveSuccess() {
  return { type: actionTypes.SAVE_SUCCESS }
}

function saveFailure() {
  return { type: actionTypes.SAVE_FAILURE }
}

export function save() {
  return (dispatch, getState) => {
    if (getState().hack.get('requestInProgress')) return

    const data = getState().hack.get('data').toJS()

    dispatch(saveStart())
    HackEndpoint.update(data)
      .then((data) => { // eslint-disable-line no-shadow
        if (data.success) {
          dispatch(saveSuccess())
        } else {
          dispatch(saveFailure())
        }
      })
      .catch(() => dispatch(saveFailure()))
  }
}

function uploadStart() {
  return { type: actionTypes.UPLOAD_START }
}

function uploadSuccess(image) {
  return { type: actionTypes.UPLOAD_SUCCESS, image }
}

function uploadFailure() {
  return { type: actionTypes.UPLOAD_FAILURE }
}

export function uploadImage(file) {
  return (dispatch, getState) => {
    if (getState().hack.get('uploadInProgress')) return

    dispatch(uploadStart())
    let data = new FormData()
    data.append('image', file)

    const request = new XMLHttpRequest()

    request.addEventListener('readystatechange', () => {
      if (request.readyState != 4) return
      if (request.status != 200) {
        notifyError('Ошибка загрузки файла. Попробуйте перезагрузить страницу.')
        dispatch(uploadFailure())
        return
      }

      const { url } = JSON.parse(request.responseText)
      dispatch(uploadSuccess(url))
    })

    const id = getState().hack.getIn(['data', 'id'])
    request.open('POST', `/api/businesshacks/${id}/image`, true)
    request.setRequestHeader('X-CSRF-Token', getAuthenticityToken())
    request.send(data)
  }
}

export function changeBenefit(i, value) {
  return { type: actionTypes.CHANGE_BENEFIT, i, value }
}

function changeBenefits(benefits) {
  return { type: actionTypes.CHANGE_BENEFITS, benefits }
}

export function changeBenefitsCount(i) {
  return (dispatch, getState) => {
    const benefits2 = getState().hack.getIn(['data', 'benefits2'])
    if (benefits2.size === i) return

    let compacted = compact(benefits2.toJS())
    if (compacted.length > i &&
        !confirm('Некотороые данные (польза) будут потеряны. Уменьшить?')) return

    compacted.length = i
    // eslint-disable-next-line no-confusing-arrow
    dispatch(changeBenefits(map(compacted, (benefit) => benefit ? benefit : '')))
    dispatch(save())
  }
}
