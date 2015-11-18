import React from 'react'

class CommentsHeader extends React.Component {
  render() {
    const { loading, limit, countAll, countLoaded, onClick } = this.props
    if (countAll <= limit) return null;

    const text = countAll === countLoaded ?
      'Скрыть комментарии' :
      `Показать все комментарии (${countAll})`

    return (
      <div className='comments-header' onClick={onClick}>
        {loading ? this.renderLoader() : text}
      </div>
    )
  }

  renderLoader() {
    return (
      <div className='loader'>
        <div /><div /><div /><div /><div />
      </div>
    )
  }
}

export default CommentsHeader
