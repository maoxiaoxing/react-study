import { Button } from 'antd'
import React, { useContext, createContext, useState } from 'react'

const countContext = createContext()
const { Provider } = countContext

const Foo = () => {
  const {
    count,
  } = useContext(countContext)
  console.log(count, 'value')

  return (
    <div>
      {count}
    </div>
  )
}
 
const UseContext = () => {
  const [count, setCount] = useState(0)

  const provide = {
    count,
  }

  return (
    <div>
      <Provider value={provide}>
        <Foo></Foo>
      </Provider>
      <Button onClick={() => setCount(count + 1)}>+1</Button>
    </div>
  )
}

export default UseContext
