import createDOMElement from './createDOMElement'
import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'
import updateTextNode from './updateTextNode'
import unmountNode from './unmountNode'
import diffComponent from './diffComponent'

/**
 * @description 比较新老DOM
 * @param {*} virtualDOM 
 * @param {*} container 
 * @param {*} oldDOM 
 */
export default function diff(virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
  const oldComponent = oldVirtualDOM && oldVirtualDOM.component
  // 判断 oldDOM 是否存在
  if (!oldDOM) {
    mountElement(virtualDOM, container)
  } else if (virtualDOM.type !== oldVirtualDOM.type && typeof virtualDOM.type !== 'function') { 
    // 如果新旧 DOM 不相等 且节点类型不是一个组件，那么就直接替换
    const newElement = createDOMElement(virtualDOM)
    oldDOM.parentNode.replaceChild(newElement, oldDOM)
  } else if (typeof virtualDOM.type === 'function') { // 如果是一个组件的话
    // 比较新老组件
    diffComponent(virtualDOM, oldComponent, oldDOM, container)
  }  else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
    if (virtualDOM.type === 'text') {
      // 更新内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // 更新元素节点属性
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
    }

    // 1. 将有key属性的子元素放置在一个单独的对象中
    let keyedElements = {}
    const childNodesLen = oldDOM.childNodes.length
    for(let i = 0; i < childNodesLen; i++) {
      const domElement = oldDOM.childNodes[i]
      if (domElement.nodeType === 1) {
        let key = domElement.getAttribute('key')
        if (key) {
          keyedElements[key] = domElement
        }
      }
    }

    const hasNoKey = Object.keys(keyedElements).length === 0
    if (hasNoKey) {
      // 对比子节点
      virtualDOM.children.forEach((child, index) => {
        diff(child, oldDOM, oldDOM.childNodes[index])
      })
    } else {
      // 2. 循环 virtualDOM 的子元素 获取子元素的 key 属性
      virtualDOM.children.forEach((child, index) => {
        const key = child.props.key
        if (key) {
          let domElement = keyedElements[key]
          if (domElement) {
            // 看看当前元素是否是我们期望的元素
            if (oldDOM.childNodes[index] && oldDOM.childNodes[index] !== domElement) {
              // 如果不是，就将 domElement 插入老元素前边，
              oldDOM.insertBefore(domElement, oldDOM.childNodes[index])
            }
          }
        }
      })
    }

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
