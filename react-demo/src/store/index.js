import { createStore, applyMiddleware } from 'redux'
import AllReducer from './reducers'
import LoggerMiddleware from './middleware/logger'
// import ThunkMiddleware from './middleware/thunk'
// import thunk from 'redux-thunk'
import createSagaMidddleware from 'redux-saga';
import rootSaga from './sagas'

const sagaMiddleware = createSagaMidddleware();

export const store = createStore(AllReducer, applyMiddleware(
  LoggerMiddleware,
  // thunk,
  sagaMiddleware,
))

sagaMiddleware.run(rootSaga)
