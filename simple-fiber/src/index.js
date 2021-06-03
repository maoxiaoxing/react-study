// import ReactDOM from "react-dom"
// import App from "./App"

// ReactDOM.render(<App />, document.getElementById("root"))

// const jsx = (
//   <div id="a1">
//     <div id="b1">
//       <div id="c1"></div>
//       <div id="c2"></div>
//     </div>
//     <div id="b2"></div>
//   </div>
// )
// function render(vdom, container) {
//   // 创建元素
//   const element = document.createElement(vdom.type)
//   // 为元素添加属性
//   Object.keys(vdom.props)
//     .filter(propName => propName !== "children")
//     .forEach(propName => (element[propName] = vdom.props[propName]))
//   // 递归创建子元素
//   if (Array.isArray(vdom.props.children)) {
//     vdom.props.children.forEach(child => render(child, element))
//   }
//   // 将元素添加到页面中
//   container.appendChild(element)
// }

// render(jsx, document.getElementById("root"))

const jsx = (
  <div id="a1">
    <div id="b1">
      <div id="c1"></div>
      <div id="c2"></div>
    </div>
    <div id="b2"></div>
  </div>
)

const container = document.getElementById("root")

// 构建根元素的 Fiber 对象
const workInProgressRoot = {
  stateNode: container,
  props: {
    children: [jsx]
  }
}

// 下一个要执行的任务
let nextUnitOfWork = workInProgressRoot

function workLoop(deadline) {
  // 1. 是否有空余时间
  // 2. 是否有要执行的任务
  while (nextUnitOfWork && deadline.timeRemaining() > 0) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }
  // 表示所有的任务都已经执行完成了
  if (!nextUnitOfWork) {
    // 进入到第二阶段 执行DOM
    commitRoot()
  }
}

function performUnitOfWork(workInProgressFiber) {
  // 1. 创建 DOM 对象并将它存储在 stateNode 属性
  // 2. 构建当前 Fiber 的子级 Fiber
  // 向下走的过程
  beginWork(workInProgressFiber)
  // 如果当前Fiber有子级
  if (workInProgressFiber.child) {
    // 返回子级 构建子级的子级
    return workInProgressFiber.child
  }

  while (workInProgressFiber) {
    // 构建链表
    completeUnitOfWork(workInProgressFiber)

    // 如果有同级
    if (workInProgressFiber.sibling) {
      // 返回同级 构建同级的子级
      return workInProgressFiber.sibling
    }
    // 更新父级
    workInProgressFiber = workInProgressFiber.return
  }
}

function beginWork(workInProgressFiber) {
  // 1. 创建 DOM 对象并将它存储在 stateNode 属性
  if (!workInProgressFiber.stateNode) {
    // 创建 DOM
    workInProgressFiber.stateNode = document.createElement(
      workInProgressFiber.type
    )
    // 为 DOM 添加属性
    for (let attr in workInProgressFiber.props) {
      if (attr !== "children") {
        workInProgressFiber.stateNode[attr] = workInProgressFiber.props[attr]
      }
    }
  }
  // 2. 构建当前 Fiber 的子级 Fiber
  if (Array.isArray(workInProgressFiber.props.children)) {
    let previousFiber = null
    workInProgressFiber.props.children.forEach((child, index) => {
      let childFiber = {
        type: child.type,
        props: child.props,
        effectTag: "PLACEMENT",
        return: workInProgressFiber
      }
      if (index === 0) {
        workInProgressFiber.child = childFiber
      } else {
        previousFiber.sibling = childFiber
      }
      previousFiber = childFiber
    })
  }
  // console.log(workInProgressFiber)
}

function completeUnitOfWork(workInProgressFiber) {
  // 获取当前 Fiber 的父级
  const returnFiber = workInProgressFiber.return
  // 父级是否存在
  if (returnFiber) {
    // 需要执行 DOM 操作
    if (workInProgressFiber.effectTag) {
      if (!returnFiber.lastEffect) {
        returnFiber.lastEffect = workInProgressFiber.lastEffect
      }

      if (!returnFiber.firstEffect) {
        returnFiber.firstEffect = workInProgressFiber.firstEffect
      }

      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = workInProgressFiber
      } else {
        returnFiber.firstEffect = workInProgressFiber
      }
      returnFiber.lastEffect = workInProgressFiber
    }
  }
}

function commitRoot() {
  let currentFiber = workInProgressRoot.firstEffect
  while (currentFiber) {
    currentFiber.return.stateNode.appendChild(currentFiber.stateNode)
    currentFiber = currentFiber.nextEffect
  }
}

// 在浏览器空闲的时候执行任务
requestIdleCallback(workLoop)
