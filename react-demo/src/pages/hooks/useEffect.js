import React, { useEffect, useState } from 'react'
import { Button } from 'antd'

const UseEffect = () => {
  const [count, setCount] = useState(0)

  // componentDidMount componentDidUpdate
  useEffect(() => {
    console.log(count)
  })

  // componentDidMount
  useEffect(() => {
    console.log('componentDidMount')
  }, [])

  // componentDidUpdate componentWillUnMount
  useEffect(() => {
    return () => {
      console.log('componentDidUpdate componentWillUnMount')
    }
  })

  // componentWillUnMount
  useEffect(() => {
    return () => {
      console.log('componentWillUnMount')
    }
  }, [])

  return (
    <div>
      <Button onClick={() => setCount(count+1)}>+1</Button>
    </div>
  )
}

export default UseEffect
