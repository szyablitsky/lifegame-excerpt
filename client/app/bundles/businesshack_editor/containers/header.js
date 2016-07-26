import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Header from '../components/header'
import { status } from '../selectors/header'
import { change, save, uploadImage, changeDarken } from '../actions/hack'

const mapStateToProps = (state) => ({
  status: status(state),
  subtitle: state.hack.getIn(['data', 'subtitle']),
  description2: state.hack.getIn(['data', 'description2']),
  darken: state.hack.getIn(['data', 'darken']),
  image: state.hack.getIn(['data', 'image']),
  uploading: state.hack.get('uploadInProgress'),
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  change, save, uploadImage, changeDarken,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Header)
