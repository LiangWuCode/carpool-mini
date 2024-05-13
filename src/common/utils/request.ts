
/**
 * 请求封装，拦截
 * @author wenqiang 
 **/
const config = Symbol('config')
const isCompleteURL = Symbol('isCompleteURL')
const requestBefore = Symbol('requestBefore')
const requestAfter = Symbol('requestAfter')

export type MethodType = "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT" | undefined;
export type ConfigType = {
  baseURL?: string,
  method?: MethodType,
  header?: object,
  data?: any,
  dataType?: 'json',
  responseType?: 'json',
  [k: string]: any
}
type UrlType = {
  url: string,
  success?: (res: any) => void,
  fail?: (err: any) => void
}
export type OptionsType = ConfigType & UrlType

class Request<T> {
  [config]: ConfigType = {
    baseURL: '',
    header: {
      'content-type': 'application/json'
    },
    method: 'GET',
    dataType: 'json',
    responseType: 'json'
  }

  interceptors = {
    request: (func: Function) => {
      if (func) {
        Request[requestBefore] = func
      } else {
        Request[requestBefore] = (request: ConfigType) => request
      }

    },
    response: (func: Function) => {
      if (func) {
        Request[requestAfter] = func
      } else {
        Request[requestAfter] = (response: any) => response
      }
    }
  }

  static [requestBefore]: Function = (config: ConfigType) => {
    return config
  }

  static [requestAfter]: Function = (response: any) => {
    return response
  }

  static [isCompleteURL](url: string) {
    return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
  }

  setConfig(func: Function) {
    this[config] = func(this[config])
  }

  request(options: ConfigType = {}): Promise<T> {
    options.baseURL = options.baseURL || this[config].baseURL
    options.dataType = options.dataType || this[config].dataType
    options.url = Request[isCompleteURL](options.url) ? options.url : (options.baseURL + options.url)
    options.data = options.data
    options.header = { ...options.header, ...this[config].header }
    options.method = options.method || this[config].method

    const newOptions: OptionsType = { ...options, ...Request[requestBefore](options) }

    return new Promise((resolve, reject) => {
      newOptions.success = function (res) {
        resolve(Request[requestAfter](res))
      }
      newOptions.fail = function (err) {
        reject(Request[requestAfter](err))
      }
      uni.request(newOptions)
    })
  }

  get(url: string, data?: any, options: ConfigType = {}) {
    options.url = url
    options.data = data
    options.method = 'GET'
    return this.request(options)
  }

  post(url: string, data?: any, options: ConfigType = {}) {
    options.url = url
    options.data = data
    options.method = 'POST'
    return this.request(options)
  }

  put(url: string, data?: any, options: ConfigType = {}) {
    options.url = url
    options.data = data
    options.method = 'PUT'
    return this.request(options)
  }

  delete(url: string, data?: any, options: ConfigType = {}) {
    options.url = url
    options.data = data
    options.method = 'DELETE'
    return this.request(options)
  }
}

export default Request;