const CreateTaskQueue = () => {
  const taskQueue = []
  return {
    push: item => taskQueue.push(item),
    pop: () => taskQueue.shift(),
  }
}

export default CreateTaskQueue
