import ReactOnRails from 'react-on-rails'
import BusinesshackComments from './comments'
import BusinesshackCommentsStore from '../store'

ReactOnRails.setOptions({
  traceTurbolinks: TRACE_TURBOLINKS, // eslint-disable-line no-undef
})

ReactOnRails.register({ BusinesshackComments })

ReactOnRails.registerStore({ BusinesshackCommentsStore });
