import { get, post } from '@/common/utils/httpRequest'
import { IRideMessage } from '@/interfaces/message'


// 获取用户信息
export const rideMessageAdd = (rideMessage:IRideMessage) => {
    return post(`/rideMessages/add`,rideMessage)
  }