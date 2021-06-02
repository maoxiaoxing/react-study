export default function updateNodeElement(newElement, virtualDOM, oldVirtualDOM) {
  const newProps = virtualDOM.props || {}
  const oldProps = oldVirtualDOM && oldVirtualDOM.props || {}

  if (virtualDOM.type === 'text') {
    if (newProps.textContent !== oldProps.textContent) {
      if (virtualDOM.parent.type !== oldVirtualDOM.parent.type) {
        // 父级节点不同 将当前节点插入父级节点
        virtualDOM.parent.stateNode.appendChild(
          document.createTextNode(newProps.textContent),
        )
      } else {
        // 父级节点相同的话，就直接替换
        virtualDOM.parent.stateNode.replaceChild(
          document.createTextNode(newProps.textContent),
          oldVirtualDOM.stateNode
        )
      }
    }
    return 
  }

  Object.keys(newProps).forEach((propName) => {
    const newPropsValue = newProps[propName]
    const oldPropsValue = oldProps[propName]
    if (newPropsValue !== oldPropsValue) {
      // 判断属性是否是事件属性 例如 onClick -> click
      if (propName.slice(0, 2) === 'on') {
        // 截取事件名称
        const eventName = propName.toLocaleLowerCase().slice(2)
        // 为元素添加事件
        newElement.addEventListener(eventName, newPropsValue)

        if (oldPropsValue) {
          newElement.removeEventListener(eventName, oldPropsValue)
        }
      } else if (propName === 'value' || propName === 'checked') {
        newElement[propName] = newPropsValue
      } else if (propName !== 'children') {
        if (propName === 'className') {
          newElement.setAttribute('class', newPropsValue)
        } else {
          newElement.setAttribute(propName, newPropsValue)
        }
      }
    }
  })

  // 判断属性被删除的情况
  Object.keys(oldProps).forEach((propName) => {
    const newPropsValue = newProps[propName]
    const oldPropsValue = oldProps[propName]
    if (!newPropsValue) {
      // 属性被删除了
      if (propName.slice(0, 2) === 'on') {
        const eventName = propName.toLowerCase().slice(2)
        newElement.removeEventListener(eventName, oldPropsValue)
      } else if (propName !== 'children') {
        newElement.removeAttribute(propName)
      }
    }
  })
}