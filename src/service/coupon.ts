import { get} from '@/common/utils/httpRequest'

//获取赠送券列表
export const getGiftCoupon = (types: string) => {
  return get(`/sysCoupons/getGiftCoupon?types=${types}`)
}

// 领取赠送券
export const collectCoupon = (ids: string) => {
  return get(`/orderDetails/collectCoupon?types=${ids}`)
}
