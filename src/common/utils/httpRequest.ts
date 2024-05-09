/**
 * 请求，拦截器，文件上传等
 * @author wenqiang
 **/
import Request, { ConfigType } from "@/common/utils/request";
import { showLoading, toast, href, getRedirect } from "@/common/utils/index";
import pinia from "@/store/store";
import { useUser } from "@/store/user";
import { useSystem } from "@/store/systemInfo";

import { getVersion, getBaseURL } from "@/common/utils/config";

import { responseDataType, responseType } from "./interface";
import { navLogin } from "../ts/nav";

export const request = new Request<responseDataType>();

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
let delayed: any = null;
let loading = false;
let hideLoading = false;
let hideToast = false;

let timer: any = null;

// 设置默认配置
request.setConfig((config: ConfigType) => {
  config.baseURL = getBaseURL();

  return config;
});

// 请求拦截
request.interceptors.request((request: any) => {
  const userStore = useUser(pinia);
  const systemStore = useSystem(pinia);
  loading && uni.hideLoading();
  loading = false;
  hideLoading = request.hideLoading;
  hideToast = request.hideToast;
  if (!hideLoading) {
    if (request.isDelay) {
      delayed = setTimeout(() => {
        loading = true;
        showLoading();
      }, 1000);
    } else {
      loading = true;
      showLoading();
    }
  }
  // deviceType 小程序：1，H5：6
  let deviceType = 1;
  // #ifdef H5
  deviceType = 6;
  // #endif

  request.header = {
    "content-type": request.isForm
      ? "application/x-www-form-urlencoded"
      : "application/json",
    "X-Access-Token": userStore.access_token,
    deviceId: userStore.openId,
    version: getVersion(),
    deviceType: deviceType,
    appid: "idme",
    x: deviceType === 1 ? systemStore.x || systemStore.scene : 100,
  };

  // console.log(request);

  return request;
});

// 响应拦截器
request.interceptors.response((response: responseType) => {
  if (response && response.statusCode === 200) {
    clearTimeout(delayed as number);
    delayed = null;
    if (loading && !hideLoading) {
      uni.hideLoading();
    }
  } else {
    clearTimeout(delayed);
    delayed = null;
    // toast(response.errMsg || "网络不给力，请稍后再试~")
    toast("网络不给力，请稍后再试~");
  }

  if (response?.data && response?.data?.code === 501) {
    toast(response.data.message);
    const userStore = useUser(pinia);
    userStore.removeToken();
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      const redirect = getRedirect();
      // href('/pages/common/login/login?redirect=' + encodeURIComponent(redirect))
      navLogin({
        redirect: encodeURIComponent(redirect),
      });
      clearTimeout(timer);
      timer = null;
    }, 1000);
  } else if (response?.data && response.data.code === 502) {
    console.log("error:502", response.data.message);

    !hideToast && toast(response.data.message);
  } else if (
    response?.data &&
    response.data.code !== 200 &&
    response.data.code !== 600 &&
    response.data.code !== undefined &&
    response.data.code !== 0
  ) {
    console.log("error:!200", response.data.message);
    !hideToast && toast(response.data.message);
  }

  return response.data;
});

/**
 * get请求
 * @param string url 请求地址
 * @param string data 请求参数
 * @param object options 接口配置
 */
export const get = (url: string, data?: any, options: ConfigType = {}) => {
  return request.get(url, data, options);
};
/**
 * post请求
 * @param string url 请求地址
 * @param string data 请求参数
 * @param object options 接口配置
 */
export const post = (url: string, data?: any, options: ConfigType = {}) => {
  return request.post(url, data, options);
};

/**
 * 上传文件
 * @param string url 请求地址
 * @param string src 文件路径
 */
export const uploadFile = function (url: string, src: string) {
  showLoading();
  const userStore = useUser(pinia);
  return new Promise((resolve, reject) => {
    const uploadTask = uni.uploadFile({
      url: getBaseURL() + url,
      filePath: src,
      name: "file",
      header: {
        "X-Access-Token": userStore.access_token,
      },
      formData: {
        file: "file",
      },
      success: function (res: any) {
        uni.hideLoading();

        try {
          let d = JSON.parse(res.data);

          if (d.code === 200) {
            //返回图片地址
            resolve(d);
          } else {
            toast(d.message);
            resolve(d);
          }
        } catch (error) {
          reject(error);
        }
      },
      fail: function (res: any) {
        reject(res);
        toast(res.message);
      },
    });
  });
};

/**
 * 下载文件
 * @param string url 请求地址
 * @param string src 文件路径
 */
export const downloadFile = function (url: string) {
  return new Promise((resolve, reject) => {
    const download = uni.downloadFile({
      url: url, //仅为示例，并非真实的资源
      success: (res) => {
        if (res.statusCode === 200) {
          console.log("下载成功:", res);
          resolve(res.tempFilePath);
        }
      },
      fail: (e) => {
        console.log("下载失败:", e, url);

        reject(e);
      },
    });
  });
};

export const http = {
  get,
  post,
  uploadFile,
};

// import axios from 'axios'
// import { getToken, setToken, getRefreshToken } from '@utils/auth'

// // 刷新 access_token 的接口
// const refreshToken = () => {
//   return instance.post('/auth/refresh', { refresh_token: getRefreshToken() }, true)
// }

// // 创建 axios 实例
// const instance = axios.create({
//   baseURL:  process.env.GATSBY_API_URL,
//   timeout: 30000,
//   headers: {
//     'Content-Type': 'application/json',
//   }
// })

// let isRefreshing = false // 标记是否正在刷新 token
// let requests = [] // 存储待重发请求的数组

// instance.interceptors.response.use(response => {
//     return response
// }, error => {
//     if (!error.response) {
//         return Promise.reject(error)
//     }
//     if (error.response.status === 401 && !error.config.url.includes('/auth/refresh')) {
//         const { config } = error
//         if (!isRefreshing) {
//             isRefreshing = true
//             return refreshToken().then(res=> {
//                 const { access_token } = res.data
//                 setToken(access_token)
//                 config.headers.Authorization = `Bearer ${access_token}`
//                 // token 刷新后将数组的方法重新执行
//                 requests.forEach((cb) => cb(access_token))
//                 requests = [] // 重新请求完清空
//                 return instance(config)
//             }).catch(err => {
//                 console.log('抱歉，您的登录状态已失效，请重新登录！')
//                 return Promise.reject(err)
//             }).finally(() => {
//                 isRefreshing = false
//             })
//         } else {
//             // 返回未执行 resolve 的 Promise
//             return new Promise(resolve => {
//                 // 用函数形式将 resolve 存入，等待刷新后再执行
//                 requests.push(token => {
//                     config.headers.Authorization = `Bearer ${token}`
//                     resolve(instance(config))
//                 })
//             })
//         }
//     }
//     return Promise.reject(error)
// })

// // 给请求头添加 access_token
// const setHeaderToken = (isNeedToken) => {
//   const accessToken = isNeedToken ? getToken() : null
//   if (isNeedToken) { // api 请求需要携带 access_token
//     if (!accessToken) {
//       console.log('不存在 access_token 则跳转回登录页')
//     }
//     instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`
//   }
// }

// // 有些 api 并不需要用户授权使用，则无需携带 access_token；默认不携带，需要传则设置第三个参数为 true
// export const get = (url, params = {}, isNeedToken = false) => {
//   setHeaderToken(isNeedToken)
//   return instance({
//     method: 'get',
//     url,
//     params,
//   })
// }

// export const post = (url, params = {}, isNeedToken = false) => {
//   setHeaderToken(isNeedToken)
//   return instance({
//     method: 'post',
//     url,
//     data: params,
//   })
// }
