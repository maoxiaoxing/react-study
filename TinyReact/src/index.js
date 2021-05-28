import TinyReact from './packages'

const root = document.getElementById('root')

const virtualDOM = (
  <div className="container">
    <h1>你好 Tiny React</h1>
    <h2 data-test="test">(编码必杀技)</h2>
    <div>
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <span>这是一段内容</span>
    <button onClick={() => alert("你好")}>点击我</button>
    <h3>这个将会被删除</h3>
    2, 3
    <input type="text" value="13" />
  </div>
)

const modifyDOM = (
  <div className="container">
    <h1>你好 Tiny React</h1>
    <h2 data-test="test">(编码必杀技)</h2>
    <div>
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <span>这是一段被修改过的内容</span>
    <button onClick={() => alert("你好！！")}>点击我</button>
    {/* <h6>这个将会被删除</h6> */}
    2, 3
    <input type="text" />
  </div>
)

// TinyReact.render(virtualDOM, root)

// setTimeout(() => {
//   TinyReact.render(modifyDOM, root)
// }, 2000)

function Demo() {
  return <div>hello</div>
}

function Heart(props) {
  return (
    <div>
      {props.title}
      &hearts; <Demo></Demo>
    </div>
  )
}

// TinyReact.render(<Heart title="Hello React" />, root)
// console.log(virtualDOM)

class Alert extends TinyReact.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: "Default Title"
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({ title: "Changed Title" })
  }

  render() {
    return (
      <div>
        Hello React
        {this.props.name}
        {this.props.age}
        <div>
          {this.state.title}
          <button onClick={this.handleClick}>改变Title</button>
        </div>
      </div>
    )
  }
}

// TinyReact.render(<Alert name="毛小星" age={20}></Alert>, root)

// setTimeout(() => {
//   // TinyReact.render(<Alert name="李四" age={50} />, root)
//   TinyReact.render(<Heart title="我是Heart组件" />, root)
// }, 2000)

class DemoRef extends TinyReact.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    // console.log(this.input.value)
    console.log(this.input)
    console.log(this.alert)
  }
  componentDidMount() {
    console.log("componentDidMount")
  }
  componentWillUnmount() {
    console.log("componentWillUnmount")
  }
  render() {
    return (
      <div>
        <input type="text" ref={input => (this.input = input)} />
        <button onClick={this.handleClick}>按钮</button>
        <Alert ref={alert => (this.alert = alert)} name="张三" age={20} />
      </div>
    )
  }
}

// TinyReact.render(<DemoRef />, root)

class KeyDemo extends TinyReact.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        {
          id: 1,
          name: "张三"
        },
        {
          id: 2,
          name: "李四"
        },
        {
          id: 3,
          name: "王五"
        },
        {
          id: 4,
          name: "赵六"
        }
      ]
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    const newState = JSON.parse(JSON.stringify(this.state))
    // newState.persons.push(newState.persons.shift())
    // newState.persons.splice(1, 0, { id: 100, name: "李逵" })
    newState.persons.pop()
    this.setState(newState)
  }
  render() {
    return (
      <div>
        <ul>
          {this.state.persons.map(person => (
            <li key={person.id}>
              {person.name}
              <DemoRef />
            </li>
          ))}
        </ul>
        <button onClick={this.handleClick}>按钮</button>
      </div>
    )
  }
}

TinyReact.render(<KeyDemo />, root)
