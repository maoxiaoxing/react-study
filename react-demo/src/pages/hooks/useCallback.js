import React, { useState, memo, useCallback } from 'react'
import { Button } from 'antd'

const Foo = memo((props) => {
  console.log('Foo组件渲染了')
  const {
    resetCount
  } = props

  return (
    <div>
      Foo 组件
      <Button onClick={resetCount}>resetCount</Button>
    </div>
  )
})

const UseCallback = () => {
  // memo 阻止组件更新，类似于类组件中的 PureComponent 和 shouldComponentUpdate

  const [count, setCount] = useState(0)

  const handleCount = () => {
    setCount(count + 1)
  }

  // const resetCount = () => {
  //   setCount(0)
  // }
  const resetCount = useCallback(() => {
    setCount(0)
  }, [setCount])

  return (
    <div>
      <p>{count}</p>
      <Button onClick={handleCount}>+1</Button>
      <Foo
        resetCount={resetCount}
      ></Foo>
    </div>
  )
}

export default UseCallback
