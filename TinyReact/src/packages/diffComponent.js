import mountElement from "./mountElement"

export default function diffComponent(virtualDOM, oldComponent, oldDOM, container) {
  if (isSameComponent(virtualDOM, oldComponent)) {
  // 是同一个组件 做更新操作

  } else {
  // 不是同一个组件 删除老组件 直接渲染新组件
    mountElement(virtualDOM, container, oldDOM)
  }
}

/**
 * @description 判断组件是否是同一个组件
 * @param {*} virtualDOM 
 * @param {*} oldComponent 
 */
function isSameComponent(virtualDOM, oldComponent) {
  return oldComponent && virtualDOM.type === oldComponent.constructor
}
