import React, { useReducer } from 'react'
import { Button } from 'antd'
 
const UseReducer = () => {
  const countReducer = (state, action) => {
    switch (action.type) {
      case 'increment':
        return state + 1
      case 'decrement':
        return state - 1
      default:
        return state
    }
  }
  const [count, countDispatch] = useReducer(countReducer, 0)

  return (
    <div>
      <Button onClick={() => countDispatch({ type: 'decrement' })}>-1</Button>
      {count}
      <Button onClick={() => countDispatch({ type: 'increment' })}>+1</Button>
    </div>
  )
}

export default UseReducer
