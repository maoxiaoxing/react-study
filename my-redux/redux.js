
function createStore(reducer, preloadedState) {
  // 约束 reducer 参数类型
  if (typeof reducer !== 'function') throw new Error('reducer必须是函数')

  // store 对象存储的状态
  let currentState = preloadedState
  // 存放订阅者
  const currentListeners = []

  // 获取状态
  function getState() {
    return currentState
  }

  // 触发action
  function dispatch(action) {
    // 计算新的状态
    currentState = reducer(currentState, action)

    // 调用所有订阅者
    for(let i = 0; i < currentListeners.length; i++) {
      // 获取订阅者
      const listener = currentListeners[i]
      listener()
    }
  }

  // 订阅状态
  function subscribe(listener) {
    currentListeners.push(listener)
  }

  return {
    getState,
    dispatch,
    subscribe,
  }
}
