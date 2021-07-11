import React, { useEffect, useState } from 'react'
import {usePosition} from '../../hooks'

const Position = () => {
  // const [position, setPosition] = useState({ x: 0, y: 0 })

  // const getPosition = (e) => {
  //   setPosition({
  //     x: e.pageX,
  //     y: e.pageY,
  //   })
  // }

  // useEffect(() => {
  //   window.addEventListener('mousemove', getPosition)

  //   return () => {
  //     window.removeEventListener('mousemove', getPosition)
  //   }
  // }, [])

  const position = usePosition()

  return (
    <div>
      <p>鼠标横坐标：{position.x}</p>
      <p>鼠标纵坐标：{position.y}</p>
    </div>
  )
}

export default Position
