import diff from "./diff"

export default class Component {
  constructor(props) {
    this.props = props
  }

  setState(state) {
    this.state = Object.assign({}, this.state, state)
    // 获取最新的需要渲染的 virtualDOM 对象
    const virtualDOM = this.render()
    // 获取旧的 virtualDOM 对象进行对比
    const oldDOM = this.getDOM()
    const container = oldDOM.parentNode
    diff(virtualDOM, container, oldDOM)
  }
  setDOM(dom) {
    this._dom = dom
  }
  getDOM() {
    return this._dom
  }
}