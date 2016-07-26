import React from 'react'
import { Provider } from 'react-redux'

import Steps from '../containers/steps'

export default () => {
  const store = ReactOnRails.getStore('BusinesshackEditorStore')

  return <Provider store={store}><Steps /></Provider>
}
