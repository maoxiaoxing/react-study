import { Button } from 'antd'
import React, { useEffect, useState } from 'react'

let isMount = false

const Rule = () => {
  let name, age, hobby, setName, setAge, setHobby;

  // console.log(isMount, 'isMount')

  if (!isMount) {
    // eslint-disable-next-line
    [name, setName] = useState('毛小星');
    // eslint-disable-next-line
    [age] = useState('18');
    isMount = true;
  }
  [hobby, setHobby] = useState('吃小熊饼干，看动画片');

  console.log(hobby, 'hobby');
  console.log(age, 'age');

  return (
    <div>
      { name ? <p>姓名：{name}</p> : null }
      { age ? <p>年龄：{age}</p> : null }
      <p>爱好：{hobby}</p>
      <Button onClick={() => setName('杨小A')}>修改姓名</Button>
    </div>
  )
}

export default Rule
