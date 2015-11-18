import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from './middleware/logger'
import reducers from './reducers/combined'
import initialState from './helpers/initial_state'

const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore)

let store

function getStore(props) {
  if (typeof store !== 'undefined') return store
  store = createStoreWithMiddleware(reducers, initialState(props))
  return store
}

export default getStore
