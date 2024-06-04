export interface ICouponList {
    code: string
    num: number
    originalPrice: number
    discountedPrice: number
    isIndulgence: number
    type:number
  }

  export interface IOrderData {
    timeStamp: string
    nonceStr: string
    packageValue: string
    signType: string
    paySign: string
  }


  export interface ICouponData {
    id: number
    orderId: number
    quantity: number
    rideTripsId: number
    type: number
    createDate:string
    userId:number
    updateDate:string
    status?:string
  }

