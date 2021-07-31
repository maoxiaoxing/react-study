# React Hooks原理

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



- [写给那些搞不懂代数效应的我们（翻译）](https://zhuanlan.zhihu.com/p/76158581)
