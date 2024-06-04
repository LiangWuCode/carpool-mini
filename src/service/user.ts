import { get, post } from '@/common/utils/httpRequest'
import { IChangeUserInfo, IPageRequestCommon } from '@/interfaces/common'

// 获取用户信息
export const getUserInfo = () => {
  return get(`/user/getUserInfo`)
}

// 更改头像和昵称
export const changePersonInfo = (info: IChangeUserInfo) => {
  return post(`/user/changePersonInfo`, info)
}

// 获取用户消费情况
export const getOwnCouponList = (orderDetails: IPageRequestCommon) => {
  return get(`/orderDetails/getOwnCouponList`, orderDetails)
}

// 获取用户卡券列表
export const getCardList = (orderDetails: IPageRequestCommon) => {
  return get(`/orderDetails/getCardList`, orderDetails)
}
