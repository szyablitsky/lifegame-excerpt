import React from 'react'

import css from './message.sass'

const Purchase = () =>
  <div className={css.container}>
    <div className={css.message}>Чтобы написать комментарий нужно</div>
    <a className='button -default js-hack-payment'>
      купить этот бизнесхак
    </a>
  </div>

export default Purchase
