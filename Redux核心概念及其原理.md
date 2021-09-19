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
