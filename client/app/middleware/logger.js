import createLogger from 'redux-logger'
import { Iterable } from 'immutable'

const logger = createLogger({
  transformer: (state) => {
    var newState = {}
    for (var i of Object.keys(state)) {
      if (Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS()
      } else {
        newState[i] = state[i]
      }
    }

    return newState
  }
})

export default logger
