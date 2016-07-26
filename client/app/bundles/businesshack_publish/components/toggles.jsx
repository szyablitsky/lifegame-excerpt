import React from 'react'

import Toggle from 'shared/components/toggle'
import Price from '../containers/price'

export default class Toggles extends React.Component {
  render() {
    const { paid, dark, service, changeToggle } = this.props
    return (
      <div>
        <Toggle value={paid} description='Тип хака:'
                trueDescription='платный' falseDescription='бесплатный'
                onChange={(value) => changeToggle('paid', value)} />
        {paid ? <Price /> : null}
        <Toggle value={dark} description='Карма:'
                trueDescription='темный' falseDescription='светлый'
                onChange={(value) => changeToggle('dark', value)} />
        <Toggle value={service} description='Стать исполнителем:'
                trueDescription='да' falseDescription='нет'
                onChange={(value) => changeToggle('service', value)} />
      </div>
    )
  }
}

Toggles.propTypes = {
  paid: React.PropTypes.bool.isRequired,
  dark: React.PropTypes.bool.isRequired,
  service: React.PropTypes.bool.isRequired,
  changeToggle: React.PropTypes.func.isRequired,
}
