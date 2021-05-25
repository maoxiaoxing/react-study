import isFunction from "./isFunction";
import isFunctionComponent from "./isFunctionComponent";
import mounNativeElement from "./mounNativeElement";

export default function mountComponent(virtualDOM, container) {
  let nextVirtualDOM = null
  // 判断罪案是类组件还是函数组件
  if (isFunctionComponent(virtualDOM)) {
    nextVirtualDOM = buildFunctionComponent(virtualDOM)
  } else {
    nextVirtualDOM = buildClassComponent(virtualDOM)
  }
  // 如果编译后的组件返回一个组件，那么就接着编译这个组件
  if (isFunction(nextVirtualDOM)) {
    mountComponent(nextVirtualDOM, container)
  } else {
    // 否则直接渲染节点即可
    mounNativeElement(nextVirtualDOM, container)
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
