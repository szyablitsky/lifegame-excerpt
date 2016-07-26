import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Comment from '../components/comment'
import { author, addressee, createdAt, canReply, content } from '../selectors/comment'
import { addresseeSet } from '../actions/comment'

const mapStateToProps = (state, props) => ({
  author: author(state, props),
  addressee: addressee(state, props),
  createdAt: createdAt(state, props),
  canReply: canReply(state, props),
  content: content(state, props),
})

const mapDispatchToProps = (dispatch) => bindActionCreators({ addresseeSet }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
