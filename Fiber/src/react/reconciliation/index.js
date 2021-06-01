import { createTaskQueue, arrified, createStateNode, getTag } from "../Misc"

const taskQueue = createTaskQueue()
let subTask = null
let pendingCommit = null

const commitAllWork = (fiber) => {
  fiber.effects.forEach((item) => {
    if (item.effectTag === 'placement') {
      item.parent.stateNode.appendChild(item.stateNode)
    }
  })
}

const getFirstTask = () =>{
  // 从人物队列中获取任务
  const task = taskQueue.pop()
  // 返回最外层节点的 fiber 对象
  return {
    props: task.props,
    stateNode: task.dom,
    tag: 'host_root',
    effects: [],
    child: null,
  }
}

/**
 * 构建子级 fiber 对象
 * @param {*} fiber 
 * @param {*} children 
 */
const reconcileChildren = (fiber, children) => {
  // children 可能是对象也可能是数组 是对象的话，需要将对象转成数组
  const arrifiedChildren = arrified(children)

  let index = 0
  let numberOfEelments = arrifiedChildren.length
  let element = null
  let newFiber = null
  let prevFiber = null

  while (index < numberOfEelments) {
    element = arrifiedChildren[index]
    // 子级 fiber 对象
    newFiber = {
      type: element.type,
      props: element.props,
      tag: getTag(element),
      effects: [],
      effectTag: 'placement',
      parent: fiber,
    }

    newFiber.stateNode = createStateNode(newFiber)

    // 只有第一个子节点才是子节点 其他的是子节点的兄弟节点
    if (index === 0) {
      fiber.child = newFiber
    } else {
      prevFiber.sibling = newFiber
    }

    prevFiber = newFiber
    index++
  }
}

const executeTask = (fiber) => {
  reconcileChildren(fiber, fiber.props.children)
  if (fiber.child) {
    return fiber.child
  }

  let currentExecutelyFiber = fiber

  // 当前 fiber 对象如果有父级的话
  // 有同级的话，返回同级 fiber 对象
  // 没有同级的话，返回当前 fiber 对象的父级
  // 一直循环，直到遍历完所有的节点
  while(currentExecutelyFiber.parent) {
    currentExecutelyFiber.parent.effects = currentExecutelyFiber.parent.effects.concat(
      currentExecutelyFiber.effects.concat([currentExecutelyFiber])
    )
    if (currentExecutelyFiber.sibling) {
      return currentExecutelyFiber.sibling
    }
    currentExecutelyFiber = currentExecutelyFiber.parent
  }

  pendingCommit = currentExecutelyFiber

  console.log(currentExecutelyFiber)
}

const workLoop = (deadline) => {
  // 如果子任务不存在 就去获取子任务
  if (!subTask) {
    subTask = getFirstTask()
  }

  // 当有任务的时候 且 延迟时间大于1
  while (subTask && deadline.timeRemaining() > 1) {
    subTask = executeTask(subTask)
  }

  if (pendingCommit) {
    commitAllWork(pendingCommit)
  }
}

/**
 * 调度任务
 * @param deadline 
 */
const performTask = (deadline) => {
  // 执行任务
  workLoop(deadline)
  // 有任务的时候 或者 任务队列不为空 在浏览器空闲时间接着执行被中断的事件
  if (subTask || !taskQueue.isEmpty()) {
    requestIdleCallback(performTask)
  }
}

export const render = (element, dom) => {
  // 向任务队列中添加任务
  // 指定在浏览器空闲时执行任务

  // 任务就是通过 vdom 对象 构建 fiber 对象
  taskQueue.push({
    dom,
    props: { children: element },
  })
  // 在浏览器空闲的时候执行任务
  requestIdleCallback(performTask)
}