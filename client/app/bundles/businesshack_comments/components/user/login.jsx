import React from 'react'

import css from './message.sass'

const Login = () =>
  <div className={css.container}>
    <div className={css.message}>Чтобы написать комментарий нужно</div>
    <a className='button -default js-signin-link'>
      войти или зарегистрироваться
    </a>
  </div>

export default Login
