import React from 'react'
import Comment from './comment'
import { map } from 'lodash'

class CommentsList extends React.Component {
  render() {
    const { comments, userId, onSelectAddressee } = this.props
    return (
      <div className='comments-list'>
        {map(comments, (comment) => {
          return <Comment key={comment.id} comment={comment} userId={userId}
                          onSelectAddressee={onSelectAddressee} />
        })}
      </div>
    )
  }
}

export default CommentsList
