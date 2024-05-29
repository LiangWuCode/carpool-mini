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
