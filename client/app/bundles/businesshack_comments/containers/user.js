import { connect } from 'react-redux'

import User from '../components/user'

const mapStateToProps = (state) => ({
  loggedIn: state.user.loggedIn,
  canComment: state.user.canComment,
})

export default connect(mapStateToProps)(User)
