import createDOMElement from "./createDOMElement"

export default function mounNativeElement(virtualDOM, container) {
  const newElement = createDOMElement(virtualDOM)
  // 将转换之后的 DOM 对象挂载到页面中
  container.appendChild(newElement)
}