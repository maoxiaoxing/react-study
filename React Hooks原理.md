# React Hooks原理

## React Hooks 简介

React Hooks 是 React 16.8 以及之后版本的产物，React Hooks 就是一堆钩子函数，不同的钩子函数提供了不同的功能，React 通过这些钩子函数对函数型组件进行增强。Hooks 允许你在不编写 class 的情况下使用状态(state)和其他 React 特性。 你还可以构建自己的 Hooks, 跨组件共享可重用的有状态逻辑。

## 践行代数效应

React 核心成员 [Sebastian Markbåge](https://github.com/sebmarkbage/) (Hooks 的发明者)曾说：我们在 React 中做的就是践行代数效应。

![](https://gitee.com/maoxiaoxing/mxx-blog/raw/master/Img/1575596-20210725223512026-1437088832.png)

代数效应是函数式编程的一个概念，它所解决的一部分问题只在纯函数式编程中才存在，是为了分离一些副作用。代数效应实际上是一个比较领先的理念（写这篇博客为止），这种感觉就像你在写回调去解决异步问题，突然有一天有一个人告诉你有一个叫 async/await 的东西，有点那个味了，是不是？
有人看到这可能就会说了，我不关心什么破代数效应，不要跟我讲大道理，直接给老子上代码就行了≦(._.)≧
代数效应看起来像是很高深的原理，下面我们用一些虚构的伪代码来解释一下什么是代数效应。

假设我们有一个 getName 是根据 id 获取用户信息的函数，还有一个 makeFriends 函数用来处理 getName 返回的用户信息

```js
function getName(id) {
  // ... 获取用户数据
}

function makeFriends(id1, id2) {
  const user1 = getName(id1)
  const user2 = getName(id2)
  return `${user1.name}和${user2.name}变成了好朋友`
}
```

现在我们将 getName 变成异步函数

```js
async function getName(id) {
  // ... 异步操作
}

async function makeFriends(id1, id2) {
  const user1 = await getName(id1)
  const user2 = await getName(id2)
  return `${user1.name}和${user2.name}变成了好朋友`
}
```

可以看到，由于 getName 函数变成了异步函数，导致 makeFriends 也需要变成异步函数去获取 getName 返回的数据，getName 变成异步函数破坏了 makeFriends 函数的同步特性。但是其实以正常编程思想，我才不想关注 getName 是怎样的实现的，我只在乎 getName 返回的数据。
![](https://gitee.com/maoxiaoxing/mxx-blog/raw/master/Img/1575596-20210725232041295-986738930.gif)

这其实就是 getName 变成异步函数导致的副作用。
我们尝试虚构一个类似 try...catch 的语法 —— try...handle 和两个操作符 perform、resume 去分离一下这样的副作用

```js
function getName(id) {
  const user = perform axios.get(id)
  return user
}

function makeFriends(id1, id2) {
  const user1 = getName(id1)
  const user2 = getName(id2)
  return `${user1.name}和${user2.name}变成了好朋友`
}

try {
  makeFriends('9527', '9528')
} handle (user) {
  if (user) {
    resume with user
  } else {
    resume with {
      name: '毛小星'
    }
  }
}
```

当 makeFriends 执行到 getName 方法的时候，会执行 perform 后面的语句，perform 跳出当时的执行栈，try...handle 会捕获 perform 执行的结果，这就是一个效应。这种语法看起来非常像 try...catch，但是一旦 catch 到了 Error，那么当前执行的这条逻辑就完成了，当前的调用栈就销毁了，那么我们能不能使用一种语法“回到”之前的执行逻辑中去呢？try...handle 让这种场景成为了可能，handle 捕获了 perform 的执行结果后，依然会捕获下一个 perform。
上面这段伪代码就是代数效应的思想，是不是很简单，其实代数效应就是将副作用从函数中分离，让函数变得更加纯粹一些，这也是函数式编程的核心思想。

![](https://gitee.com/maoxiaoxing/mxx-blog/raw/master/Img/1575596-20210731202116250-303666976.jpg)

## 代数效应在 React 中的实践

React 16.8 中的 Hooks 就是在践行代数效应，像 useState、useReducer、useRef 等，我们不需要关注函数式组件中的 state 在 Hooks 中是如果保存的，React 会为我们处理。你可以把 useState 看做成是一个 perform State()，这个效应就被 React 处理了，这样我们就直接使用 useState 返回的 state，编写我们的业务逻辑即可。
下面我们看看 useState 的基本使用

### useState 的基本使用

在 16.8 之前的版本，函数型组件基本只负责展示数据，不负责状态的保存。useState 的出现就可以让函数型组件保存状态了，下面我们来看看 useState 是怎样的使用的

1. useState 可以接收一个初始的值
2. 返回值为数组，数组中存储状态值和更改状态值的方法
3. useState 方法可以被调用多次，用来保存不同状态值
4. 参数可以是一个函数，函数返回什么，初始状态就是什么，函数只会被调用一次，用在初始值是动态值的情况

```js
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'

const userMap = new Map([
  ['9527', { name: '毛小星' }],
  ['9528', { name: '杨秘书' }],
])

const Friend = () => {
  const [count, setCount] = useState(() => 0)
  const [id1] = useState('9527')
  const [id2] = useState('9528')
  const [content, setContent] = useState('')
  
  const getName = (_id) => {
    return userMap.get(_id)
  }

  const makeFriend = (_id1, _id2) => {
    const user1 = getName(_id1)
    const user2 = getName(_id2)

    const result = `${user1.name} 和 ${user2.name} 变成了好朋友`

    setContent(result)
  }

  useEffect(() => {
    makeFriend(id1, id2)
  }, [id1, id2, count])

  return (
    <div>
      <p>{count && content}</p>
      <Button type="primary" onClick={() => setCount((_count) => _count + 1)}>increment</Button>
    </div>
  )
}

export default Friend
```

![](https://gitee.com/maoxiaoxing/mxx-blog/raw/master/Img/useState2.gif)

### useState 原理

上面我们在讲代数效应的时候，我们说不用关心 useState 里面做了什么，我们只需要使用 useState 返回给我们的 state 即可。诶，但是我就是个好奇宝宝，我就想知道 useState 内部到底是怎样实现的。


![](https://gitee.com/maoxiaoxing/mxx-blog/raw/master/Img/1575596-20210731222101786-742218887.png)

#### Hooks 架子

下面我们自己实现一个简易版的 useState，来了解一下 Hooks 内部的基本原理。
我们先来准备一些基础代码，也就是我们要写的 useState 的架子，写代码之前，我们先来梳理一下我们需要干什么。
- 首先我们要模拟 useState ，那么我们肯定要先声明一个 useState 函数
- 然后我们需要一个组件来测试我们实现的 hook，我们暂且叫它 App
- 我们都知道 React 16.8 之后采用了新的 Fiber 架构，Fiber 也就是一个对象用来存储组件的信息，一般组件都会被存储在 stateNode 这个属性上，而 Hooks 的 state 会用链表结构被存储在 Fiber 的 memoizedState 这个属性上。
- React 设计最精妙之处就在于它的调度，我们需要一个调度函数 schedule
- 组件是需要区分生命周期的，首次渲染和更新阶段是不一样的，我们使用一个 isMount 字段去标识
- 最后我们需要一个 workInprogressHook 来处理最近的一个 hook

下面我们就通过上面的思路来把 hooks 的框架搭出来

```js
let isMount = true // 是否渲染
let workInprogressHook = null // 当前处理 hook

// Fiber对象
const fiber = {
  stateNode: App,
  memoizedState: null, // 用链表去存储 hook 
}

function useState (initialState) {
 // todo 实现 useState
}


// 调度
function schedule() {
  // 初始化 当前处理 hook
  workInprogressHook = fiber.memoizedState
  const app = fiber.stateNode()
  isMount = false
  return app
}

// 测试组件
// 为了简化流程，我们忽略 DOM 更新
function App () {
  const [num, setNum] = useState(0)
  const [count, setCount] = useState(0)

  return {
    onClick() {
      setNum(num => num + 1)
    },
    updateCount() {
      setCount(count => count + 1)
    }
  }
}

// 将调度挂载到 window 对象上，方便测试点击效果
window.app = schedule()
```

#### 初始状态的 useState

上面我们在 useState 函数中留了一个 todo项，在实现 useState 函数之前，我们先来思考一个问题，我们应该怎样存储 useState 生成的状态呢，通常我们调用 useState 是像下面这样的

```js
const [count1, setCount1] = useState(0)
const [count2, setCount2] = useState(0)
const [count3, setCount3] = useState(0)
```

在 React 源码中，React 是通过链表结构来存储这些 hook 的，我们要把所有的 state 通过链表的形式存储，并且我们要将 workInprogressHook 指向当前 hook 方便我们处理，下面我们来试着实现 useState

```js
function useState(initialState) {
  let hook // 当前 hook 节点

  if (typeof initialState === 'function') {
    initialState = initialState();
  }

  if (isMount) {
    hook = {
      memoizedState: initialState,
      next: null,
    }

    // 创建 hook 链表
    // 如果没有初始化的 hook 则初始化 hook 节点，并将当前处理节点（workInprogressHook）指向当前 hook
    // 如果不是初始化的话，则将 当前处理节点（workInprogressHook）的下一个节点指向 hook
    if (!fiber.memoizedState) {
      fiber.memoizedState = hook
    } else {
      workInprogressHook.next = hook
    }

    workInprogressHook = hook
  }

  // todo 实现更新逻辑
}
```

#### 更新 state

在完善 useState 的更新逻辑，我们先来想想，既然 state 是需要用链表来存储的，那么update 函数也得需要对应一个链表来存储啊，我们来看看为什么需要链表来存储

```js
const [count, setCount] = useState(0)

return (
  <p onClick={() => {
    setCount(num => num + 1)
    setCount(num => num + 1)
    setCount(num => num + 1)
  }}>
    {num}
  </p>
)
```

可以看到更新函数 setCount 可能不是只调用一次，在 React 中，这些 update 函数被环状链表组合在了一起。这时我们就需要在 hook 上增加一个 queue 属性来存储 update 函数

```js
hook = {
  memoizedState: initialState,
  next: null,
  // 保存改变的状态
  // 队列是因为 有可能有多个更新函数
  // setCount(num => num + 1)
  // setCount(num => num + 1)
  // setCount(num => num + 1)
  queue: {
    pending: null,
  }
}
```

在 React 源码中，更新阶段会调用 dispatchAction.bind(null, hook.queue) 这个函数来更新 state，我们先来看看是怎样实现的

```js
function dispatchAction(queue, action) {
  // 更新节点
  const update = {
    action,
    next: null,
  }

  // 构建更新链表 环状链表
  // queue.pending === null 还没有触发更新，创建第一个更新
  if (queue.pending === null) {
    // u0 -> u0 -> u0
    update.next = update
  } else {
    // u0 -> u0
    // u1 -> u0 -> u1
    update.next = queue.pending.next
    queue.pending.next = update
  }
  queue.pending = update

  // 触发更新
  schedule()
}
```

环状链表的操作可能不太容易理解，下面我们来详细讲解下。
- 首先，当产生第一个 update 的时候（我们叫它 u0），此时queue.pending === null。update.next = update;即u0.next = u0，他会和自己首尾相连形成单向环状链表。然后queue.pending = update;即queue.pending = u0

```js
queue.pending = u0 ---> u0
                ^       |
                |       |
                ---------
```

- 当产生第二个update（我们叫他u1），update.next = queue.pending.next;，此时queue.pending.next === u0， 即u1.next = u0。queue.pending.next = update;，即u0.next = u1。然后queue.pending = update;即queue.pending = u1

```js
queue.pending = u1 ---> u0   
                ^       |
                |       |
                ---------
```

这样做的好处就是，当我们需要遍历 update 时，queue.pending.next指向第一个插入的update，方便我们去操作 update 函数。逻辑还是比较清晰明了的，如果上面看不懂的话，需要去好好补一下数据结构了哦。

![](https://gitee.com/maoxiaoxing/mxx-blog/raw/master/Img/1575596-20210801183829942-1662875368.jpg)

#### 完善 useState

在 dispatchAction 中，我们将 update 构建成环状链表后， 接着我们就可以继续实现 useState 中的更新逻辑，当我们需要更新 state 时，我们就需要遍历环状链表，将新的状态更新到 update 函数中去，当遍历完，我们将链表清空，最后我们将新的 state 和 update 函数返回即可。

```js
function useState(initialState) {
  let hook // 当前 hook 节点

  if (typeof initialState === 'function') {
    initialState = initialState();
  }

  if (isMount) {
    ... mount 阶段
  } else {
    // 如果是 update 的情况，则将 hook 指向 workInprogressHook
    // workInprogressHook 指向 hook 链表的下一个节点
    hook = workInprogressHook
    workInprogressHook = workInprogressHook.next
  }

  // 处理更新 遍历更新函数的环状链表
  // 获取初始状态
  let baseState = hook.memoizedState

  if (hook.queue.pending) {
    let firstUpdate = hook.queue.pending.next

    do {
      const action = firstUpdate.action
      // 处理更新状态
      baseState = action(baseState)
      firstUpdate = firstUpdate.next
    } while (firstUpdate !== hook.queue.pending.next) // 遍历完环状链表

    // 清空链表
    hook.queue.pending = null
  }

  hook.memoizedState = baseState

  return [baseState, dispatchAction.bind(null, hook.queue)]
}
```

### 浅析 Hooks 源码

上面我们实现一个简单的 useState，我们使用 isMount 来判断更新时机，但是 React 中没有这么 low，React 中使用了不用的 hash 值来标识不同的 hooks 的状态

> 本篇博客 React 源码为 16.12.0 版本

```js
// 利用 hash 来存储不用状态的方法
// mount 阶段
const HooksDispatcherOnMount: Dispatcher = {
  readContext,

  useCallback: mountCallback,
  useContext: readContext,
  useEffect: mountEffect,
  useImperativeHandle: mountImperativeHandle,
  useLayoutEffect: mountLayoutEffect,
  useMemo: mountMemo,
  useReducer: mountReducer,
  useRef: mountRef,
  useState: mountState,
  useDebugValue: mountDebugValue,
  useResponder: createDeprecatedResponderListener,
  useDeferredValue: mountDeferredValue,
  useTransition: mountTransition,
};

// update 阶段
const HooksDispatcherOnUpdate: Dispatcher = {
  readContext,

  useCallback: updateCallback,
  useContext: readContext,
  useEffect: updateEffect,
  useImperativeHandle: updateImperativeHandle,
  useLayoutEffect: updateLayoutEffect,
  useMemo: updateMemo,
  useReducer: updateReducer,
  useRef: updateRef,
  useState: updateState,
  useDebugValue: updateDebugValue,
  useResponder: createDeprecatedResponderListener,
  useDeferredValue: updateDeferredValue,
  useTransition: updateTransition,
};
```

Redux 的作者 [Dan Abramov](https://github.com/gaearon) 在加入 React 团队中也是将 Redux 的思想带入了 React 中，useState 和 useReducer 这两个 hook 就是他的代表作，而且从本质来说，useState 不过就是预置了 reducer 的 useReducer，下面的源码会印证这点。

![](https://gitee.com/maoxiaoxing/mxx-blog/raw/master/Img/1575596-20210801213806401-1290783913.png)

#### mount 阶段的 useState 和 useReducer

在 mount 阶段，useState 会调用 mountState， 而 useReducer 则会调用 mountReducer
下面我们来看看这两个方法

```js
// \react\packages\react-reconciler\src\ReactFiberHooks.js

function mountState<S>(
  initialState: (() => S) | S,
): [S, Dispatch<BasicStateAction<S>>] {
  // 创建hook对象
  const hook = mountWorkInProgressHook();
  if (typeof initialState === 'function') {
    // $FlowFixMe: Flow doesn't like mixed types
    initialState = initialState();
  }
  hook.memoizedState = hook.baseState = initialState;
  const queue = (hook.queue = {
    pending: null,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: (initialState: any),
  });
  const dispatch: Dispatch<
    BasicStateAction<S>,
  > = (queue.dispatch = (dispatchAction.bind(
    null,
    currentlyRenderingFiber,
    queue,
  ): any));
  return [hook.memoizedState, dispatch];
}

function mountReducer<S, I, A>(
  reducer: (S, A) => S,
  initialArg: I,
  init?: I => S,
): [S, Dispatch<A>] {
  const hook = mountWorkInProgressHook();
  let initialState;
  if (init !== undefined) {
    initialState = init(initialArg);
  } else {
    initialState = ((initialArg: any): S);
  }
  hook.memoizedState = hook.baseState = initialState;
  const queue = (hook.queue = {
    pending: null,
    dispatch: null,
    lastRenderedReducer: reducer,
    lastRenderedState: (initialState: any),
  });
  const dispatch: Dispatch<A> = (queue.dispatch = (dispatchAction.bind(
    null,
    currentlyRenderingFiber,
    queue,
  ): any));
  return [hook.memoizedState, dispatch];
}
```

能看到 mountState 和 mountReducer 的区别就是 queue 中 lastRenderedReducer 字段

```js
const queue = (hook.queue = {
  // 与极简实现中的同名字段意义相同，保存update对象
  pending: null,
  // 保存dispatchAction.bind()的值
  dispatch: null,
  // 上一次render时使用的reducer
  lastRenderedReducer: reducer,
  // 上一次render时的state
  lastRenderedState: (initialState: any),
});
```

mountReducer 的 lastRenderedReducer 接收的就是传入你自定义的 reducer；而 mountState 接收的 lastRenderedReducer 是一个预置的 basicStateReducer。
下面我们来看看 basicStateReducer 的实现

```js
function basicStateReducer<S>(state: S, action: BasicStateAction<S>): S {
  // $FlowFixMe: Flow doesn't like mixed types
  return typeof action === 'function' ? action(state) : action;
}
```

这也直接证明了 useState 即 reducer 为 basicStateReducer 的 useReducer。

#### update 阶段的 useState 和 useReducer

在 update 阶段 updateState 则是直接调用了 updateReducer 方法，更加证明了 useState 就是特殊的 useReducer

```js
function updateState<S>(
  initialState: (() => S) | S,
): [S, Dispatch<BasicStateAction<S>>] {
  return updateReducer(basicStateReducer, (initialState: any));
}
```

下面我们来看看 updateReducer 是怎样实现的

```js
function updateReducer<S, I, A>(
  reducer: (S, A) => S,
  initialArg: I,
  init?: I => S,
): [S, Dispatch<A>] {
  // 获取当前hook
  const hook = updateWorkInProgressHook();
  const queue = hook.queue;
  
  queue.lastRenderedReducer = reducer;

  // ...计算 newState 的过程

  hook.memoizedState = newState;
  const dispatch: Dispatch<A> = (queue.dispatch: any);
  return [hook.memoizedState, dispatch];
}
```

源码这个部分比较长，我只保留了一些主干代码，大致流程就是重新计算新的 state，然后将新的 state 返回。

#### 调用更新函数

我们在使用 setCount((count) => count + 1)  这样的更新函数更新 state 的时候，会触发 dispatchAction 函数，这个时候当前的函数组件对应的 Fiber 和 对应的更新方法（hook.queue）就通过调用 dispatchAction.bind 传入了方法内

```js
function dispatchAction<S, A>(
  fiber: Fiber,
  queue: UpdateQueue<S, A>,
  action: A,
) {

  const currentTime = requestCurrentTimeForUpdate();
  const suspenseConfig = requestCurrentSuspenseConfig();
  const expirationTime = computeExpirationForFiber(
    currentTime,
    fiber,
    suspenseConfig,
  );

  const update: Update<S, A> = {
    expirationTime,
    suspenseConfig,
    action,
    eagerReducer: null,
    eagerState: null,
    next: (null: any),
  };

  // 构建 update 环状链表
  // Append the update to the end of the list.
  const pending = queue.pending;
  if (pending === null) {
    // This is the first update. Create a circular list.
    update.next = update;
  } else {
    update.next = pending.next;
    pending.next = update;
  }
  queue.pending = update;

  const alternate = fiber.alternate;
  if (
    fiber === currentlyRenderingFiber ||
    (alternate !== null && alternate === currentlyRenderingFiber)
  ) {
    // This is a render phase update. Stash it in a lazily-created map of
    // queue -> linked list of updates. After this render pass, we'll restart
    // and apply the stashed updates on top of the work-in-progress hook.
    didScheduleRenderPhaseUpdate = true;
    update.expirationTime = renderExpirationTime;
    currentlyRenderingFiber.expirationTime = renderExpirationTime;
  } else {
    if (
      fiber.expirationTime === NoWork &&
      (alternate === null || alternate.expirationTime === NoWork)
    ) {
      // 只保留核心代码
      // ...优化调度渲染
      const currentState: S = (queue.lastRenderedState: any);
      const eagerState = lastRenderedReducer(currentState, action);
      update.eagerReducer = lastRenderedReducer;
      update.eagerState = eagerState;
      if (is(eagerState, currentState)) {
        // Fast path. We can bail out without scheduling React to re-render.
        // It's still possible that we'll need to rebase this update later,
        // if the component re-renders for a different reason and by that
        // time the reducer has changed.
        return;
      }
    }

    // 调度
    scheduleWork(fiber, expirationTime);
  }
}
```

dispatchAction 函数我只留了一些主干代码，总结一下：将 update 加入 queue.pending，构建环状链表，在优化渲染后，开启调度。

if...else... 是 React 的一些优化手段，if 内：

```js
if (
  fiber === currentlyRenderingFiber ||
  (alternate !== null && alternate === currentlyRenderingFiber)
)
```

这是需要 render 阶段触发的更新，所以需要给当前的更新放到一个延迟队列中，在渲染阶段，再重新启用 workInProgress 去触发更新

而下面的 else...if

```js
else if (
    fiber.expirationTime === NoWork &&
    (alternate === null || alternate.expirationTime === NoWork)
  )
```

fiber.expirationTime 保存的是 fiber 对象的 update的优先级，fiber.expirationTime === NoWork 则意味着 fiber 对象上不存在 update。
通过源码的学习，我们已经知道了 update 计算 state 是在 hook 的声明阶段，在调用阶段还通过内置的 reducer 重新计算 state，如果调用阶段的 state 和声明阶段的 state 是相等的，那么就完全不需要重新开启一次新的调度了。

到此我们就了解了 hooks 的理念，其实 React 就是在践行函数式编程，如果你觉得这篇“人类高质量文章”写的不错就点个赞吧！

![](https://gitee.com/maoxiaoxing/mxx-blog/raw/master/Img/1575596-20210807184621517-9891606.jpg)


- [写给那些搞不懂代数效应的我们（翻译）](https://zhuanlan.zhihu.com/p/76158581)
- [React技术揭秘](https://react.iamkasong.com/process/fiber-mental.html#%E4%BB%80%E4%B9%88%E6%98%AF%E4%BB%A3%E6%95%B0%E6%95%88%E5%BA%94)
