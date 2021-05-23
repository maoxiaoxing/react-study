export default function updateNodeElement(newElement, virtualDOM) {
  const newProps = virtualDOM.props
  Object.keys(newProps).forEach((propName) => {
    const newPropsValue = newProps[propName]
    // 判断属性是否是事件属性 例如 onClick -> click
    if (propName.slice(0, 2) === 'on') {
      // 截取事件名称
      const eventName = propName.toLocaleLowerCase().slice(2)
      // 为元素添加事件
      newElement.addEventListener(eventName, newPropsValue)
    } else if (propName === 'value' || propName === 'checked') {
      newElement[propName] = newPropsValue
    } else if (propName !== 'children') {
      if (propName === 'className') {
        newElement.setAttribute('class', newPropsValue)
      } else {
        newElement.setAttribute(propName, newPropsValue)
      }
    }
  })
}