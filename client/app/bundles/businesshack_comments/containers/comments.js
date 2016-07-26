import { connect } from 'react-redux'

import Comments from '../components/comments'

const mapStateToProps = (state) => ({ ids: state.comments.ids })

export default connect(mapStateToProps)(Comments)
