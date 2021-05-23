import isFunction from "./isFunction"

export default function isFunctionComponent(virtualDOM) {
  const { type } = virtualDOM
  return type && isFunction(virtualDOM) && !(type.prototype && type.prototype.render)
}