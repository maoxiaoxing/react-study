import React, { useMemo, useState } from 'react'
import { Button } from 'antd'

const UseMemo = () => {
  // useMemo 的行为类似Vue中的计算属性，可以检测某个值的变化，根据变化值计算新值
  // useMemo 会缓存计算结果，如果检测值没有发生变化，即使组件重新渲染，也不会重新计算，此行为可以有助于避免在每个渲染上进行昂贵的计算

  const [count, setCount] = useState(0)
  const result = useMemo(() => {
    return count * 2
  }, [count])

  const handleCount = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <p>{count} -- {result}</p>
      <Button onClick={handleCount}>+1</Button>
    </div>
  )
}

export default UseMemo
