import ReactOnRails from 'react-on-rails'
import BusinesshackEditorHeader from './header'
import BusinesshackEditorBenefits from './benefits'
import BusinesshackEditorSteps from './steps'
import BusinesshackEditorClosing from './closing'
import BusinesshackEditorStore from '../store'

ReactOnRails.setOptions({
  traceTurbolinks: TRACE_TURBOLINKS, // eslint-disable-line no-undef
})

ReactOnRails.register({
  BusinesshackEditorHeader,
  BusinesshackEditorBenefits,
  BusinesshackEditorSteps,
  BusinesshackEditorClosing,
})

ReactOnRails.registerStore({ BusinesshackEditorStore });
