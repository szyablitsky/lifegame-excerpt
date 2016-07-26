import React from 'react'
import { Provider } from 'react-redux'

import Header from '../containers/header'

export default () => {
  const store = ReactOnRails.getStore('BusinesshackEditorStore')

  return <Provider store={store}><Header /></Provider>
}
