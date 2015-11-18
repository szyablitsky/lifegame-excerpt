import React from 'react'
import ReactDOM from 'react-dom'
import BusinesshackDemoModal from '../components/businesshack/demo_modal'

$(() => {
  $('.businesshack-example .picture').on('click', function() {
    const id = $(this).data('id')
    const wrapper = document.body.appendChild(document.createElement('div'))
    const component = ReactDOM.render(
      React.createElement(BusinesshackDemoModal, { id }),
      wrapper
    )
    component.promise.then(() => {
      ReactDOM.unmountComponentAtNode(wrapper)
      setTimeout(wrapper.remove)
    })
  })
})
