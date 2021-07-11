import { Button } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom'

// let state

// function useState (initialState) {
//   state = state ? state : initialState
//   function setState (newState) {
//     state = newState
//     console.log(newState)
//     render()
//   }

//   return [state, setState]
// }

let state = []
let setters = []
let stateIndex = 0

function createSetter (index) {
  return function (newState) {
    state[index] = newState;
    render ();
  }
}

function useState (initialState) {
  state[stateIndex] = state[stateIndex] || initialState
  setters.push(createSetter(stateIndex))
  let value = state[stateIndex]
  let setter = setters[stateIndex]
  stateIndex++

  return [value, setter]
}

function render () {
  stateIndex = 0;
  ReactDOM.render(<UseStatePrinciple></UseStatePrinciple>, document.getElementsByClassName('ant-layout-content')[0])
}

const Principle = () => {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('毛小星')

  return (
    <div>
      {count}
      <Button onClick={() => setCount(count + 1)}>setCount</Button>
      {name}
      <Button onClick={() => setName('杨小A')}>setName</Button>
    </div>
  )
}

export default Principle
