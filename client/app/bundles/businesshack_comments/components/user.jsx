import React, { PropTypes } from 'react'

import Form from '../containers/user/form'
import Purchase from './user/purchase'
import Login from './user/login'

import css from './user.sass'

export default class User extends React.Component {
  render() {
    const { loggedIn, canComment, saveRef } = this.props
    return (
      <div className={css.container}>
        {loggedIn // eslint-disable-line no-nested-ternary
           ? canComment ? <Form saveRef={saveRef} /> : <Purchase />
           : <Login />
         }
      </div>
    )
  }
}

User.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  canComment: PropTypes.bool.isRequired,
  saveRef: PropTypes.func.isRequired,
}
