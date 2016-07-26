import React from 'react'
import { Provider } from 'react-redux'

import Benefits from '../containers/benefits'

export default () => {
  const store = ReactOnRails.getStore('BusinesshackEditorStore')

  return <Provider store={store}><Benefits /></Provider>
}
