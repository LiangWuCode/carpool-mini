import { get, post } from '@/common/utils/httpRequest'
import { IChangeUserInfo } from '@/interfaces/common'

// 获取用户信息
export const getUserInfo = () => {
  return get(`/user/getUserInfo`)
}

// 更改头像和昵称
export const changePersonInfo = (info:IChangeUserInfo ) => {
  return post(`/user/changePersonInfo`, info)
}
