import ReactOnRails from 'react-on-rails'
import BusinesshackEditorHeader from './header'
import BusinesshackEditorBenefits from './benefits'
import BusinesshackEditorSteps from './steps'
import BusinesshackEditorClosing from './closing'
import BusinesshackEditorStore from '../store'

ReactOnRails.register({
  BusinesshackEditorHeader,
  BusinesshackEditorBenefits,
  BusinesshackEditorSteps,
  BusinesshackEditorClosing,
})

ReactOnRails.registerStore({ BusinesshackEditorStore })
