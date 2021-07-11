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

function getType (obj) {
  const type = Object.prototype.toString.call(obj)
  return type.substring(8, type.length - 1)
}

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
  effectIndex = 0;
  ReactDOM.render(<Principle></Principle>, document.getElementsByClassName('ant-layout-content')[0])
}

let prevDepsAry = [];
let effectIndex = 0;

function useEffect (callBack, depsAry) {
  if (getType(callBack) !== 'Function') throw new Error('useEffect的第一个参数必须是函数')

  if (!depsAry) {
    callBack()
  } else {
    if (getType(depsAry) !== 'Array') throw new Error('useEffect第二个参数必须是数组')
    let prevDeps = prevDepsAry[effectIndex];
    let hasChanged = prevDeps ? depsAry.every((dep, index) => dep === prevDeps[index]) === false : true;
    if (hasChanged) {
      callBack()
    }

    prevDepsAry[effectIndex] = depsAry
    effectIndex++
  }
}

const Principle = () => {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('毛小星')

  useEffect(() => {
    console.log(12)
  }, [count])

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
