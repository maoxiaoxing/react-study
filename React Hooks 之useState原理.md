# React Hooks 之useState原理

## React Hooks 简介

React Hooks 是 React 16.8 以及之后版本的产物，React Hooks 就是一堆钩子函数，不同的钩子函数提供了不同的功能，React 通过这些钩子函数对函数型组件进行增强。Hooks 允许你在不编写 class 的情况下使用状态(state)和其他 React 特性。 你还可以构建自己的 Hooks, 跨组件共享可重用的有状态逻辑。

## useState 的基本使用

在 16.8 之前的版本，函数型组件基本只负责展示数据，不负责状态的保存。useState 的出现就可以让函数型组件保存状态了，下面我们来看看 useState 是怎样的使用的

1. useState 可以接收一个初始的值
2. 返回值为数组，数组中存储状态值和更改状态值的方法
3. useState 方法可以被调用多次，用来保存不同状态值
4. 参数可以是一个函数，函数返回什么，初始状态就是什么，函数只会被调用一次，用在初始值是动态值的情况

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
