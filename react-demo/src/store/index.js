import { createStore, applyMiddleware } from 'redux'
import AllReducer from './reducers'
import LoggerMiddleware from './middleware/logger'
import ThunkMiddleware from './middleware/thunk'

export const store = createStore(AllReducer, applyMiddleware(
  LoggerMiddleware,
  ThunkMiddleware,
))
