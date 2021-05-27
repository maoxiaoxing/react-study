import createDOMElement from "./createDOMElement"
import unmountNode from "./unmountNode"

export default function mounNativeElement(virtualDOM, container, oldDOM) {
  const newElement = createDOMElement(virtualDOM)
  if (oldDOM) {
    console.log(oldDOM)
    container.insertBefore(newElement, oldDOM)
  } else {
    container.appendChild(newElement)
  }

  // 判断旧的 oldDOM 是否存在 如果存在 就删除
  if (oldDOM) {
    unmountNode(oldDOM)
  }

  const component = virtualDOM.component

  if (component) {
    component.setDOM(newElement)
  }
}