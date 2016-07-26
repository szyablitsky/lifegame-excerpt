import React from 'react'
import { Provider } from 'react-redux'

import Closing from '../containers/closing'

export default () => {
  const store = ReactOnRails.getStore('BusinesshackEditorStore')

  return <Provider store={store}><Closing /></Provider>
}
