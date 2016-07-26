import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { reducers, initialStates } from './reducers/'
import { comments, user } from './hydrator'

export default (props, railsContext) => {
  const combinedReducer = combineReducers(reducers)

  const initialState = {
    comments: { ...initialStates.comments, ...comments(props, railsContext) },
    user: user(props, railsContext),
  }

  const enhancers = compose(
    applyMiddleware(thunkMiddleware),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
      ? window.devToolsExtension()
      : (f) => f
  )

  const store = createStore(combinedReducer, initialState, enhancers)

  /* eslint-env commonjs */
  if (module.hot) {
    module.hot.accept('./reducers/', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = combineReducers(require('./reducers/index').reducers)
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
