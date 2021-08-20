import axios from 'axios'
import HttpInspectors from './httpInspectors'
import {message} from 'antd'

HttpInspectors.setCallback('httpError', (error) => {
  message.error(error.errorMessage)
})

var http = function (method, url, queryParams, data, options) {
  let headers = HttpInspectors.setConfig(options)
  let promise = axios({
    headers: headers,
    method: method,
    url: url,
    params: queryParams,
    data: data
  })
  return new Promise(function (resolve, reject) {
    return promise.then(function (response) {
      HttpInspectors.handleResponse(response, resolve, reject)
    }, function (error) {
      HttpInspectors.handleError(error, reject)
    })
  })
}

var httpService = {
  get: function (options) {
    return http('get', options.url, options.queryParams, options)
  },
  post: function (options) {
    return http('post', options.url, options.queryParams, options.data, options)
  },
  put: function (options) {
    return http('put', options.url, options.queryParams, options.data, options)
  },
  create: function (options) {
    return http(options.method, options.url, options.queryParams, options.data, options)
  }
}

export default httpService
