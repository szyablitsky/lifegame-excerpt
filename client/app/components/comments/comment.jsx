import React from 'react'
import TimeAgo from '../timeago'
import simpleFormat from '../../helpers/simple_format'

class Comment extends React.Component {
  isAuthor() {
    return this.props.userId === this.props.comment.author.id
  }

  selectAdressee() {
    const { author } = this.props.comment
    if (!this.isAuthor()) {
      this.props.onSelectAddressee(
        author.id,
        author.first_name,
        `${author.first_name} ${author.last_name}`
      )
    }
  }

  render() {
    const { author, content, created_at } = this.props.comment
    const className = this.isAuthor() ? ' -author' : ''

    return (
      <div className={`comment${className}`} onClick={this.selectAdressee.bind(this)}>
        <div className='author-avatar'>
          <img src={author.avatar} />
        </div>
        <div className='comment-content'>
          <div className='comment-header'>
            <div>
              <span className='author-name'>{author.first_name} {author.last_name}</span>
              {this.renderAddressee()}
            </div>
          </div>
          <div className='content'>{simpleFormat(content)}</div>
          <div className='comment-footer'>
            <div className='comment-info'>
              <TimeAgo time={created_at} />
              {this.renderReplyLink()}
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderAddressee() {
    const { addressee } = this.props.comment
    if (addressee === null) return null
    return (
      <span>
        <i className='fa fa-angle-right' />
        {addressee.name}
      </span>
    )
  }

  renderReplyLink() {
    if (this.isAuthor()) return null

    return (
      <span>
        {' | '}
        <a className='reply-link'>ответить</a>
      </span>
    )
  }
}

export default Comment
