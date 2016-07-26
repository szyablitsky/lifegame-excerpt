import React from 'react'
import { Provider } from 'react-redux'

import CommentsContainer from '../components/container'

export default () => {
  const store = ReactOnRails.getStore('BusinesshackCommentsStore')

  return <Provider store={store}><CommentsContainer /></Provider>
}
