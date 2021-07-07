import React, { useState } from 'react'
import { Button } from 'antd'

const UseState = (props) => {
  const [count, setCount] = useState(0)
  const [person, setPerson] = useState({age: 18, name: 'maoxiaoxing'})
  const [coin, setCoin] = useState(() => props.coin || 0)
  const [title, setTitle] = useState(0)

  const handleTitle = () => {
    setTitle((title) => {
      const newTitle = title + 1
      document.title = newTitle
      return newTitle
    })
  }
 
  const handlePerson = () => {
    setPerson({...person, name: 'yangxiaoA'})
    // person['hobby'] = '玩'
    // setPerson(person)
  }

  return (
    <div>
      <p>{count}</p>
      <Button onClick={() => setCount(count + 1)}>+ 1</Button>
      <p>----------------</p>
      <p>年龄：{person.age}名字：{person.name}</p>
      <Button onClick={handlePerson}>setPerson</Button>
      <p>----------------</p>
      <p>{coin}</p>
      <Button onClick={() => setCoin(coin + 1)}>+ 1</Button>
      <p>------- 异步 ---------</p>
      <Button onClick={handleTitle}>setTitle</Button>

    </div>
  )
}

export default UseState
