import HttpService from './httpService'
import Urls from './urls'

export default class LoginService {
  static login (data) {
    const options = {
      url: Urls.login,
      data: data
    }

    return HttpService.post(options)
  }

  static register(data) {
    const options = {
      url: Urls.register,
      data: data
    }

    return HttpService.post(options)
  }
}
