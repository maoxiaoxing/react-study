export default function createElement(type, props, ...children) {
  const childElements = [...children].reduce((result, child) => {
    if (typeof child !== 'boolean' && child !== null) {
      if (child instanceof Object) {
        result.push(child)
      } else {
        result.push(createElement('text', { textContent: child }))
      }
    }
    return result
  }, [])

  return {
    type,
    props: Object.assign({ children: childElements }, props),
    children: childElements,
  }
}