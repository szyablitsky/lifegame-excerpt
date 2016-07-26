import React from 'react'
import map from 'lodash/map'
import classNames from 'classnames'

import css from './benefits.sass'

export default class Switcher extends React.Component {
  render() {
    const { count } = this.props
    return (
      <div className={css.switcher}>
        {map([1, 2, 3], (i) => {
          const className = classNames(css.value, { [css.active]: i === count })
          return (
            <div key={i} className={className}
                 onClick={this.props.changeBenefitsCount.bind(null, i)}>
              {i}
            </div>
          )
        })}
      </div>
    )
  }
}

Switcher.propTypes = {
  count: React.PropTypes.number.isRequired,
  changeBenefitsCount: React.PropTypes.func.isRequired,
}
