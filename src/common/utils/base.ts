// (taro)引入必须这么引入，可减少打包体积

import { checkIsWechatBrowser } from './index'

/**
 * 使手机发生较短时间的振动（15ms）
 *
 * 文档: [http://uniapp.dcloud.io/api/system/vibrate?id=vibrateshort](http://uniapp.dcloud.io/api/system/vibrate?id=vibrateshort)
 */
export const getAccountInfoSync = (data = {}) => {
  // #ifndef APP | H5
  const accountInfo = uni.getAccountInfoSync()
  console.log(accountInfo)
  return accountInfo
  // #endif
}

/**
 * 使手机发生较短时间的振动（15ms）
 *
 * 文档: [http://uniapp.dcloud.io/api/system/vibrate?id=vibrateshort](http://uniapp.dcloud.io/api/system/vibrate?id=vibrateshort)
 */
export const vibrateShort = (data = {}) => {
  // #ifdef MP-WEIXIN
  uni.vibrateShort(data)
  // #endif
}

/**
 * 获取用户信息
 *
 * 文档: [http://uniapp.dcloud.io/api/plugins/login?id=getUserProfile](http://uniapp.dcloud.io/api/plugins/login?id=getUserProfile)
 */
export const getUserProfile = (data: any) => {
  uni.getUserProfile(data)
}

/**
 * 显示操作菜单
 *
 * 文档: [http://uniapp.dcloud.io/api/ui/prompt?id=showactionsheet](http://uniapp.dcloud.io/api/ui/prompt?id=showactionsheet)
 */
export const showActionSheet = (data: any) => {
  uni.showActionSheet(data)
}

/**
 * 停止当前页面下拉刷新
 *
 * 文档: [http://uniapp.dcloud.io/api/ui/pulldown?id=stoppulldownrefresh](http://uniapp.dcloud.io/api/ui/pulldown?id=stoppulldownrefresh)
 */
export const stopPullDownRefresh = () => {
  uni.stopPullDownRefresh()
}

/**
 * 登录
 *
 * 文档: [http://uniapp.dcloud.io/api/plugins/login?id=login](http://uniapp.dcloud.io/api/plugins/login?id=login)
 */
export const login = () => {
  return new Promise((resolve, reject) => {
    uni.login({
      success: (res: any) => resolve(res),
      fail: (err: any) => reject(err),
    })
  })
}

// 路由跳转 start
/**
 * 关闭当前页面，跳转到应用内的某个页面
 *
 * 文档: [http://uniapp.dcloud.io/api/router?id=redirectto](http://uniapp.dcloud.io/api/router?id=redirectto)
 */
export const redirectTo = (params: any) => {
  uni.redirectTo(params)
}
/**
 * 关闭所有页面，打开到应用内的某个页面
 *
 * 文档: [http://uniapp.dcloud.io/api/router?id=relaunch](http://uniapp.dcloud.io/api/router?id=relaunch)
 */
export const reLaunch = (params: any) => {
  uni.reLaunch(params)
}
/**
 * 保留当前页面，跳转到应用内的某个页面
 *
 * 文档: [http://uniapp.dcloud.io/api/router?id=navigateto](http://uniapp.dcloud.io/api/router?id=navigateto)
 */
export const navigateTo = (params: any) => {
  uni.navigateTo(params)
}
/**
 * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
 *
 * 文档: [http://uniapp.dcloud.io/api/router?id=switchtab](http://uniapp.dcloud.io/api/router?id=switchtab)
 */
export const switchTab = (params: any) => {
  uni.switchTab(params)
}
/**
 * 关闭当前页面，返回上一页面或多级页面
 *
 * 文档: [http://uniapp.dcloud.io/api/router?id=navigateback](http://uniapp.dcloud.io/api/router?id=navigateback)
 */
export const navigateBack = (params?: any) => {
  uni.navigateBack({
    delta: 1,
    ...params,
  })
}

// 路由跳转 end

/**
 * 同步获取系统信息
 *
 * 文档: [http://uniapp.dcloud.io/api/system/info?id=getsysteminfosync](http://uniapp.dcloud.io/api/system/info?id=getsysteminfosync)
 */
export const getSystemInfoSync = () => {
  return uni.getSystemInfoSync()
}

/**
 * 异步获取系统信息
 *
 * 文档: [http://uniapp.dcloud.io/api/system/info?id=getsysteminfo](http://uniapp.dcloud.io/api/system/info?id=getsysteminfo)
 */
export const getSystemInfo = (options: any) => {
  return uni.getSystemInfo(options)
}

// 提示框 start
export interface IShowToast {
  // 是否自动隐藏
  autoHide?: boolean
}

// 模态对话框
/**
 * 显示模态弹窗
 *
 * 文档: [http://uniapp.dcloud.io/api/ui/prompt?id=showmodal](http://uniapp.dcloud.io/api/ui/prompt?id=showmodal)
 */
export const showModal = (params: any) => {
  uni.showModal(params)
}

/**
 * 隐藏消息提示框
 *
 * 文档: [http://uniapp.dcloud.io/api/ui/prompt?id=hidetoast](http://uniapp.dcloud.io/api/ui/prompt?id=hidetoast)
 */
export const hideToast = () => {
  uni.hideToast()
}

/**
 * 显示消息提示框
 *
 * 文档: [http://uniapp.dcloud.io/api/ui/prompt?id=showtoast](http://uniapp.dcloud.io/api/ui/prompt?id=showtoast)
 */
export const showToast = (data: any, params?: IShowToast): void => {
  uni.showToast(data)

  if (params?.autoHide) {
    setTimeout(() => {
      hideToast()
    }, 2000)
  }
}
// 提示框 end

// 加载提示框 start

/**
 * 显示 loading 提示框
 *
 * 文档: [http://uniapp.dcloud.io/api/ui/prompt?id=showloading](http://uniapp.dcloud.io/api/ui/prompt?id=showloading)
 */
export const showLoading = (data?: any) => {
  uni.showLoading({
    title: '请稍等...',
    ...data,
  })
}

/**
 * 隐藏 loading 提示框
 *
 * 文档: [http://uniapp.dcloud.io/api/ui/prompt?id=hideloading](http://uniapp.dcloud.io/api/ui/prompt?id=hideloading)
 */
export const hideLoading = () => {
  uni.hideLoading()
}
// 加载提示框 end

// 缓存操作 start
/**
 * 从本地缓存中同步获取指定 key 对应的内容
 *
 * 文档: [http://uniapp.dcloud.io/api/storage/storage?id=getstoragesync](http://uniapp.dcloud.io/api/storage/storage?id=getstoragesync)
 */
export const getStorageSync = (key: string) => {
  return uni.getStorageSync(key)
}
/**
 * 从本地缓存中同步移除指定 key
 *
 * 文档: [http://uniapp.dcloud.io/api/storage/storage?id=removestoragesync](http://uniapp.dcloud.io/api/storage/storage?id=removestoragesync)
 */
export const removeStorageSync = (key: string) => {
  uni.removeStorageSync(key)
}
/**
 * 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口
 *
 * 文档: [http://uniapp.dcloud.io/api/storage/storage?id=setstoragesync](http://uniapp.dcloud.io/api/storage/storage?id=setstoragesync)
 */
export const setStorageSync = (key: string, data: any): void => {
  uni.setStorageSync(key, data)
}
/**
 * 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口
 *
 * 文档: [http://uniapp.dcloud.io/api/storage/storage?id=setstorage](http://uniapp.dcloud.io/api/storage/storage?id=setstorage)
 */
export const setStorage = (key: string, data: any): void => {
  uni.setStorage({
    key,
    data,
  })
}
// 缓存操作 end

// 支付 start
/**
 * 支付
 *
 * 文档: [http://uniapp.dcloud.io/api/plugins/payment?id=requestpayment](http://uniapp.dcloud.io/api/plugins/payment?id=requestpayment)
 */
export const requestPayment = (params: any) => {
  uni.requestPayment(params)
}
// 支付 end

// ajax start
/**
 * 添加拦截器
 *
 * 文档: [http://uniapp.dcloud.io/api/interceptor](http://uniapp.dcloud.io/api/interceptor)
 */
export const addInterceptor = (api: string, params: any) => {
  uni.addInterceptor(api, params)
}
/**
 * 发起网络请求
 *
 * 文档: [http://uniapp.dcloud.io/api/request/request?id=request](http://uniapp.dcloud.io/api/request/request?id=request)
 */
export const http = (params: any) => {
  return uni.request(params)
}
// ajax end

// 设备 start

/**
 * 拨打电话
 *
 * 文档: [http://uniapp.dcloud.io/api/system/phone?id=makephonecall](http://uniapp.dcloud.io/api/system/phone?id=makephonecall)
 */
export const makePhone = (params: any) => {
  // TODO 待全端测试
  uni.makePhoneCall(params)
}
// 设备 end

// 导航相关 start

/**
 * 动态设置当前页面的标题
 *
 * 文档: [http://uniapp.dcloud.io/api/ui/navigationbar?id=setnavigationbartitle](http://uniapp.dcloud.io/api/ui/navigationbar?id=setnavigationbartitle)
 */
export const setNavigationBarTitle = (params: any) => {
  // TODO 待全端测试
  uni.setNavigationBarTitle(params)
}

// 导航相关 end

/**
 * 隐藏 tabBar
 *
 * 文档: [http://uniapp.dcloud.io/api/ui/tabbar?id=hidetabbar](http://uniapp.dcloud.io/api/ui/tabbar?id=hidetabbar)
 */
export const hideTabBar = () => {
  uni.hideTabBar()
}

/**
 * 显示 tabBar
 *
 * 文档: [http://uniapp.dcloud.io/api/ui/tabbar?id=showtabbar](http://uniapp.dcloud.io/api/ui/tabbar?id=showtabbar)
 */
export const showTabBar = () => {
  uni.showTabBar()
}
/**
 * 为 tabBar 某一项的右上角添加文本
 *
 * 文档: [http://uniapp.dcloud.io/api/ui/tabbar?id=settabbarbadge](http://uniapp.dcloud.io/api/ui/tabbar?id=settabbarbadge)
 */
export const setTabBarBadge = (options: any) => {
  uni.setTabBarBadge(options)
}
/**
 * 移除 tabBar 某一项右上角的文本
 *
 * 文档: [http://uniapp.dcloud.io/api/ui/tabbar?id=removetabbarbadge](http://uniapp.dcloud.io/api/ui/tabbar?id=removetabbarbadge)
 */
export const removeTabBarBadge = (options: any) => {
  uni.removeTabBarBadge(options)
}
/**
 * 显示 tabBar 某一项的右上角的红点
 *
 * 文档: [http://uniapp.dcloud.io/api/ui/tabbar?id=showtabbarreddot](http://uniapp.dcloud.io/api/ui/tabbar?id=showtabbarreddot)
 */
export const showTabBarRedDot = (options: any) => {
  uni.showTabBarRedDot(options)
}
/**
 * 隐藏 tabBar 某一项的右上角的红点
 *
 * 文档: [http://uniapp.dcloud.io/api/ui/tabbar?id=hidetabbarreddot](http://uniapp.dcloud.io/api/ui/tabbar?id=hidetabbarreddot)
 */
export const hideTabBarRedDot = (options: any) => {
  uni.hideTabBarRedDot(options)
}
/**
 * 监听中间按钮的点击事件
 *
 * 文档: [http://uniapp.dcloud.io/api/ui/tabbar?id=ontabbarmidbuttontap](http://uniapp.dcloud.io/api/ui/tabbar?id=ontabbarmidbuttontap)
 */
export const onTabBarMidButtonTap = (callback: any) => {
  uni.onTabBarMidButtonTap(callback)
}

/**
 * 设置系统剪贴板的内容
 *
 * 文档: [http://uniapp.dcloud.io/api/system/clipboard?id=setclipboarddata](http://uniapp.dcloud.io/api/system/clipboard?id=setclipboarddata)
 */
export const setClipboardData = (str: any, toast: string) => {
  uni.setClipboardData({
    data: str,
    success: function () {
      showToast({
        title: toast,
      })
    },
  })
}

/**
 * 上传文件
 *
 * 文档: [http://uniapp.dcloud.io/api/request/network-file?id=uploadfile](http://uniapp.dcloud.io/api/request/network-file?id=uploadfile)
 */
export const uploadFile = (options: any) => {
  uni.uploadFile(options)
}

/**
 * 从本地相册选择图片或使用相机拍照
 *
 * 文档: [http://uniapp.dcloud.io/api/media/image?id=chooseimage](http://uniapp.dcloud.io/api/media/image?id=chooseimage)
 */
export const chooseImage = (options: any) => {
  uni.chooseImage(options)
}

/**
 * 显示分享按钮
 *
 * 文档: [http://uniapp.dcloud.io/api/plugins/share?id=showsharemenu](http://uniapp.dcloud.io/api/plugins/share?id=showsharemenu)
 */
export const showShareMenu = (params: any) => {
  return uni.showShareMenu(params)
}

/**
 * 获取全局唯一的文件管理器
 *
 * 最低基础库： `1.9.9`
 *
 * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/file/wx.getFileSystemManager.html](https://developers.weixin.qq.com/miniprogram/dev/api/file/wx.getFileSystemManager.html)
 */
export const getFileSystemManager = () => {
  return uni.getFileSystemManager()
}

/**
 * 获取用户的当前设置
 *
 * 文档: [http://uniapp.dcloud.io/api/other/setting?id=getsetting](http://uniapp.dcloud.io/api/other/setting?id=getsetting)
 */
export const getSetting = (params: any) => {
  uni.getSetting(params)
}

/**
 * 获取服务供应商
 *
 * 文档: [http://uniapp.dcloud.io/api/plugins/provider?id=getprovider](http://uniapp.dcloud.io/api/plugins/provider?id=getprovider)
 */
export const getProvider = (params: any) => {
  return uni.getProvider(params)
}

/**
 * 获取用户信息
 *
 * 文档: [http://uniapp.dcloud.io/api/plugins/login?id=getuserinfo](http://uniapp.dcloud.io/api/plugins/login?id=getuserinfo)
 */
export const getUserInfo = (params: any) => {
  return uni.getUserInfo(params)
}

/**
 * 调起客户端小程序设置界面，返回用户设置的操作结果
 *
 * 文档: [http://uniapp.dcloud.io/api/other/authorize?id=opensetting](http://uniapp.dcloud.io/api/other/authorize?id=opensetting)
 */
export const openSetting = (params: any) => {
  uni.openSetting(params)
}

/**
 * 预览图片
 *
 * 文档: [http://uniapp.dcloud.io/api/media/image?id=getimageinfo](http://uniapp.dcloud.io/api/media/image?id=getimageinfo)
 */
export const getImageInfo = (params: any) => {
  uni.getImageInfo(params)
}

/**
 * 将 Base64 字符串转成 ArrayBuffer 对象
 *
 * 文档: [http://uniapp.dcloud.io/api/base64ToArrayBuffer?id=base64toarraybuffer](http://uniapp.dcloud.io/api/base64ToArrayBuffer?id=base64toarraybuffer)
 */
export const base64ToArrayBuffer = (params: any) => {
  return uni.base64ToArrayBuffer(params)
}

/**
 * 保存图片到系统相册
 *
 * 文档: [http://uniapp.dcloud.io/api/media/image?id=saveimagetophotosalbum](http://uniapp.dcloud.io/api/media/image?id=saveimagetophotosalbum)
 */
export const saveImageToPhotosAlbum = (params: any) => {
  // #ifndef H5
  uni.saveImageToPhotosAlbum(params)
  // #endif

  // #ifdef H5
  console.log('是否为微信环境: ', checkIsWechatBrowser())

  if (checkIsWechatBrowser()) {
    hideLoading()
    return showToast({
      title: '长按图片保存到相册',
      icon: 'none',
    })
  }

  const a = document.createElement('a')
  a.download = params.filePath.replace(/(.*\/)*([^.]+.*)/gi, '$2').split('?')[0] // 设置下载的文件名，默认是'下载'
  a.href = params.filePath
  console.log(a)

  document.body.appendChild(a)
  a.click()
  a.remove() // 下载之后把创建的元素删除
  // #endif
}

/**
 * 获取本次启动时的参数。返回值与App.onLaunch的回调参数一致
 *
 * 文档: [http://uniapp.dcloud.io/api/plugins/getLaunchOptionsSync](http://uniapp.dcloud.io/api/plugins/getLaunchOptionsSync)
 */
export const getLaunchOptionsSync = () => {
  return uni.getLaunchOptionsSync()
}

/**
 * 返回一个SelectorQuery对象实例 获取元素
 *
 * 文档: [http://uniapp.dcloud.io/api/ui/nodes-info?id=createselectorquery](http://uniapp.dcloud.io/api/ui/nodes-info?id=createselectorquery)
 */
export const createSelectorQuery = () => {
  // TODO 待全端测试
  return uni.createSelectorQuery()
}

/**
 * 创建一个动画实例
 *
 * 文档: [http://uniapp.dcloud.io/api/ui/animation?id=createanimation](http://uniapp.dcloud.io/api/ui/animation?id=createanimation)
 */
export const createAnimation = (options: any) => {
  return uni.createAnimation(options)
}

/**
 * 设置导航条颜色
 *
 * 文档: [http://uniapp.dcloud.io/api/ui/navigationbar?id=setnavigationbarcolor](http://uniapp.dcloud.io/api/ui/navigationbar?id=setnavigationbarcolor)
 */
export const setNavigationBarColor = (options: any) => {
  uni.setNavigationBarColor(options)
}

/**
 * 创建并返回一个 IntersectionObserver 对象实例
 *
 * 文档: [http://uniapp.dcloud.io/api/ui/intersection-observer?id=createintersectionobserver](http://uniapp.dcloud.io/api/ui/intersection-observer?id=createintersectionobserver)
 */
export const createIntersectionObserver = (component: any, options?: any) => {
  return uni.createIntersectionObserver(component, options)
}

/**
 * 获取小程序下该菜单按钮的布局位置信息
 *
 * 文档: [http://uniapp.dcloud.io/api/ui/menuButton?id=getmenubuttonboundingclientrect](http://uniapp.dcloud.io/api/ui/menuButton?id=getmenubuttonboundingclientrect)
 */
export const getMenuButtonBoundingClientRect = () => {
  let menuButtonInfo: any = {}
  // #ifndef APP-PLUS || H5
  menuButtonInfo = uni.getMenuButtonBoundingClientRect()
  // #endif

  return menuButtonInfo
}

/**
 * 将页面滚动到目标位置
 *
 * 文档: [http://uniapp.dcloud.io/api/ui/scroll?id=pagescrollto](http://uniapp.dcloud.io/api/ui/scroll?id=pagescrollto)
 */
export const pageScrollTo = (options: any) => {
  uni.pageScrollTo(options)
}

// 获取当前时间的多少天前
export const GetDateStr = (AddDayCount: any) => {
  var dd = new Date()
  dd.setDate(dd.getDate() + AddDayCount) //获取AddDayCount天后的日期
  var y = dd.getFullYear()
  var m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 //获取当前月份的日期，不足10补0
  var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() //获取当前几号，不足10补0
  return y + '/' + m + '/' + d
}

// 获取当前的地理位置
export const getLocation = () => {
  /**
   * type
   * wgs84 返回gps坐标
   * gcj02 返回可用于 uni.openLocation 的坐标
   */
  return new Promise((resolve, reject) => {
    const UnigetLocation = () => {
      uni.getLocation({
        type: 'wgs84',
        altitude: true,
        isHighAccuracy: true,
        success: async (res: any) => {
          const { longitude, latitude } = res
          resolve({
            type: 'geocode',
            longitude,
            latitude,
          })
        },
        fail: () => {
          reject({
            errMsg: 'getLocation 接口调用失败',
          })
        },
      })
    }

    // #ifdef H5
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position: any) => {
          const { longitude, latitude } = position.coords
          resolve({
            type: 'geocode',
            longitude,
            latitude,
          })
        },
        () => {
          showToast('获取位置失败')
          // switch (code) {
          //   case 0:
          //     showToast('不包括其他错误编号中的错误')
          //     break;
          //   case 1:
          //     showToast('用户拒绝浏览器获取位置信息')
          //     break;
          //   case 2:
          //     showToast('尝试获取用户信息，但失败了')
          //     break;
          //   case 3:
          //     showToast('设置了timeout值，获取位置超时了')
          //     break;
          // }
          reject({
            errMsg: '获取位置信息失败 -- h5',
          })
        },
        {
          timeout: 3000,
        }
      )
    } else {
      showToast('不支持定位')
      reject({
        errMsg: '该 navigator.geolocation API 不被支持 -- h5',
      })
    }
    // #endif

    // #ifndef H5
    getSetting({
      success: (setting: any) => {
        const { authSetting } = setting
        if (authSetting['scope.userLocation']) {
          UnigetLocation()
        } else {
          uni.authorize({
            scope: 'scope.userLocation',
            success() {
              UnigetLocation()
            },
            fail() {
              showModal({
                content: '请允许小程序使用位置服务',
                success: (res: any) => {
                  const { confirm, cancel } = res
                  if (confirm) {
                    uni.openSetting({
                      success(result: any) {
                        const { authSetting } = result
                        if (authSetting['scope.userLocation']) {
                          UnigetLocation()
                        } else {
                          showToast('未成功授权')
                          reject({
                            errMsg: '用户手动授权失败',
                          })
                        }
                      },
                    })
                  } else if (cancel) {
                    reject({
                      errMsg: '用户关闭手动授权',
                    })
                  }
                },
              })
            },
          })
        }
      },
    })
    // #endif
  })
}

/**
 * 调起客户端小程序设置界面，返回用户设置的操作结果
 *
 * 文档: [http://uniapp.dcloud.io/api/other/open-miniprogram?id=navigatetominiprogram](http://uniapp.dcloud.io/api/other/open-miniprogram?id=navigatetominiprogram)
 */
export const navigateToMiniProgram = (options: any) => {
  uni.navigateToMiniProgram(options)
}

/**
 * 预览图片
 *
 * 文档: [http://uniapp.dcloud.io/api/media/image?id=previewimage](http://uniapp.dcloud.io/api/media/image?id=previewimage)
 */
export const previewImage = (options: any) => {
  uni.previewImage(options)
}

/**
 * 创建并返回 audio 上下文 audioContext 对象
 *
 * 文档: [http://uniapp.dcloud.io/api/media/audio-context?id=createinneraudiocontext](http://uniapp.dcloud.io/api/media/audio-context?id=createinneraudiocontext)
 */
export const createInnerAudioContext = () => {
  return uni.createInnerAudioContext()
}
