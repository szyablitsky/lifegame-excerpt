import { hackReducer, initialState as hackState } from './hack'
import { stepsReducer, initialState as stepsState } from './steps'

export const reducers = {
  hack: hackReducer,
  steps: stepsReducer,
}

export const initialStates = {
  hackState,
  stepsState,
}
