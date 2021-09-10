function thunk (store) {
  return function(next) {
    return function (action) {
      next(action)
    }
  }
}

