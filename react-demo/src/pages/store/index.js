import { createStore } from 'redux'
import AllReducer from './reducers'

export const store = createStore(AllReducer)
