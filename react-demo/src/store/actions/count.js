import { INCREMENT, DECREMENT, INCREMENT_ASYNC } from "../const";

export const increment = payload => ({type: INCREMENT, payload});
export const decrement = payload => ({type: DECREMENT, payload});

export const increment_async = (payload) => dispatch => {
  setTimeout(() => {
    dispatch(increment(payload))
  }, 2000);
}

// export const increment_async = payload => ({type: INCREMENT_ASYNC, payload});
