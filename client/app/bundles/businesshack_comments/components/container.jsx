import React from 'react'

import User from '../containers/user'
import Comments from '../containers/comments'

export default class CommentsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.showForm = this.showForm.bind(this)
  }

  showForm() {
    this._user.scrollIntoView({ behavior: 'smooth' })
    this._input.focus()
  }

  render() {
    return (
      <div ref={(c) => { this._user = c }}>
        <User saveRef={(c) => { this._input = c }}/>
        <Comments onReply={this.showForm}/>
      </div>
    )
  }
}
