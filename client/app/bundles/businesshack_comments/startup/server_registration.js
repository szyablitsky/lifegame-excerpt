import ReactOnRails from 'react-on-rails'
import BusinesshackComments from './comments'
import BusinesshackCommentsStore from '../store'

ReactOnRails.register({
  BusinesshackComments,
})

ReactOnRails.registerStore({ BusinesshackCommentsStore })
