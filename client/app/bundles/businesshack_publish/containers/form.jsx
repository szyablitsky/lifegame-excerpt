import React from 'react'
import { Provider } from 'react-redux'

import PublishForm from '../components/form'
import createStore from '../store'

export default class PublishFormContainer extends React.Component {
  render() {
    return (
      <Provider store={createStore(this.props)}>
        <PublishForm onClose={this.props.onClose}/>
      </Provider>
    )
  }
}

PublishFormContainer.propTypes = {
  id: React.PropTypes.number.isRequired,
  onClose: React.PropTypes.func.isRequired,
}
