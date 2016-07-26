import React from 'react'
import classNames from 'classnames'

import css from './toggle.sass'

export default class Toggle extends React.Component {
  render() {
    const {
      value, description, trueDescription, falseDescription, onChange,
    } = this.props
    const laneClass = classNames(css.lane, { [css.active]: value })
    const toggleClass = classNames(css.toggle, { [css.active]: value })

    return (
      <label className={css.container}>
        <div className={css.label}>
          <span className={css.description}>{description}</span>
          {' '}
          <span>{value ? trueDescription : falseDescription}</span>
          <input type='checkbox' checked={value} className={css.checkbox}
                 onChange={(e) => onChange(e.target.checked)} />
        </div>
        <div className={laneClass}>
          <div className={toggleClass} />
        </div>
      </label>
    )
  }
}

Toggle.propTypes = {
  value: React.PropTypes.bool.isRequired,
  description: React.PropTypes.string.isRequired,
  trueDescription: React.PropTypes.string.isRequired,
  falseDescription: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
}
