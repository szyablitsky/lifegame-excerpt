import React from 'react'
import Modal from '../modal'
import BusinesshackDemo from './demo'

class BusinesshackDemoModal extends React.Component {
  componentWillMount() {
    this.promise = new Promise((resolve, _) => {
      this.close = resolve
    })
  }

  render() {
    return (
      <Modal onClose={this.close}>
        <BusinesshackDemo {...this.props} />
      </Modal>
    )
  }
}

export default BusinesshackDemoModal
