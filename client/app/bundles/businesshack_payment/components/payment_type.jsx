import React from 'react'
import map from 'lodash/map'
import classNames from 'classnames'

import Icon from './icon'
import css from './form.sass'

export default class PaymentType extends React.Component {
  handleChange() {
    const { type, change } = this.props
    change('paymentType', type.id)
  }

  render() {
    const { selected, type: { id, name, icons } } = this.props
    const indicatorClassName = classNames(css.indicator, { [css.active]: id === selected })

    return (
      <label className={css.type}>
        <div className={css.labelContainer}>
          <input type='radio' name='paymentType' className={css.radio}
                 onChange={this.handleChange.bind(this)} />
          <div className={indicatorClassName} />
          <div className={css.label}>{name}</div>
        </div>
        <div className={css.icons}>
          {map(icons, (type) => <Icon key={type} type={type} />)}
        </div>
      </label>
    )
  }
}

PaymentType.propTypes = {
  type: React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    icons: React.PropTypes.arrayOf(React.PropTypes.string),
  }).isRequired,
  selected: React.PropTypes.string.isRequired,
  change: React.PropTypes.func.isRequired,
}
