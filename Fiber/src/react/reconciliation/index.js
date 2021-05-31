import { createTaskQueue } from "../Misc"
import arrified from '../Misc/Arrified'

const taskQueue = createTaskQueue()
let subTask = null

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
    console.log(element)
    newFiber = {
      type: element.type,
      props: element.props,
      tag: 'host_component',
      effects: [],
      effectTag: 'placement',
      stateNode: null,
      parent: fiber,
    }

    // 只有第一个子节点才是子节点 其他的是子节点的兄弟节点
    if (index === 0) {
      fiber.child = newFiber
    } else {
      prevFiber.silbing = newFiber
    }

    prevFiber = newFiber
    index++
  }
}

const executeTask = (fiber) => {
  reconcileChildren(fiber, fiber.props.children)
  console.log(fiber)
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