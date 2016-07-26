import React from 'react'

import Modal from 'shared/components/modal'
import PublishForm from '../containers/form'

export default class PublishModal extends React.Component {
  componentWillMount() {
    this.promise = new Promise((resolve) => {
      this.close = resolve
    })
  }

  render() {
    return (
      <Modal onClose={this.close}>
        <PublishForm id={this.props.id} onClose={this.close} />
      </Modal>
    )
  }
}

PublishModal.propTypes = {
  id: React.PropTypes.number.isRequired,
}
