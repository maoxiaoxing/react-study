import { takeEvery, put, delay } from 'redux-saga/effects'
import { increment } from '../actions/count'
import { INCREMENT_ASYNC } from '../const'

function* increment_async_fn(action) {
  yield delay(2000)
  yield put(increment(action.payload))
}

export default function* counterSaga() {
  // 接收 action
  yield takeEvery(INCREMENT_ASYNC, increment_async_fn)
}
