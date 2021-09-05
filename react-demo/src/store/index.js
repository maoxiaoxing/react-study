import { createStore, applyMiddleware } from 'redux'
import AllReducer from './reducers'
import LoggerMiddleware from './middleware/logger'

export const store = createStore(AllReducer, applyMiddleware(LoggerMiddleware))
