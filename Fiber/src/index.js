import React, { render, Component } from './react'

const root = document.getElementById('root')

const jsx = (
  <div>
    <p>Hello React</p>
    <p>Hello Fiber</p>
  </div>
)

// render(jsx, root)

// setTimeout(() => {
//   const jsx = (
//     <div>
//       <div>哈哈哈</div>
//       {/* <p>Hello Fiber</p> */}
//     </div>
//   )
//   render(jsx, root)
// }, 2000)

class Greating extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '毛小星'
    }
  }

  changeName() {
    console.log(this)
    this.setState({
      name: '杨小A'
    })
  }

  render() {
    return <div>
      {this.props.title} 类组件
      {this.state.name}
      <button onClick={() => this.changeName()}>切换名字</button>
    </div>
  }
}

render(<Greating title="Hello" />, root)

function FnComponent(props) {
  return (
    <div>{props.title} 函数组件</div>
  )
}

// render(<FnComponent title="Hello" />, root)

