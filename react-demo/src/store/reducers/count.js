import { INCREMENT, DECREMENT } from '../const'
import { handleActions as createReducer } from 'redux-actions'
import { increment, decrement } from '../actions/count'


const initialState = {
  count: 0
}

const handleIncrement = (state, action) => ({count: state.count + action.payload})
const handleDecrement = (state, action) => ({count: state.count - action.payload})

const CounterReducer = createReducer({
  [increment]: handleIncrement,
  [decrement]: handleDecrement,
}, initialState)

export default CounterReducer

// const CounterReducer = (state = initialState, action) => {
//   switch(action.type) {
//     case INCREMENT:
//       return {
//         ...state,
//         count: state.count + action.payload,
//       }
//     case DECREMENT:
//       return {
//         ...state,
//         count: state.count - action.payload
//       }
//     default: 
//       return state;
//   }
// }

// export default CounterReducer
