import { updateNodeElement } from "../DOM"
import { createTaskQueue, arrified, createStateNode, getTag } from "../Misc"

// 任务队列
const taskQueue = createTaskQueue()
// 要执行的子任务
let subTask = null
// 等待提交
let pendingCommit = null

/**
 * 
 * @param {*} fiber 
 */
const commitAllWork = (fiber) => {
  fiber.effects.forEach((item) => {
    // 更新
    if (item.effectTag === 'update') {
      if (item.type === item.alternate.type) {
        // 节点类型相同
        updateNodeElement(item.stateNode, item, item.alternate)
      } else {
        // 节点类型不同
        item.parent.stateNode.replaceChild(
          item.stateNode,
          item.alternate.stateNode
        )
      }
    } else if (item.effectTag === 'placement') {
      let fiber = item
      let parentFiber = item.parent

      // 类组件不是有效的 DOM 元素
      // 必须向上查找，直到找到普通元素
      while (
        parentFiber.tag === 'class_component' ||
        parentFiber.tag === 'function_component'
      ) {
        parentFiber = parentFiber.parent
      }

      if (fiber.tag === 'host_component') {
        // 为父级添加节点
        parentFiber.stateNode.appendChild(fiber.stateNode)
      }
    }
  })

  // 备份旧的 fiber 节点对象
  fiber.stateNode.__rootFiberContainer = fiber
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
    alternate: task.dom.__rootFiberContainer, // 根节点备份对象
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
  let alternate = null

  if (fiber.alternate && fiber.alternate.child) {
    // 备份节点
    alternate = fiber.alternate.child
  }

  while (index < numberOfEelments) {
    element = arrifiedChildren[index]

    if (element && alternate) {
      newFiber = {
        type: element.type,
        props: element.props,
        tag: getTag(element),
        effects: [],
        effectTag: 'update',
        parent: fiber,
        alternate,
      }

      // 类型相同
      if (element.type === alternate.type) {
        newFiber.stateNode = alternate.stateNode
      } else {
        // 类型不同
        newFiber.stateNode = createStateNode(newFiber)
      }
    } else if (element && !alternate) {
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
    }
    console.log(newFiber)

    // 只有第一个子节点才是子节点 其他的是子节点的兄弟节点
    if (index === 0) {
      fiber.child = newFiber
    } else {
      prevFiber.sibling = newFiber
    }

    if (alternate && alternate.sibling) {
      alternate = alternate.sibling
    } else {
      alternate = null
    }

    prevFiber = newFiber
    index++
  }
}

const executeTask = (fiber) => {
  if (fiber.tag === 'class_component') {
    reconcileChildren(fiber, fiber.stateNode.render())
  } else if (fiber.tag === 'function_component') {
    reconcileChildren(fiber, fiber.stateNode(fiber.props))
  } else {
    reconcileChildren(fiber, fiber.props.children)
  }
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

  // 所有任务执行完毕，等待提交
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