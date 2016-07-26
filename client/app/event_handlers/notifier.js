import { getRef, saveRef, containerClassName } from 'shared/components/notifier'

document.addEventListener('turbolinks:load', () => {
  let container = getRef()

  if (!container) {
    container = document.createElement('div')
    container.className = containerClassName
    container.setAttribute('data-turbolinks-permanent', '')
    saveRef(container)
  }

  document.body.appendChild(container)
})
