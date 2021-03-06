# Redux核心概念及其原理

## Redux 简介

Redux 最初是由俄罗斯的程序员 Dan Abramov 为了演讲而完成的，Redux 是针对 JavaScript 应用程序的可预测状态管理器，它将 Flux 与函数式编程结合在一起，现如今已经是市面上最流行的状态管理器之一。
众所周知，Redux 的最佳伴侣就是 React，但是其实你可以在很多前端框架中使用它，它的体积很小，但是却有着非常强大的功能，你可以使用很多中间件来扩展 Redux。
那么我们什么时候需要 Redux 呢？

如果你需要在嵌套很深的 React 组件之间进行数据交互或者兄弟组件之间进行数据交互，那么 Redux 无疑是一个比较好的选择。

Redux 的创造者 Dan Abramov 说过一句话：
> "只有遇到 React 实在解决不了的问题，你才需要 Redux 。"

如果你不知道是否需要使用到 Redux ，那么你就可以不使用它。

## Redux 的工作流程

![](https://img2020.cnblogs.com/blog/1575596/202109/1575596-20210912154701678-1908295301.png)

- Store
Store 实际就是一个对象，它存储的就是 Redux 中所有的状态

- Reducer
Reducer 是一个函数，它用来向 Store 中存储以及更新状态

- Actions
Actions 实际就是一个对象，它有一个固定的属性 type，这个 type 就是用来描述怎样操作状态的

- View
View 即视图，HTML 页面

在 Redux 中，所有的状态都存储在了 Store 中，Redux 中的数据都是单向的，所以视图是不能直接操作状态的。如果想要操作状态，那么视图层就必须通过 dispatch 触发 Action，然后 Reducer 中接收 Action，再根据 Action 中的 type 属性处理状态，还要返回处理之后的状态，状态发生改变后，再通过 subscribe 函数同步给视图，这就是 Redux 的基本工作流程。

## Redux 的基本使用

了解了 Redux 的基本工作流程，下面我们来看看怎样在项目中使用 Redux，由于本篇文章不是讲解 React 怎样搭建的，所以你需要准备一个 React 项目，接下来我们需要下载 redux 和 react-redux，react-redux 能够让 React 和 Redux 更完美的结合起来。

```bash
npm install redux react-redux --save
```

在 React 中使用 Redux，我们每次改变数据肯定就不能像上面那样去通过 subscribe 去通过给视图，因为这样太麻烦了。在每次改变数据之后，react-redux 实际上就帮助我们去更新视图，我们来看看简化之后的 Redux 工作流程。

![](https://img2020.cnblogs.com/blog/1575596/202109/1575596-20210912194231293-1123017682.png)

1. 首先组件需要通过 dispatch 去触发 Action
2. Store 接收 Action 并将 Action 分发给 Reducer
3. Reducer 根据 Action 中的 type 对状态进行处理，并将处理后的状态返回给 Store
4. 组件订阅了 Store 中的状态，Store 中的状态更新会通过 react-redux 同步到组件

## 使用 redux 实现计数器

我们下载好了 redux 之后，可以尝试用 redux 去实现一个简单的计数器案例，即我们在 store 中保存一个 count，然后使用 redux 对其进行加减。

store 都是通过 redux 中的一个 api createStore 去创建的，它必须接受一个 reducer 作为参数

reducer 有两个参数：
- 第一个是初始化的状态 initialState
- 第二个保存怎样操作 state 的 action

### 定义 Action 常量

我们首先将 Action 的 type 的常量提取出来，方便我们统一管理，我们定义一个 increment 代表对 count 的增操作，decrement 代表对 count 的减操作

```js
// \src\store\const\index.js

export const INCREMENT = 'increment';
export const DECREMENT = 'decrement';
```

### 创建 Action

接下来我们开始定义 Action，action 有一个参数 payload 即传进来的操作状态值，它需要返回一个记录操作 state 的对象

```js
// src\store\actions\count.js
import { INCREMENT, DECREMENT } from "../const";

export const increment = payload => ({type: INCREMENT, payload});
export const decrement = payload => ({type: DECREMENT, payload});
```

### 创建 Reducer

Reducer 是用来计算或处理状态的，它接收两个参数：
- 第一个参数是初始化的 state
- 第二个是 action

你可以在 Reducer 根据 action 中的 type 属性对 state 进行不同的处理，但是最后一定要返回所有的状态。

```js
// src\store\reducers\count.js

const initialState = {
  count: 0
}

const CounterReducer = (state = initialState, action) => {
  switch(action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + action.payload,
      }
    case DECREMENT:
      return {
        ...state,
        count: state.count - action.payload
      }
    default: 
      return state;
  }
}

export default CounterReducer
```

### 创建 Store

我们使用 redux 中的 createStore 来创建 store 容器，createStore 可以接收一个 Reducer 作为参数，调用 createStore 会返回 store

```js
// src\store\index.js

import { createStore } from 'redux'
import CounterReducer from './reducers/count'

export const store = createStore(CounterReducer)
```

### Provider 和 connnect

正常我们在改变了 redux 中的值时，需要使用 store.substrict 去订阅通知视图改变，例如像下面这样

```jsx
// src\index.js

import React from 'react';
import './index.css';
import { store } from './store'
import Counter from './pages/redux-demo/count'

store.subscribe(() => {
  ReactDOM.render(
    <Counter />,
    document.getElementById('root')
  );
})

ReactDOM.render(
  <Counter />,
  document.getElementById('root')
);
```

上面这样通过手动订阅改变视图会有几个问题，很难订阅多个组件，而且写起来很不优雅。为了解决这些问题，redux-react 为了提供了更方便的解决方案

```js
// src\index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MyLayout from './components/Layout'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <BrowserRouter>
    <Provider store={store}>
      <MyLayout></MyLayout>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
```

我们将 store 通过 react-redux 提供的 Provider 组件全局注入，这样我们就能在下面所有的组件中使用 store 了，当然到这一步还没完，在 Counter 组件中我们还需要做一些改动，才能获取到 store 中的内容

```js
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as couterActions from '../../store/actions/count'

const Counter = (props) => {
  const {
    count,
    increment,
    decrement,
  } = props

  return (
    <div>
      <button onClick={() => increment(10)}>+</button>
      <span>{count}</span>
      <button onClick={() => decrement(10)}>-</button>
    </div>
  )
}

const mapStateToProps = state => ({
  count: state.counter.count
});

const mapDispatchToProps = dispatch => bindActionCreators(couterActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
```

上面我们将 Counter 组件通过 connect 改造了一下，那么 connect 有什么作用呢？

- connect 会帮助我们自动订阅 store， 当 store 中的状态发生改变的时候，会自动重新渲染组件
- connect 可以获取 store 中的状态，将状态通过 props 属性映射给组件
- connect 可以让我们在组件中获取 dispatch

而 bindActionCreators 实际就帮助我们去创建 一个函数，它内部会自动调用 dispatch 帮助我们将 action 传入 Reducer

### 拆分合并 Reducer

上面的 Reducer 文件中，我们使用了 switch 语句对不同的 state 的操作做了区分，但是一旦我们状态多了起来，我们的 case 就需要维护很多条件，这显然是不好的。或者我们想通过不同的 Reducer 去处理不同的状态，目前这种写法是没法做到的，redux 提供的 combineReducers 方法能够帮助我们合并 Reducer，这样就解决了上面的问题。

```js
// src\store\reducers\index.js

import { combineReducers } from 'redux'
import CounterReducer from '../reducers/count'

export default combineReducers({
  counter: CounterReducer,
  ...其他 Reducer
})
```

合并完 Reducer 之后，我们还需要在 store/index.js 文件中做一些修改

```js
import { createStore, applyMiddleware } from 'redux'
import AllReducer from './reducers'

export const store = createStore(AllReducer)
```

Reducer 中的 switch 语句看起来显得有些繁琐，所以我们可以通过 [redux-actions](https://www.npmjs.com/package/redux-actions) 这个插件来简化一下

```bash
npm install redux-actions -S
```

```js
// src\store\reducers\count.js
import { handleActions as createReducer } from 'redux-actions'
import { increment, decrement } from '../actions/count'

const initialState = {
  count: 0
}

const handleIncrement = (state, action) => ({count: state.count + action.payload})
const handleDecrement = (state, action) => ({count: state.count - action.payload})

const CounterReducer = createReducer({
  [increment]: handleIncrement,
  [decrement]: handleDecrement,
}, initialState)

export default CounterReducer
```

这样代码是不是就看起来简洁多了

redux-actions 还同样提供了简化 action 的 api

```js
import { INCREMENT, DECREMENT, INCREMENT_ASYNC } from "../const";
import { createAction } from 'redux-actions'

// export const increment = payload => ({type: INCREMENT, payload});
// export const decrement = payload => ({type: DECREMENT, payload});
export const increment = createAction(INCREMENT)
export const decrement = createAction(DECREMENT)
```

这样在创建 action 的时候，代码也简洁了不少

### Redux 中间件

Redux 的中间件能够扩展 Redux 应用程序，中间件其实就是一个函数，之前我们的 Action 都是直接被 Reducer 去处理的，而加入了中间件之后，Action 就会首先被中间件接收到，当中间件处理完这个 Action 之后，再将 Action 交给 Reducer 去处理。

![](https://img2020.cnblogs.com/blog/1575596/202109/1575596-20210920081901627-829861461.png)

#### 开发 Redux 中间件

Redux 中间件其实是一个比较简单的概念，下面就是一个 logger 的中间件，用来打印 store 和 action 信息的

```js
// src\store\middleware\logger.js

export default store => next => action => {
  console.log(store, action)
  next(action)
}
```

中间件其实就是一个柯里化的函数
- 中间件的第一层函数会接收一个 store 为参数，然后会返回一个函数
- 第二层函数会接收一个 next 函数作为参数，其实 next 就是下一个中间件函数或者 reducer 函数，然后还会返回一个函数
- 第三层函数会接收一个 action 作为参数

这样你就可以利用 store 和 action 去处理相应的逻辑

#### 注册中间件

createStore 的第一个参数接收 Reducer 的，它还有第二个参数，是用来接收中间件的，而 redux 提供的 applyMiddleware 就是用来注册中间件的

```js
// src\store\index.js

import { createStore, applyMiddleware } from 'redux'
import AllReducer from './reducers'
import LoggerMiddleware from './middleware/logger'

export const store = createStore(AllReducer, applyMiddleware(
  LoggerMiddleware,
))
```

这样我们就实现了一个简单的中间件

#### 使用中间件实现异步

在实际的开发中，我们常常需要在 Action 中进行异步处理，Redux 本身是不支持异步的，但是我们能通过中间件去实现异步处理
正常的 Action 会返回一个对象，我们可以开发一个 thunk 中间件，那么我们就可以在中间件中判断 Action 如果是一个函数的话，那么就是异步函数

首先我们在 const 文件新增一个异步常量

```js
// src\store\const\index.js
export const INCREMENT = 'increment';
export const DECREMENT = 'decrement';
// 异步常量
export const INCREMENT_ASYNC = 'increment_async';
```

然后我们在 action 文件中，新增一个异步 Action，我们用 setTimeout 来模拟异步函数调用，延迟两秒增加数字

```js
// src\store\actions\count.js
import { INCREMENT, DECREMENT, INCREMENT_ASYNC } from "../const";
import { createAction } from 'redux-actions'

// export const increment = payload => ({type: INCREMENT, payload});
// export const decrement = payload => ({type: DECREMENT, payload});
export const increment = createAction(INCREMENT)
export const decrement = createAction(DECREMENT)

export const increment_async = (payload) => dispatch => {
  setTimeout(() => {
    dispatch(increment(payload))
  }, 2000);
}
```

接下来我们就可以编写 thunk 中间件了，判断 action 是否是一个 function，如果是的话，就直接执行 action，否则就正常执行下一个中间件

```js
// src\store\middleware\thunk.js

export default store => next => action => {
  if (typeof action === 'function') {
    return action(store.dispatch)
  }
  next(action)
}
```

最终我们将我们写的中间件注册一下就可以了

```js
import { createStore, applyMiddleware } from 'redux'
import AllReducer from './reducers'
import LoggerMiddleware from './middleware/logger'
import ThunkMiddleware from './middleware/thunk'

export const store = createStore(AllReducer, applyMiddleware(
  LoggerMiddleware,
  ThunkMiddleware,
))
```

这样通过 thunk 中间件，我们就能实现一个异步 Action 了

#### redux-thunk 中间件

redux-thunk 和我们所写的 thunk 中间件是一样的，它是可以在 Redux 的工作流程中使用异步的，首先我们需要下载 redux-thunk

```bash
npm install redux-thunk -S
```

然后基于上面的代码，我们只需要在注册中间件的时候将我们自己写的 thunk 中间件替换成 redux-thunk 即可

```js
import { createStore, applyMiddleware } from 'redux'
import AllReducer from './reducers'
import LoggerMiddleware from './middleware/logger'
import thunk from 'redux-thunk'

export const store = createStore(AllReducer, applyMiddleware(
  LoggerMiddleware,
  thunk,
))
```

这个效果会和我们自己写的 thunk 中间件的效果是一样的

#### redux-saga 中间件

redux-saga 的作用和 redux-thunk 的作用基本一样，都可以在 Redux 的工作流程中加入异步代码。但是 redux-saga 的功能更加强大，它能将 Action 中的异步代码抽离出来

```js
npm install redux-saga -S
```

首先我们需要对 Action 中的代码进行修改，因为我们不需要在 Action 中去写异步代码了

```js
// src\store\actions\count.js

import { INCREMENT, DECREMENT, INCREMENT_ASYNC } from "../const";
import { createAction } from 'redux-actions'

// export const increment = payload => ({type: INCREMENT, payload});
// export const decrement = payload => ({type: DECREMENT, payload});
export const increment = createAction(INCREMENT)
export const decrement = createAction(DECREMENT)
// 修改过后的异步 Action
export const increment_async = payload => ({type: INCREMENT_ASYNC, payload});

```

接下来我们要在 store 下面创建 sagas 文件夹来写我们的 saga 中间件逻辑
我们需要在 redux-saga 中引入几个方法

- takeEvery 当组件去触发一个 Action 的时候，我们可以通过 takeEvery 去接收这个 Action 
- put 使用来触发另外一个 Action，当异步操作返回结果后，我们需要 put 去触发 Action 将这个异步的结果传递给 Reducer，put 的作用基本和 dispatch 是一样的
- delay 就是延迟效果

redux-saga 必须导出 Generator 函数，加下来我们定义 counterSaga 函数

```js
// src\store\sagas\counter.js

import { takeEvery, put, delay } from 'redux-saga/effects'
import { increment } from '../actions/count'
import { INCREMENT_ASYNC } from '../const'

function* increment_async_fn(action) {
  yield delay(2000)
  yield put(increment(action.payload))
}

export default function* counterSaga() {
  // 接收 action
  yield takeEvery(INCREMENT_ASYNC, increment_async_fn)
}
```

saga 也可以支持注册多个 saga，通过 redux-saga 提供的 all 方法，来注册所有的 saga

```js
// src\store\sagas\index.js

import ConunterSaga from './counter'
import { all } from 'redux-saga/effects'

export default function* rootSaga () {
  yield all([
    ConunterSaga(),
  ])
}
```

最后我们需要在 store 中注册 saga

```js
import { createStore, applyMiddleware } from 'redux'
import AllReducer from './reducers'
import LoggerMiddleware from './middleware/logger'
import createSagaMidddleware from 'redux-saga';
import rootSaga from './sagas'

const sagaMiddleware = createSagaMidddleware();

export const store = createStore(AllReducer, applyMiddleware(
  LoggerMiddleware,
  sagaMiddleware,
))

sagaMiddleware.run(rootSaga)
```

## 实现一个简易版的 Redux

了解了怎样使用 Redux 之后，我们来通过实现一个简易版的 Redux 来深入了解一下 Redux 的工作原理

### createStore

createStore 是 Redux 最核心的 api，它接收三个参数

- reducer 根据传入的 Action 的 type 对不同的状态进行处理的函数
- preloadedState 是预存储的状态
- enhancer 它是一个功能增强函数

```js
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
```

createStore 其实也是运用了发布订阅模式，在 subscribe 中将订阅函数放入队列中，在我们通过 dispatch 去触发 Action 的时候，会执行所有的订阅函数，这样就是一个简单的 Redux 的工作流程，是不是很简单，其实 Redux 的源码量也不是很多，简化的版的概述了 Redux 的基本思想。值得一提的是，createStore 的第二个参数 preloadedState，我在这里变成了必填的，是为了写起来比较方便，在真实的 Redux 源码中，实际上是可选的参数，而且 Redux 还做了判断，如果 preloadedState 不是一个方法的话，那么就是预存储的状态，如果是一个方法的话，那么它就是 enhancer 参数。enhancer 其实也就是 Redux 对中间件扩展的参数，不得不说 Redux 设计的还是非常精巧的。

### applyMiddleware

Redux 最强的功能就是中间件，在我们通过 dispatch 去触发 Action
的时候，本来 Action 会直接被 Reducer 去获取到，但是当我们使用的中间件之后，Action 就会先被中间件获取到。本质上 Redux 中间件就是对 dispatch 这个方法进行增强，在 Redux 中给我们提供了一个 applyMiddleware 的 api，applyMiddleware 最主要的功能就是接收多个中间件函数，然后按顺序执行中间件函数。

```js
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
      // 调用中间件的第一层函数，同时传入 简化版 store
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

// 中间件函数管道组合
function compose() {
  const funcs = [...arguments]
  return function (dispatch) {
    for(let i = funcs.length - 1; i >= 0; i--) {
      const func = funcs[i]
      // 将下一个中间件传给上一个中间件
      func && (dispatch = func(dispatch))
    }
    return dispatch
  }
}
```

在 compose 中会发现在循环 funcs 是倒序的，这时因为 Redux 的中间件是正序执行的。我们知道中间件的第二层函数会有一个 next 参数，实际上这个 next 参数就是下一个中间件函数，所以为了保证中间件的执行顺序，我们需要将下一个中间件函数传给上一个中间件函数，这样在上一个中间件函数调用 next 的时候，就会链式调用下面所有的中间件函数了。

### bindActionCreators

bindActionCreators 的作用就是将 Action Creator 函数转换成能够触发 Action
的函数，实际上就是将触发 dispatch 的动作保存起来，它的实现也比较简单

```js
function bindActionCreators(actionCreators, dispatch) {
  const boundActionsCreators = {}

  // 循环将所有传进来的 Action Creator 函数执行
  // 并将结果传给 dispatch 函数，并将 dispatch 的调用保存在函数对象中
  for(const key in actionCreators) {
    boundActionsCreators[key] = function () {
      // 调用 dispatch
      dispatch(actionCreators[key]())
    }
  }

  return boundActionsCreators
}
```

### combineReducers

combineReducers 的作用很简单，实际上就是将一个个小的 Reducer 组合成一个大的 Reducer

```js
function combineReducers(reducers) {
  const reducerKeys = Reflect.ownKeys(reducers)
  for(let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i]
    if (typeof reducers[key] !== 'function') throw new Error('reducer必须是函数')
  }

  return function (state, action) {
    const nextState = {}
    for(let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i]
      const reducer = reducers[key]
      const previousStateForKey = state[key]
      nextState[key] = reducer(previousStateForKey, action)
    }
    return nextState
  }
}
```

combineReducers 循环将小的 Reducer 执行，然后将 Reducer 执行的结果存储在新的 state 对象中，然后再返回一个新的 Reducer 函数，新的 Reducer 再将新的 state 返回，这样就实现了一个合并 Reducer 的功能。

## 总结

其实 Redux 的设计非常精巧，很难想象这是 Dan 赶出来的作品，Redux 很优秀，但是最让人诟病的可能就是它的使用比较复杂，但是我个人觉得还好，只要了解了 Redux 的工作原理，很多东西并没有想象的那么复杂。

