import { IPageRequestCommon } from './common'

export interface ISaveRideTrips {
  startAddress: string
  channelAddress: string
  endAddress: string
  startDate: string
  seats: string
  notes: string
  sex: number
  mobile: string
  chatInfo: string
  username: string
  topCount: number
  type: number
}

export interface IGetRideTrips extends IPageRequestCommon {
  type: number
  startAddress: string
  endAddress: string
}

export interface IRideTripsList {
  id?: number
  type: number
  startAddress: string
  channelAddress: string
  endAddress: string
  startDate?: string
  seats: number
  notes: string
  mobile: string
  status?: number
  viewCount: number
  avatar?: string
  createDateDesc: string
  messageCount: number
  isTop?: number
  shareImageUrl?: string
  source?:number
  groupRemark?: string
  seatShow?:number
}

export interface IPoint {
  latitude: number
  longitude: number
}

export interface IRideMessage {
  id: number
  userId: number
  content: string
  readStatus: number
  avatar: string
  username: string
  createDateDesc: string
  type?: number
  rideTripsId?: number
  rideMessageVoList: Array<IRideMessage>
}

export interface IRideTripsDetail extends IRideTripsList {
  duration: string
  distance: number
  chatInfo: string
  polyline: Array<number>
  username: string
  mobileEllipsis: string
  chatInfoEllipsis: string
  rideMessageVos: Array<IRideMessage>
}

export interface IOwnRideTripsList {
  id: number
  type: number
  startAddress: string
  channelAddress: string
  endAddress: string
  startDate: string
  seats: number
  notes: string
  status: number
  createDateDesc: string
  isTop: number
}
