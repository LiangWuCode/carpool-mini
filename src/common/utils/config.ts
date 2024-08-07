export const getVersion = () => {
  return '0.0.14'
}

export const getAppVersion = () => {
  return '2.5.202303071014'
}

export const appId = 'wx1077326c20dbda47'

type envType = 'dev' | 'prod' | 'test'
export let env: envType = 'prod'
env = 'dev'
// env = 'test'

export const getBaseURL = () => {
  // 正式环境地址
  let baseURL = 'https://www.wuliang.plus/carpool'
  // 判断环境是否为测试环境
  if (env === 'dev') {
    baseURL = 'http://127.0.0.1:8081/carpool'
  }

  if (env === 'test') {
    baseURL = 'http://192.168.1.222:8081/carpool'
  }

  // #ifdef H5
  baseURL = '/api/'
  // #endif

  return baseURL
}

export const getDiyBaseURL = () => {
  return 'https://fc.faceface2.com'
}

export const getScoketURL = () => {
  // 正式环境地址
  let scoketURL = 'wss://api.faceface2.com/websocket/'
  // 判断环境是否为测试环境
  if (env === 'dev') {
    scoketURL = 'wss://dev-api.faceface2.com/websocket/'
  }

  // #ifdef H5
  scoketURL = '/api/'
  // #endif

  return scoketURL
}
