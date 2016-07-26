import React from 'react'

import css from './form.sass'

export default class User extends React.Component {
  render() {
    const { avatar, name } = window.appData.user
    return (
      <div className={css.user}>
        <img src={avatar} className={css.avatar} />
        <div className={name}>{name}</div>
      </div>
    )
  }
}
