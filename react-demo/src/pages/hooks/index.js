// import React from 'react'

// const Hooks = () => {

//   return (
//     <div>123</div>
//   )
// }

// export default Hooks

// import React, { useState } from 'react'
// import { Button } from 'antd'

// const Demo = () => {
//   const [name, setName] = useState('毛小星')
//   const [count, setCount] = useState(() => 0)
//   // setCount(2)

//   return (
//     <div>
//       <p>{name}</p>
//       <Button type="primary" onClick={() => setName('杨秘书')}>setName</Button>
//       <p>{count}</p>
//       <Button type="primary" onClick={() => setCount((_count) => _count + 1)}>increment</Button>
//     </div>
//   )
// }

import React, { useState, useEffect } from 'react'
import { Button } from 'antd'

const userMap = new Map([
  ['9527', '毛小星'],
  ['9528', '杨秘书'],
])

const Demo = () => {
  const [id1, setName] = useState('9527')
  const [id2, setName] = useState('9528')
  
  const getName = (_id) => {
    return userMap.get(_id)
  }

  const makeFriend = (_id1, _id2) => {

    return `${_name1} 和 ${_name2} 变成了好朋友`
  }

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