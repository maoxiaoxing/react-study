import isFunction from './isFunction'
import mounNativeElement from './mounNativeElement'
import mountComponent from './mountComponent'

export default function mountElement(virtualDOM, container) {
  // 如果是组件，就渲染组件
  if (isFunction(virtualDOM)) {
    mountComponent(virtualDOM, container)
  } else {
    // 否则就渲染 DOM
    mounNativeElement(virtualDOM, container)
  }
}