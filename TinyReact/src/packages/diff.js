import mountElement from './mountElement'

export default function diff(virtualDOM, container, oldDOM) {
  if (!oldDOM) {
    mountElement(virtualDOM, container)
  }
}