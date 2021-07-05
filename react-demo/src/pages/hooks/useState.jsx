import React, { useState } from 'react'
import { Button } from 'antd'

const UseState = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>{count}</p>
      <Button onClick={() => setCount(count + 1)}>+ 1</Button>
    </div>
  )
}

export default UseState
