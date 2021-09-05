export default store => next => action => {
  if (typeof action === 'function') {
    return action(store.dispatch)
  }
  next(action)
}