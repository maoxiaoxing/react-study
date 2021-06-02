import React, { render, Component } from './react'

const root = document.getElementById('root')

const jsx = (
  <div>
    <p>Hello React</p>
    <p>Hello Fiber</p>
  </div>
)

// render(jsx, root)

class Greating extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div>{this.props.title} 类组件</div>
  }
}

render(<Greating title="Hello" />, root)

function FnComponent(props) {
  return (
    <div>{props.title} 函数组件</div>
  )
}

// render(<FnComponent title="Hello" />, root)

