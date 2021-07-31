// import React from 'react'

// const Hooks = () => {

//   return (
//     <div>123</div>
//   )
// }

// export default Hooks

import React, { useState } from 'react'
import { Button } from 'antd'

const Demo = () => {
  const [name, setName] = useState('毛小星')
  const [count, setCount] = useState(() => 0)

  return (
    <div>
      <p>{name}</p>
      <Button type="primary" onClick={() => setName('杨秘书')}>setName</Button>
      <p>{count}</p>
      <Button type="primary" onClick={() => setCount((_count) => _count + 1)}>increment</Button>
    </div>
  )
}

export default Demo