import isFunction from "./isFunction";
import isFunctionComponent from "./isFunctionComponent";
import mounNativeElement from "./mounNativeElement";

export default function mountComponent(virtualDOM, container, oldDOM) {
  let nextVirtualDOM = null
  let component = null
  // 判断组件是类组件还是函数组件
  if (isFunctionComponent(virtualDOM)) {
    nextVirtualDOM = buildFunctionComponent(virtualDOM)
  } else {
    nextVirtualDOM = buildClassComponent(virtualDOM)
    component = nextVirtualDOM.component
  }

  // 如果编译后的组件返回一个组件，那么就接着编译这个组件
  if (isFunction(nextVirtualDOM)) {
    mountComponent(nextVirtualDOM, container, oldDOM)
  } else {
    // 否则直接渲染节点即可
    mounNativeElement(nextVirtualDOM, container, oldDOM)
  }

  if (component) {
    // 到这里证明组件挂载完成，可以调用 componentDidMount 声明周期函数
    component.componentDidMount && component.componentDidMount()
    if (component.props && component.props.ref) {
      component.props.ref(component)
    }
  }
}

function buildFunctionComponent (virtualDOM) {
  return virtualDOM.type(virtualDOM.props || {})
}

function buildClassComponent(virtualDOM) {
  const component = new virtualDOM.type(virtualDOM.props || {})
  const nextVirtualDOM = component.render()
  nextVirtualDOM.component = component
  return nextVirtualDOM
}
