import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'antd'

const UseEffect = () => {
  const [count, setCount] = useState(0)

  const unmountComponent = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('root'))
  }

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
    console.log('sss')
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
      <Button onClick={unmountComponent}>卸载组件</Button>
    </div>
  )
}

export default UseEffect
