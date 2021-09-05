export default store => next => action => {
  console.log(store, action)
  next(action1)
}
