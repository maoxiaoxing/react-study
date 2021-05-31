import { createTaskQueue } from "../Misc"

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

const executeTask = (fiber) => {

}

const workLoop = () => {
  // 如果子任务不存在 就去获取子任务
  if (!subTask) {
    subTask = getFirstTask()
  }

  // 当有任务的时候 且 延迟时间大于1
  while (subTask && deadline.timeRamaining() > 1) {
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