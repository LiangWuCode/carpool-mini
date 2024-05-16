import { IPageRequestCommon } from "./common"


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

export interface IGetRideTrips extends IPageRequestCommon{
  type:number
  startAddress: string
  endAddress: string
}

export type IRideTripsList={
        id: number
        type: number
        startAddress: string
        channelAddress:string
        endAddress:string
        startDate:string
        seats:number
        notes:string
        mobile:string
        status:number
        viewCount:number
        avatar:string
        createDateDesc:string
        messageCount:number
        isTop:number
}


export interface IPoint{
  latitude:number
  longitude:number
} 