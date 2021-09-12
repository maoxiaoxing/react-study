# Redux核心概念及其原理

## Redux 简介

Redux 最初是由俄罗斯的程序员 Dan Abramov 为了演讲而完成的，Redux 是针对 JavaScript 应用程序的可预测状态管理器，它将 Flux 与函数式编程结合在一起，现如今已经是市面上最流行的状态管理器之一。
众所周知，Redux 的最佳伴侣就是 React，但是其实你可以在很多前端框架中使用它，它的体积很小，但是却有着非常强大的功能，你可以使用很多中间件来扩展 Redux。
那么我们什么时候需要 Redux 呢？
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
