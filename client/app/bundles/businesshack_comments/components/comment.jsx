import React, { PropTypes } from 'react'

import TimeAgo from 'shared/components/timeago'
import simpleFormat from 'shared/helpers/simple_format'

import css from './comment.sass'

export default class Comment extends React.Component {
  constructor(props) {
    super(props)
    this.handleReply = this.handleReply.bind(this)
  }

  handleReply() {
    const { author, addresseeSet, onReply } = this.props
    addresseeSet(author.id, author.name.split(' ')[0])
    onReply()
  }

  render() {
    const { author, addressee, createdAt, canReply, content } = this.props
    return (
      <div className={css.container}>
        <img className={css.avatar} src={author.avatar} />
        <div className={css.main}>
          <div className={css.header}>
            <div>
              <div className={css.author}>
                {author.name}
                {addressee ? <span className={css.addressee}> > {addressee}</span> : null}
              </div>
              <div className={css.timeago}><TimeAgo time={createdAt} /></div>
            </div>
            {canReply ? <div className={css.reply} onClick={this.handleReply}>ответить</div> : null}
          </div>
          <div className={css.content}>{simpleFormat(content)}</div>
        </div>
      </div>
    )
  }
}

Comment.propTypes = {
  id: PropTypes.number.isRequired,
  author: PropTypes.shape({
    id: PropTypes.number.isRequired,
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  addressee: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  canReply: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
  addresseeSet: PropTypes.func.isRequired,
  onReply: PropTypes.func.isRequired,
}
