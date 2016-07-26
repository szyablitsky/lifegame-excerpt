/* -----------------------------------------------------------------------------
* based on
* Notifier.js - Developed by rlemon (rob.lemon@gmail.com) https://github.com/rlemon/Notifier.js
* Licensed under GNU GPL V3 https://github.com/rlemon/Notifier.js/blob/master/LICENSE
----------------------------------------------------------------------------- */

import css from './notifier.sass'

let container = null
export const containerClassName = css.container

export function saveRef(element) {
  container = element
}

export function getRef() {
  return container
}

export function notifyInfo(message, title) {
  notify(message, title, 'info')
}

export function notifySuccess(message, title) {
  notify(message, title, 'success')
}

export function notifyWarning(message, title) {
  notify(message, title, 'warning')
}

export function notifyError(message, title) {
  notify(message, title, 'error')
}

function notify(message, title, type) {
  const notification = createNotification(message, title, type)
  container.insertBefore(notification, container.firstChild)
  setTimeout(
    () => { fadeOut(notification) },
    5000
  )
}

const ICONS = {
  info: 'info-circle',
  success: 'check-circle',
  warning: 'exclamation-circle',
  error: 'minus-circle',
}

function createNotification(message, title, type) {
  const notification = document.createElement('div')
  notification.className = css.notification

  notification.onclick = function() {
    this.parentNode.removeChild(this)
  }

  const icon = document.createElement('i')
  icon.className = `fa fa-${ICONS[type]} ${css.icon} ${css[type]}`
  notification.appendChild(icon)

  const text = document.createElement('div')
  text.className = css.text
  notification.appendChild(text)

  if (title) {
    const titleText = document.createElement('div')
    titleText.className = css.title
    titleText.appendChild(document.createTextNode(title))
    text.appendChild(titleText)
  }

  if (message) {
    const messageText = document.createElement('div')
    messageText.appendChild(document.createTextNode(message))
    text.appendChild(messageText)
  }

  return notification
}

function fadeOut(element) {
  if (element.style.opacity && element.style.opacity > 0.05) {
    element.style.opacity -= 0.05
  } else if (element.style.opacity && element.style.opacity <= 0.1) {
    if (element.parentNode) {
      element.parentNode.removeChild(element)
    }
  } else {
    element.style.opacity = 0.9
  }
  setTimeout(
    () => { fadeOut(element) },
    1000 / 30
  )
}
