import React from 'react'
import ReactDOM from 'react-dom'

const Confirmation = (confirmation) => {
  return {
    confirm() {
      var wrapper = document.body.appendChild(document.createElement('div'))
      var component = ReactDOM.render(React.createElement(confirmation, null), wrapper)
      component.promise.then(() => {
        ReactDOM.unmountComponentAtNode(wrapper)
        setTimeout(wrapper.remove)
      })
    }
  }
}

export default Confirmation
