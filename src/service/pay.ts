import { get } from '@/common/utils/httpRequest'


// 获取券列表
export const getCouponList = () => {
    return get(`/common/getCouponList`)
  }


// 获取支付参数
export const getPayPageData = (couponCode:string) => {
    return get(`/payment/getPayPageData?couponCode=${couponCode}`)
  }


  // 创建支付订单
export const confirmOrder = (couponCode:string) => {
    return get(`/payment/confirmOrder?couponCode=${couponCode}`)
  }