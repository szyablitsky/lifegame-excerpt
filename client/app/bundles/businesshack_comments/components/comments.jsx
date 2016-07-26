import React, { PropTypes } from 'react'
import map from 'lodash/map'

import Comment from '../containers/comment'

export default class Comments extends React.Component {
  render() {
    return (
      <div>
        {map(this.props.ids, (id) =>
          <Comment key={id} id={id} onReply={this.props.onReply}/>
        )}
      </div>
    )
  }
}

Comments.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.number).isRequired,
  onReply: PropTypes.func.isRequired,
}
