import { INCREMENT, DECREMENT, INCREMENT_ASYNC } from "../const/counter.const";

export const increment = payload => ({type: INCREMENT, payload});
export const decrement = payload => ({type: DECREMENT, payload});

export const increment_async = payload => ({type: INCREMENT_ASYNC, payload});
