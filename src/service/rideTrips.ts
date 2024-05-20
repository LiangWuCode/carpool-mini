import { get, post } from '@/common/utils/httpRequest'
import { IGetRideTrips, ISaveRideTrips } from '@/interfaces/rideTrips'

// 获取用户信息
export const publish = (rideTrips:ISaveRideTrips) => {
    return post(`/rideTrips/publish`,rideTrips)
  }


// 获取
export const getRideTripsList = (rideTrips:IGetRideTrips) => {
  return get(`/rideTrips/getRideTripsList`,rideTrips)
}


// 获取行程详情
export const getRideTripsDetail = (id:number) => {
  return get(`/rideTrips/${id}`)
}