import { IUserInfo } from '@/interfaces/common'
import { defineStore, acceptHMRUpdate } from 'pinia'

const userBase = {
  nickName: '',
  avatar: '',
  token: '',
  chatInfo: '',
  couponCount: 0,
  mobile: '',
  rideCount: 0,
  sex: 1,
  cardCount: 0,
  residueCount: 0,
}
export const useUser = defineStore({
  /**
   * 仓库id是唯一标识
   *
   */
  id: 'user',
  /**
   * 存储全局状态
   * 1.必须是箭头函数: 为了在服务器端渲染的时候避免交叉请求导致数据状态污染
   * 和 TS 类型推导
   *
   */
  state: () => {
    return {
      userInfo: { ...userBase },
      provider: '',
    }
  },
  /**
   * 用来封装计算属性 有缓存功能  类似于computed
   *
   */
  getters: {},
  /**
   * 编辑业务逻辑  类似于methods
   */
  actions: {
    setUser(result: any) {
      this.userInfo = result
    },
    setUserInfo(info: IUserInfo) {
      this.userInfo = info
    },
    removeToken() {
      this.userInfo = { ...userBase }
    },
    logout() {
      this.removeToken()
    },
    setProvider(provider: string) {
      this.provider = provider
    },
    isLogined() {
      return this.userInfo.token ? true : false
    },
    isAuth() {
      return !!this.userInfo.token && !!this.userInfo.nickName && !!this.userInfo.avatar
    },
  },
  // 持久化存储
  persist: {
    enabled: true,
    detached: true, // 设置订阅与组件分离
    H5Storage: window?.localStorage,
  },
})

// 添加热更新
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot))
}
