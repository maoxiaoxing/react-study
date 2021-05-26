import createDOMElement from "./createDOMElement"
import unmountNode from "./unmountNode"

export default function mounNativeElement(virtualDOM, container, oldDOM) {
  const newElement = createDOMElement(virtualDOM)
  // 判断旧的 oldDOM 是否存在 如果存在 就删除
  if (oldDOM) {
    unmountNode(oldDOM)
  }

  // 将转换之后的 DOM 对象挂载到页面中
  container.appendChild(newElement)

  const component = virtualDOM.component

  if (component) {
    component.setDOM(newElement)
  }
}