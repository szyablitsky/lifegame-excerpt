import React from 'react'

import css from './loader.sass'

export default class Loader extends React.Component {
  render() {
    const { color } = this.props
    const className = `${css.ball} ${css[color]}`

    return (
      <div className={css.loader}>
        <div className={className} />
        <div className={className} />
        <div className={className} />
      </div>
    )
  }
}

Loader.propTypes = {
  color: React.PropTypes.string,
}

Loader.defaultProps = {
  color: 'white',
}
