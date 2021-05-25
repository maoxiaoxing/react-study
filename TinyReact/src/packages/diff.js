import createDOMElement from './createDOMElement'
import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'
import updateTextNode from './updateTextNode'
import unmountNode from './unmountNode'

export default function diff(virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
  // 判断 oldDOM 是否存在
  if (!oldDOM) {
    mountElement(virtualDOM, container)
  } else if (virtualDOM.type !== oldVirtualDOM.type && typeof virtualDOM !== 'function') { 
    // 如果新旧 DOM 不相等，那么就直接替换
    const newElement = createDOMElement(virtualDOM)
    oldDOM.parentNode.replaceChild(newElement, oldDOM)
  } else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
    if (virtualDOM.type === 'text') {
      // 更新内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // 更新元素节点属性
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
    }

    // 对比子节点
    virtualDOM.children.forEach((child, index) => {
      diff(child, oldDOM, oldDOM.childNodes[index])
    })

    // 删除节点
    // 获取旧的节点
    let oldChildNodes = oldDOM.childNodes
    // 判断旧的节点的数量
    if (oldChildNodes.length > virtualDOM.children.length) {
      // 如果旧的节点长度大于新节点长度
      // 有节点需要被删除
      for (let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
        unmountNode(oldChildNodes[i])
      }
    }
  }
}