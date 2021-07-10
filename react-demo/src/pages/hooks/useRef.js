import React, { useEffect, useRef, useState } from 'react'
import { Button, Input } from 'antd'

const UseRef = () => {
  const userName = useRef()
  const timerRef = useRef()
  const [count, setCount] = useState(0)

  const useNameChange = () => {
    console.log(userName)
  }

  // let timer

  const stopCount = () => {
    clearInterval(timerRef.current)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCount((count) => {
        return count + 1
      })
    }, 1000);
  }, [])

  return (
    <div>
      <Input ref={userName} onChange={useNameChange}></Input>
      {count}
      <Button onClick={stopCount}>停止</Button>
    </div>
  )
}

export default UseRef
