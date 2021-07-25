# React Hooks原理

## 践行代数效应

React 核心成员 [Sebastian Markbåge](https://github.com/sebmarkbage/) (Hooks 的发明者)曾说：我们在 React 中做的就是践行代数效应。

![](https://img2020.cnblogs.com/blog/1575596/202107/1575596-20210725223512026-1437088832.png)

代数效应是函数式编程的一个概念，它所解决的一部分问题只在纯函数式编程中才存在，是为了分离一些副作用。
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

可以看到，由于 getName 函数变成了异步函数，导致 makeFriends 也需要变成异步函数去获取 getName 返回的数据，getName 变成异步函数破坏了 makeFriends 函数的同步特性。但是其实以正常编程思想，我们其实不想关注 getName 是怎样的实现的，我只在乎 getName 返回的数据。这其实就是 getName 编程异步函数导致的副作用。




- [写给那些搞不懂代数效应的我们（翻译）](https://zhuanlan.zhihu.com/p/76158581)
