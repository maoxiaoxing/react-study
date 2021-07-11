import { useEffect, useState } from 'react'

const usePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const getPosition = (e) => {
    setPosition({
      x: e.pageX,
      y: e.pageY,
    })
  }

  useEffect(() => {
    window.addEventListener('mousemove', getPosition)

    return () => {
      window.removeEventListener('mousemove', getPosition)
    }
  }, [])

  return position
}

export default usePosition
