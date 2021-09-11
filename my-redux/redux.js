
function createStore(reducer, preloadedState, enhancer) {
  // 约束 reducer 参数类型
  if (typeof reducer !== 'function') throw new Error('reducer必须是函数')

  // 处理可选参数 enhancer
  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('enhancer必须是一个函数')
    }

    return enhancer(createStore)(reducer, preloadedState)
  }

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
    // 判断 action 是否是对象
    if (!isPlainObject(action)) throw new Error('action必须为对象')
    // 对象中是否有 type 属性
    if (!action.type) throw new Error('action对象中必须有type属性')
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

// 判断参数是否为对象
function isPlainObject (obj) {
  // 排除基本类型和null
  if (typeof obj !== 'object' || obj === null) return false

  // 区分数组和对象
  var proto = obj
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }
  return Object.getPrototypeOf(obj) === proto
}

function applyMiddleware(...middlewares) {
  // 返回 enhancer 函数
  return function (createStore) {
    return function(reducer, preloadeState) {
      // 创建 stroe
      const store = createStore(reducer, preloadeState)
      // 简化版store
      const middlewareAPI = {
        getState: store.getState,
        dispatch: store.dispatch,
      }
      const chain = middlewares.map(middleware => middleware(middlewareAPI))
      const getDispatch = compose(...chain)
      const dispatch = getDispatch(store.dispatch)

      return {
        ...store,
        dispatch,
      }
    }
  }
}

function compose() {
  const funcs = [...arguments]
  return function (dispatch) {
    for(let i = funcs.length - 1; i >= 0; i--) {
      const func = funcs[i]
      func && (dispatch = func(dispatch))
    }
    return dispatch
  }
}

function bindActionCreators(actionCreators, dispatch) {
  const boundActionsCreators = {}

  for(const key in actionCreators) {
    boundActionsCreators[key] = function () {
      dispatch(actionCreators[key]())
    }
  }

  return boundActionsCreators
}
