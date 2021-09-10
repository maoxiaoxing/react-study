function logger (store) {
  return function(next) {
    return function (action) {
      next(action)
    }
  }
}
