/**
 * 请求，拦截器，文件上传等
 * @author wenqiang
 **/
import Request, { ConfigType } from '@/common/utils/request'
import { showLoading, toast, href, getRedirect } from '@/common/utils/index'
import pinia from '@/store/store'
import { useUser } from '@/store/user'
import { useSystem } from '@/store/systemInfo'

import { getVersion, getBaseURL } from '@/common/utils/config'

import { responseDataType, responseType } from './interface'
import { navLogin } from '../ts/nav'

export const request = new Request<responseDataType>()

/**
 * 请求拦截器
 * @param string url 请求地址
 * @param string method 请求方式
 *  GET or POST
 * @param {*} postData 请求参数
 * @param bool isDelay 是否延迟显示loading
 * @param bool isForm 数据格式
 *  true: 'application/x-www-form-urlencoded'
 *  false:'application/json'
 * @param bool hideLoading 是否隐藏loading
 * @param bool hideToast 是否隐藏错误提示框
 *  true: 隐藏
 *  false:显示
 */
let delayed: any = null
let loading = false
let hideLoading = false
let hideToast = false

let timer: any = null

// 设置默认配置
request.setConfig((config: ConfigType) => {
  config.baseURL = getBaseURL()

  return config
})

// 请求拦截
request.interceptors.request((request: any) => {
  const userStore = useUser(pinia)
  const systemStore = useSystem(pinia)
  loading && uni.hideLoading()
  loading = false
  hideLoading = request.hideLoading
  hideToast = request.hideToast
  if (!hideLoading) {
    if (request.isDelay) {
      delayed = setTimeout(() => {
        loading = true
        showLoading()
      }, 1000)
    } else {
      loading = true
      showLoading()
    }
  }
  // deviceType 小程序：1，H5：6
  let deviceType = 1
  // #ifdef H5
  deviceType = 6
  // #endif

  request.header = {
    'content-type': request.isForm ? 'application/x-www-form-urlencoded' : 'application/json',
    Authorization: userStore.userInfo.token,
    // deviceId: userStore.openId,
    version: getVersion(),
    deviceType: deviceType,
    x: deviceType === 1 ? systemStore.x || systemStore.scene : 100,
  }

  return request
})

// 响应拦截器
request.interceptors.response((response: responseType) => {
  if (response && response.statusCode === 200) {
    clearTimeout(delayed as number)
    delayed = null
    if (loading && !hideLoading) {
      uni.hideLoading()
    }
  } else if (response && response.statusCode === 401) {
    const userStore = useUser(pinia)
    userStore.removeToken()
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      const redirect = getRedirect()
      // href('/pages/common/login/login?redirect=' + encodeURIComponent(redirect))
      navLogin({
        redirect: encodeURIComponent(redirect),
      })
      clearTimeout(timer)
      timer = null
    }, 1000)
    return
  } else {
    clearTimeout(delayed)
    delayed = null
    toast('网络不给力，请稍后再试~')
    return
  }

  if (response?.data && response?.data?.code === 200) {
    return response.data
  } else if (response?.data && response?.data?.code === 400) {
    toast(response.data.message)
  } else {
    console.log('error:!200', response.data.message)
    !hideToast && toast(response.data.message)
  }
})

/**
 * get请求
 * @param string url 请求地址
 * @param string data 请求参数
 * @param object options 接口配置
 */
export const get = (url: string, data?: any, options: ConfigType = {}) => {
  return request.get(url, data, options)
}
/**
 * post请求
 * @param string url 请求地址
 * @param string data 请求参数
 * @param object options 接口配置
 */
export const post = (url: string, data?: any, options: ConfigType = {}) => {
  return request.post(url, data, options)
}

/**
 * 上传文件
 * @param string url 请求地址
 * @param string src 文件路径
 */
export const uploadFile = function (url: string, src: string) {
  showLoading()
  const userStore = useUser(pinia)
  return new Promise((resolve, reject) => {
    const uploadTask = uni.uploadFile({
      url: getBaseURL() + url,
      filePath: src,
      name: 'file',
      header: {
        'X-Access-Token': userStore.access_token,
      },
      formData: {
        file: 'file',
      },
      success: function (res: any) {
        uni.hideLoading()

        try {
          let d = JSON.parse(res.data)

          if (d.code === 200) {
            //返回图片地址
            resolve(d)
          } else {
            toast(d.message)
            resolve(d)
          }
        } catch (error) {
          reject(error)
        }
      },
      fail: function (res: any) {
        reject(res)
        toast(res.message)
      },
    })
  })
}

/**
 * 下载文件
 * @param string url 请求地址
 * @param string src 文件路径
 */
export const downloadFile = function (url: string) {
  return new Promise((resolve, reject) => {
    const download = uni.downloadFile({
      url: url, //仅为示例，并非真实的资源
      success: res => {
        if (res.statusCode === 200) {
          console.log('下载成功:', res)
          resolve(res.tempFilePath)
        }
      },
      fail: e => {
        console.log('下载失败:', e, url)

        reject(e)
      },
    })
  })
}

export const http = {
  get,
  post,
  uploadFile,
}
