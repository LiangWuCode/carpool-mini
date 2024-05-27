import { loginAction } from '@/service/login'
import { checkIsWechatBrowser, getRedirect } from '../utils'
import { reLaunch } from '../utils/base'
import pinia from '@/store/store'
import { useUser } from '@/store/user'
import { IUserInfo } from '@/interfaces/common'
import { getUserInfo } from '@/service/user'

// 登录
export const navLogin = async (options: any = {}, isLogin: boolean = true) => {
  console.log(options)
  const userStore = useUser(pinia)
  const isLogined = userStore.isLogined()
  //当前小程序登录为静默形式
  if (isLogin && !isLogined) {
   await uni.login({
      provider: 'weixin',
      success: async function (loginRes) {
        if (loginRes.errMsg === 'login:ok') {
          const res = await loginAction(loginRes.code)
          userStore.setUserInfo(res.data as IUserInfo)
          reLaunch({
            url: options.redirect,
          })
        }
      },
    })
  }
}

export const getUserInfoAction = async () => {
  const userStore = useUser(pinia)
  const res = await getUserInfo()
  if (res) {
    userStore.setUserInfo(res.data as IUserInfo)
  }
}
