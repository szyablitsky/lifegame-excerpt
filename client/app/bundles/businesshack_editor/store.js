import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { reducers, initialStates } from './reducers/'
import { hackState, stepsState } from './hydrator'

export default (props) => {
  const combinedReducer = combineReducers(reducers)

  const initialState = {
    hack: initialStates.hackState.merge(hackState(props)),
    steps: initialStates.stepsState.merge(stepsState(props)),
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
