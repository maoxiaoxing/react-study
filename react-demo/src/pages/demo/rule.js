import { Button } from 'antd'
import React, { useEffect, useState } from 'react'

let isMount = false

const Rule = () => {
  // const [name, setName] = useState('毛小星')
  // const [age, setAge] = useState('18')
  const [hobby, setHobby] = useState('吃小熊饼干，看动画片')

  if (isMount) {
    const [name, setName] = useState('毛小星')
    const [age, setAge] = useState('18')
  }

  useEffect(() => {
    isMount = true
  }, [])

  return (
    <div>
      <p>{name}</p>
      <p>{age}</p>
      <p>{hobby}</p>
      <Button onClick={() => setName('杨小A')}>修改姓名</Button>
    </div>
  )
}

export default Rule
