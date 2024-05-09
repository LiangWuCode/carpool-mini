import { defineStore, acceptHMRUpdate } from 'pinia'

export const useSystem = defineStore({
  /**
   * 仓库id是唯一标识
   *
   */
  id: 'system',
  /**
   * 存储全局状态
   * 1.必须是箭头函数: 为了在服务器端渲染的时候避免交叉请求导致数据状态污染
   * 和 TS 类型推导
   *
   */
  state: () => {
    return {
      systemInfo: {
        statusBarHeight: 0,
        screenWidth: 0,
        screenHeight: 0,
        safeAreaInsets: {
          top: 0,
          bottom: 0,
        },
        platform: 'ios',
      },
      menuButtonInfo: {
        left: 0,
        right: 0,
        top: 0, // 胶囊距底部间距（保持底部间距一致）
        bottom: 0,
        width: 0, // 胶囊宽度
        height: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致）
      },
      edition: true, // 微信审核使用

      tabBarType: 'index', // 自定义 tabbar 选中项
      tabBarOptions: { secondTabActive: '' }, // 自定义 tabbar 额外参数

      pages: [], // 手动维护 页面路由
      navType: 'redirectTo', // 跳转方式

      scene: 0, // 场景值
      x: 0, // 特殊二维码附加参数
    }
  },
  /**
   * 用来封装计算属性 有缓存功能  类似于computed
   *
   */
  getters: {
    // 导航栏高度
    getNavBarHeight: (state) => {
      // console.log(state.systemInfo);
      // console.log(state.menuButtonInfo);
      // return state.systemInfo.statusBarHeight + 44
      return state.systemInfo.statusBarHeight + 44 + 6
    },
    // 胶囊距右方间距（方保持左、右间距一致）
    getMenuRight: (state) => {
      let right: number = 0
      // #ifndef APP-PLUS || H5 || APP-PLUS-NVUE
      right = state.systemInfo.screenWidth - state.menuButtonInfo.right
      // #endif

      return right
    },
    // 获取原生导航高度
    getStatusBarHeight: (state) => {
      // return state.systemInfo.statusBarHeight + 44
      // #ifdef H5
      return state.systemInfo.statusBarHeight + 44 + 6 + 10
      // #endif

      return state.systemInfo.statusBarHeight + 44 + 6
    },
    // 胶囊按钮的高度
    getMenuButtonHeight: (state) => {
      let height: number = 0
      // #ifndef APP-PLUS || H5 || APP-PLUS-NVUE
      height = state.systemInfo.screenWidth - state.menuButtonInfo.right
      // #endif

      // #ifdef APP-PLUS || APP-PLUS-NVUE
      height = state.systemInfo.statusBarHeight
      // #endif

      return height
    },
    //获取当前的平台(终端类型 1 android 2 ios 3 h5 4 微信小程序 5 web)
    getPlatform: (state) => {
      //默认web
      let platform = 5
      //#ifdef APP-PLUS || APP-NVUE
      if (state.systemInfo.platform === 'ios') {
        platform = 1
      } else {
        platform = 2
      }
      //#endif

      //#ifdef H5
      platform = 3
      //#endif

      //#ifdef MP-WEIXIN
      platform = 4
      //#endif
      return platform
    },
    // 判断是否为全面屏
    isFullSucreen: (state) => {
      const { screenHeight, safeArea, statusBarHeight }: any = state.systemInfo

      if (screenHeight - safeArea.height > 40) return true
      return false
    },
  },
  /**
   * 编辑业务逻辑  类似于methods
   */
  actions: {
    setSystemInfo(info: any) {
      this.systemInfo = info
    },
    setMenuButtonInfo(info: any) {
      this.menuButtonInfo = info
    },
    setEdition(val: boolean) {
      this.edition = val
    },
    setTabBarType(type: string) {
      this.tabBarType = type
    },
    pagesPush(nav: string) {
      this.pages.push(nav as never)
    },
  },
})

// 添加热更新
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSystem, import.meta.hot))
}
