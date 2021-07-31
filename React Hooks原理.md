# React Hooks原理

## React Hooks 简介

React Hooks 是 React 16.8 以及之后版本的产物，React Hooks 就是一堆钩子函数，不同的钩子函数提供了不同的功能，React 通过这些钩子函数对函数型组件进行增强。Hooks 允许你在不编写 class 的情况下使用状态(state)和其他 React 特性。 你还可以构建自己的 Hooks, 跨组件共享可重用的有状态逻辑。

## 践行代数效应

React 核心成员 [Sebastian Markbåge](https://github.com/sebmarkbage/) (Hooks 的发明者)曾说：我们在 React 中做的就是践行代数效应。

![](https://img2020.cnblogs.com/blog/1575596/202107/1575596-20210725223512026-1437088832.png)

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
![](https://img2020.cnblogs.com/blog/1575596/202107/1575596-20210725232041295-986738930.gif)

这其实就是 getName 变成异步函数导致的副作用。
我们尝试虚构一个类似 try...catch 的语法 —— try...handle 和两个操作符 perform、resume

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

![](https://img2020.cnblogs.com/blog/1575596/202107/1575596-20210731202116250-303666976.jpg)

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
import React, { useState } from 'react'
import { Button } from 'antd'

const Demo = () => {
  const [name, setName] = useState('毛小星')
  const [count, setCount] = useState(() => 0)

  return (
    <div>
      <p>{name}</p>
      <Button type="primary" onClick={() => setName('杨秘书')}>setName</Button>
      <p>{count}</p>
      <Button type="primary" onClick={() => setCount((_count) => _count + 1)}>increment</Button>
    </div>
  )
}

export default Demo
```

![](https://gitee.com/maoxiaoxing/mxx-blog/raw/master/Img/useState1.gif)

### useState 原理

上面我们在讲代数效应的时候，我们说不用关心 useState 里面做了什么，我们只需要使用 useState 返回给我们的 state 即可。诶，但是我就是个好奇宝宝，我就想知道 useState 内部到底是怎样实现的。


![](https://img2020.cnblogs.com/blog/1575596/202107/1575596-20210731222101786-742218887.png)


- [写给那些搞不懂代数效应的我们（翻译）](https://zhuanlan.zhihu.com/p/76158581)
- [React技术揭秘](https://react.iamkasong.com/process/fiber-mental.html#%E4%BB%80%E4%B9%88%E6%98%AF%E4%BB%A3%E6%95%B0%E6%95%88%E5%BA%94)
