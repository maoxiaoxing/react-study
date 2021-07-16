# React Hooks 使用篇（一） 常见hooks的使用

## React Hooks 简介

React Hooks 是 React 16.8 以及之后版本的产物，React Hooks 就是一堆钩子函数，不同的钩子函数提供了不同的功能，React 通过这些钩子函数对函数型组件进行增强。Hooks 允许你在不编写 class 的情况下使用状态(state)和其他 React 特性。 你还可以构建自己的 Hooks, 跨组件共享可重用的有状态逻辑。
好，废话不多说，下面就让我们来看看 Hooks 是怎样使用的

## useState

在 16.8 之前的版本，函数型组件基本只负责展示数据，不负责状态的保存。useState 的出现就可以让函数型组件保存状态了，下面我们来看看 useState 是怎样的使用的

### useState 的基本使用

```js
import React, { useState } from 'react'
import { Button } from 'antd'

const Demo () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>{count}</p>
      <Button onClick={() => setCount(count + 1)}>increment</Button>
    </div>
  )
}

export default Demo
```
