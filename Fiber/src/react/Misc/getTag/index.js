import { Component } from "../../Component"

const getTag = (vdom) => {
  if (typeof vdom.type === 'string') {
    return 'host_component'
  } else if (Object.getPrototypeOf(vdom.type) === Component) {
    return 'class_component'
  } else {
    return 'function_component'
  }
}

export default getTag
