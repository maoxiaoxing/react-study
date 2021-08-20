import HttpService from './httpService'
import Urls from './urls'

export default class LoginService {
  static login (data) {
    var options = {
      url: Urls.login,
      data: data
    }

    return HttpService.post(options)
  }
}
