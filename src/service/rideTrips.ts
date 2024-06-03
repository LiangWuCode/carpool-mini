import { get, post } from '@/common/utils/httpRequest'
import { IPageRequestCommon } from '@/interfaces/common'
import { IGetRideTrips, ISaveRideTrips } from '@/interfaces/rideTrips'

// 获取用户信息
export const publish = (rideTrips: ISaveRideTrips) => {
  return post(`/rideTrips/publish`, rideTrips)
}

// 获取
export const getRideTripsList = (rideTrips: IGetRideTrips) => {
  return get(`/rideTrips/getRideTripsList`, rideTrips)
}

// 获取行程详情
export const getRideTripsDetail = (id: number) => {
  return get(`/rideTrips/${id}`)
}

// 获取我的行程
export const getOwnRideTripsList = (rideTrips: IPageRequestCommon) => {
  return get(`/rideTrips/getOwnRideTripsList`, rideTrips)
}

//置为满座
export const setFullSeat = (rideTripsId: number) => {
  return get(`/rideTrips/setFullSeat?rideTripsId=${rideTripsId}`)
}

//置顶
export const setTop = (rideTripsId: number,topCount:number) => {
  return get(`/rideTrips/setTop?rideTripsId=${rideTripsId}&topCount=${topCount}`)
}