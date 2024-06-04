import { del, get, post } from '@/common/utils/httpRequest'
import { IPageRequestCommon } from '@/interfaces/common'
import { IRideMessage } from '@/interfaces/message'

// 新增留言
export const rideMessageAdd = (rideMessage: IRideMessage) => {
  return post(`/rideMessages/add`, rideMessage)
}

// 获取自己的留言列表
export const getOwnRideMessageList = (rideMessage: IPageRequestCommon) => {
  return get(`/rideMessages/getOwnRideMessageList`, rideMessage)
}

//删除留言
export const deleteRideMessageById = (messageId:number) => {
  return del(`/rideMessages/deleteRideMessageById?messageId=${messageId}`)
}

