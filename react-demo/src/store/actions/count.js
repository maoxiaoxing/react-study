import { INCREMENT, DECREMENT, INCREMENT_ASYNC } from "../const";
import { createAction } from 'redux-actions'

// export const increment = payload => ({type: INCREMENT, payload});
// export const decrement = payload => ({type: DECREMENT, payload});
export const increment = createAction(INCREMENT)
export const decrement = createAction(DECREMENT)

export const increment_async = (payload) => dispatch => {
  setTimeout(() => {
    dispatch(increment(payload))
  }, 2000);
}



// export const increment_async = payload => ({type: INCREMENT_ASYNC, payload});
