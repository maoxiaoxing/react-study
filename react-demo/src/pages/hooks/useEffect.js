import React, { useEffect, useState } from 'react'
import { Button } from 'antd'

const UseEffect = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log(count)
  })

  return (
    <div>
      <Button onClick={() => setCount(count+1)}>+1</Button>
    </div>
  )
}

export default UseEffect
