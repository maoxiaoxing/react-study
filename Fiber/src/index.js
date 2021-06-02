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
    return <div>123</div>
  }
}

render(<Greating />, root)
