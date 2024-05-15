import { get, post } from '@/common/utils/httpRequest'

// 获取用户信息
export const getUserInfo = () => {
  return get(`/user/getUserInfo`)
}

// 更改头像和昵称
export const changePersonInfo = (info: {
  avatarUrl: string
  userName: string
  photo: string
  sex: number
  chatInfo: string
}) => {
  return post(`/user/changePersonInfo`, info)
}
