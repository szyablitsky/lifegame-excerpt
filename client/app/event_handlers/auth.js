import React from 'react'
import ReactDOM from 'react-dom'
import AuthModal from '../components/auth/auth_modal'

function modal(mode) {
  const wrapper = document.body.appendChild(document.createElement('div'))
  const component = ReactDOM.render(React.createElement(AuthModal, {mode: mode}), wrapper)
  component.promise.then(() => {
    ReactDOM.unmountComponentAtNode(wrapper)
    setTimeout(wrapper.remove)
  })
}

function initLink(className, goal, mode) {
  $(className).on('click', (e) => {
    e.preventDefault()
    window.yaCounterReachGoal(goal)
    modal(mode)
  })
}

$(() => {
  initLink('.signin-link', 'SIGN_IN', 'sign-in')
  initLink('.signup-link', 'SIGN_UP', 'sign-up')
})
