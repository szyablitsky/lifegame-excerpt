import React from 'react'
import CommentsHeader from './header'
import CommentsList from './list'
import CommentsForm from './form'

class CommentsBox extends React.Component {
  constructor(props) {
    super(props)
    const { count, comments } = this.props
    this.state = { count, comments }
  }

  selectAdressee(id, name, fullName) {
    this.setState({ addressee: { id, name, fullName } })
  }

  addComment(comment) {
    this.state.comments.push(comment)
    this.setState({
      count: this.state.count + 1,
      comments: this.state.comments,
      addressee: null
    })
  }

  toggleComments() {
    let { count, comments } = this.state
    if (count === comments.length) {
      this.setState({
        comments: comments.slice(comments.length - this.props.limit)
      })
    } else {
      this.loadComments()
    }
  }

  loadComments() {
    this.setState({ loading: true })
    $.getJSON(this.props.url)
    .done((data) => {
      this.setState({
        loading: false,
        count: data.comments.length,
        comments: data.comments
      })
    })
    .fail(() => {
      this.setState({ loading: true })
      Growlyflash.error('Ошибка выполнения запроса. Попробуйте еще раз.')
    })
  }

  render() {
    const { limit, user_id, url } = this.props
    const { count, comments, addressee, loading } = this.state
    return (
      <div className='comments-container'>
        <CommentsHeader countAll={count} countLoaded={comments.length}
          loading={loading} limit={limit} onClick={this.toggleComments.bind(this)} />
        <CommentsList userId={user_id} comments={comments}
          onSelectAddressee={this.selectAdressee.bind(this)} />
        <CommentsForm addressee={addressee} url={url}
          onAddComment={this.addComment.bind(this)} />
      </div>
    )
  }
}

const Factory = (props) => <CommentsBox {...props} />

export default Factory
