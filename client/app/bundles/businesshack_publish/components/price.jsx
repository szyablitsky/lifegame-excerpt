import React from 'react'

import css from './price.sass'

export default class Price extends React.Component {
  render() {
    const { price, error, changePrice } = this.props

    return (
      <div className={css.container}>
        {error ? <div className={css.error}>{error}</div> : null}
        <label className={css.label}>Цена</label>
        <input value={price} className={`form-input ${css.value}`}
               onChange={changePrice} />
      </div>
    )
  }
}

Price.propTypes = {
  price: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]).isRequired,
  error: React.PropTypes.string,
  changePrice: React.PropTypes.func.isRequired,
}
