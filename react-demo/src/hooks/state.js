
let isMount = false // 是否渲染
let workInprogressHook = null // 当前处理 hook

// Fiber对象
const fiber = {
  stateNode: App,
  memoizedState: null, // 用链表去存储 hook 
}

function useState(initialState) {
  let hook // 当前 hook 节点

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
      workInprogressHook = hook
    } else {
      workInprogressHook.next = hook
    }
  } else {
    // 如果是 update 的情况，则将 hook 指向 workInprogressHook
    // workInprogressHook 指向 hook 链表的下一个节点
    hook = workInprogressHook
    workInprogressHook = workInprogressHook.next
  }
}

// 调度
function schedule() {
  // 初始化 当前处理 hook
  workInprogressHook = fiber.memoizedState
  fiber.stateNode()
  isMount = false
}

function App () {
  const [num, setNum] = useState(0)

  return {
    onClick() {
      setNum(num => num + 1)
    }
  }
}

