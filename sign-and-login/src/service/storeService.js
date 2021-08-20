var store = {
  get: function (key) {
    return localStorage.getItem(key)
  },
  set: function (key, value) {
    return localStorage.setItem(key, value)
  },
  clearExcept (key) {
    for (var i = 0; i < localStorage.length; i++) {
      var itemKey = localStorage.key(i)
      if (itemKey !== key) {
        localStorage.removeItem(itemKey)
      }
    }
  },
  clearAll () {
    for (var itemKey in localStorage) {
      localStorage.removeItem(itemKey)
    }
  }
}

export default class StoreService {
  static getAccountInfo () {
    return JSON.parse(store.get('account'))
  }

  static setAccountInfo (account) {
    return store.set('account', JSON.stringify(account))
  }

  static getToken () {
    return store.get('token')
  }

  static setToken (token) {
    store.set('token', token)
  }

  static clearExcept (key) {
    store.clearExcept(key)
  }

  static clearAll () {
    store.clearAll()
  }

  static getData (key) {
    return store.get(key)
  }

  static setData (key, value) {
    store.set(key, value)
  }
}
