import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'antd'

const UseEffect = () => {
  const [count, setCount] = useState(0)

  const unmountComponent = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('root'))
  }

  // 异步函数
  const getData = () => {
    return new Promise((resolve) =>{
      resolve({msg: 'hello'})
    })
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

  useEffect(() => {
    console.log(`${count}变化了`)
  }, [count])

  // 异步函数会导致 componentWillUnMount 不生效
  useEffect(async () => {
    const res = await getData()
    console.log(res)
    return () =>{
      console.log(123)
    }
  }, [])

  // useEffect(() => {
  //   (async () => {
  //     const res = await getData()
  //     console.log(res)
  //   })()
  // }, [])

  return (
    <div>
      <Button onClick={() => setCount(count+1)}>+1</Button>
      <Button onClick={unmountComponent}>卸载组件</Button>
    </div>
  )
}

export default UseEffect
