import React from 'react'

import IconVisa from './icons/visa'
import IconMasterCard from './icons/master_card'
import IconYandexMoney from './icons/yandex_money'
import IconWebMoney from './icons/web_money'

import css from './form.sass'

const ICONS = {
  visa: { element: <IconVisa />, width: 23.187, height: 7.552 },
  masterCard: { element: <IconMasterCard />, width: 23.219, height: 13.897 },
  yandexMoney: { element: <IconYandexMoney />, width: 14.261, height: 18.752 },
  webMoney: { element: <IconWebMoney />, width: 17.285, height: 17.221 },
}

export default function Icon({ type }) {
  const { element, ...style } = ICONS[type]
  return <div className={css.icon} style={style}>{element}</div>
}

Icon.propTypes = {
  type: React.PropTypes.string.isRequired,
}
