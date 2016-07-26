import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Step from '../components/step'
import { changeStep, saveStep, deleteStep, moveUp, moveDown } from '../actions/step'
import { imagesUploadUrl, canMoveUp, canMoveDown } from '../selectors/step'

const mapStateToProps = (state, props) => ({
  title: state.steps.getIn(['steps', `${props.id}`, 'data', 'title']),
  content: state.steps.getIn(['steps', `${props.id}`, 'data', 'content']),
  imagesUploadUrl: imagesUploadUrl(state, props),
  canMoveUp: canMoveUp(state, props),
  canMoveDown: canMoveDown(state, props),
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  changeStep, saveStep, deleteStep, moveUp, moveDown,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Step)
