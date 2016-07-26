import React from 'react'
import flatMap from 'lodash/flatMap'

import CreateStep from '../containers/create_step'
import Step from '../containers/step'

export default class Steps extends React.Component {
  render() {
    const { stepIds } = this.props
    return (
      <div>
        <CreateStep position={0} />
        {flatMap(stepIds, (id, i) => [
          <Step key={id} id={id} position={i} />,
          <CreateStep key={`c${i}`} position={i + 1} />,
        ])}
      </div>
    )
  }
}

Steps.propTypes = {
  stepIds: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
}
