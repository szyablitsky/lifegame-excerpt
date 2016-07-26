import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from '../../components/user/form'
import { addressee } from '../../selectors/form'
import { change, submit } from '../../actions/comment'

const mapStateToProps = (state) => ({
  addressee: addressee(state),
  avatar: state.user.avatar,
  content: state.comments.content,
  inProgress: state.comments.requestInProgress,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  change, submit,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Form)
