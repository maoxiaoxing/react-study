const getTag = (vdom) => {
  if (typeof vdom.type === 'string') {
    return 'host_component'
  }
}

export default getTag
