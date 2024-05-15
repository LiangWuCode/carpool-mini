import { get, post } from '@/common/utils/httpRequest'
import { ISaveRideTrips } from '@/interfaces/rideTrips'

// 获取用户信息
export const publish = (rideTrips:ISaveRideTrips) => {
    return post(`/rideTrips/publish`,rideTrips)
  }