import { commentsReducer, initialState as comments } from './comments'
import { userReducer, initialState as user } from './user'

export const reducers = {
  comments: commentsReducer,
  user: userReducer,
}

export const initialStates = {
  comments,
  user,
}
