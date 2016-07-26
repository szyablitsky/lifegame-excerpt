import includes from 'lodash/includes'
import QueryString from 'query-string'

function getMetaContent(name) {
  let header = document.querySelector(`meta[name="${name}"]`)

  return header && header.content
}

export function getAuthenticityToken() {
  return getMetaContent('csrf-token')
}

function jsonParams(json, method) {
  return {
    method,
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': getAuthenticityToken(),
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(json),
  }
}

function handleResponse(response) {
  const { status } = response
  if (includes([200, 422], status)) {
    return Promise.resolve(
      response.json().then((json) => ({ success: status === 200, json }))
    )
  }
  throw response
}

/* global Notifier */
function handleFailure(ex) {
  console.error(ex) // eslint-disable-line no-console
  Notifier.error(
    'Попробуйте еще раз, или перезагрузите страницу',
    'Ошибка обработки запроса'
  )
  throw new Error()
}

export default function request(baseUrl, params, method = 'post') {
  const queryString = method === 'get' ? `?${QueryString.stringify(params)}` : ''
  const url = baseUrl + queryString
  const fetchParams = method === 'get' ? {} : jsonParams(params, method.toUpperCase())

  return fetch(url, fetchParams)
   .then(handleResponse)
   .catch(handleFailure)
}
