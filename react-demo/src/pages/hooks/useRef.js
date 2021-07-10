import React, { useRef } from 'react'
import { Input } from 'antd'

const UseRef = () => {
  const userName = useRef()

  const useNameChange = () => {
    console.log(userName)
  }

  return (
    <div>
      <Input ref={userName} onChange={useNameChange}></Input>
    </div>
  )
}

export default UseRef
