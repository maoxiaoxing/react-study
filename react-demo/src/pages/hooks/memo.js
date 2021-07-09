import React, { useMemo, useState, memo } from 'react'
import { Button } from 'antd'

// const Foo = () => {
//   console.log('Foo组件渲染了')

//   return (
//     <div>Foo 组件</div>
//   )
// }

const Foo = memo(() => {
  console.log('Foo组件渲染了')

  return (
    <div>Foo 组件</div>
  )
})

const Memo = () => {
  // memo 阻止组件更新，类似于类组件中的 PureComponent 和 shouldComponentUpdate

  const [count, setCount] = useState(0)

  const handleCount = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <p>{count}</p>
      <Button onClick={handleCount}>+1</Button>
      <Foo></Foo>
    </div>
  )
}

export default Memo
