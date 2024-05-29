<template>
  <tm-app ref="app">
    <tm-sheet :margin="[24, 12]" :padding="[40, 40, 40, 20]" :round="3">
      <view class="flex flex-row-center-between pb-10">
        <view class="flex flex-row-center-start">
          <view
            class="mr-20 flex flex-col flex-around"
            style="
              background: linear-gradient(-32deg, #276cf5 0%, #00aaff 100%);
              border-radius: 10rpx;
              width: 160rpx;
              height: 100rpx;
            "
          >
            <view class="ml-16 mt-10">
              <tm-text
                :fontSize="20"
                v-show="payData.type === 1"
                color="white"
                label="充值卡"
              ></tm-text>
              <tm-text
                :fontSize="20"
                v-show="payData.type === 2"
                color="white"
                label="月卡"
              ></tm-text>
            </view>
            <view class="mr-16 flex-end">
              <tm-text :fontSize="24"  v-show="payData.type === 1" color="white" :label="`${payData.num}券`"></tm-text>
              <tm-text :fontSize="24"  v-show="payData.type === 2" color="white" :label="`${payData.num}张`"></tm-text
            ></view>
          </view>
          <view>
            <tm-text
              _class="text-weight-b mb-25 mt-5"
              v-show="payData.type === 1"
              :label="`${payData.num}券充值卡`"
            ></tm-text>
            <tm-text
              _class="text-weight-b mb-25 mt-5"
              v-show="payData.type === 2"
              :label="`月卡`"
            ></tm-text>
            <tm-text _class="mb-5 ml-5" label="x 1" color="grey"></tm-text>
          </view>
        </view>
        <tm-text
          color="black"
          _class="text-weight-b"
          :label="`¥ ${payData.discountedPrice}`"
        ></tm-text>
      </view>
      <tm-divider></tm-divider>
      <view class="flex flex-end pb-10">
        <tm-text color="grey" label="合计："></tm-text>
        <tm-text
          color="orange"
          _class="text-weight-b ml-5"
          :label="`¥ ${payData.discountedPrice}`"
        ></tm-text>
      </view>
    </tm-sheet>
    <tm-sheet :margin="[24, 12]" :padding="[40, 40, 40, 20]" :round="3">
      <tm-text _class="text-weight-b" label="支付方式"></tm-text>
      <tm-divider></tm-divider>
      <view class="flex flex-row-center-between">
        <view class="flex flex-row-center-start py-5">
          <tm-icon _class="mr-20" :size="40" color="green" name="tmicon-weixinzhifu"></tm-icon>
          <tm-text _class="text-weight-b" label="微信支付"></tm-text>
        </view>
        <tm-icon :size="40" color="primary" name="tmicon-check-circle-fill"></tm-icon>
      </view>
    </tm-sheet>
    <tm-sheet :margin="[0]" class="fixed b-0 fulled">
      <tm-button @click="confirmOrderAction(payData.code)" block label="确认支付"></tm-button>
    </tm-sheet>
  </tm-app>
</template>

<script setup lang="ts">
import { requestPayment } from '@/common/utils/base'
import { ICouponList, IOrderData } from '@/interfaces/pay'
import { confirmOrder, getPayPageData } from '@/service/pay'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

const payData = ref<ICouponList>({
  code: '',
  num: 0,
  originalPrice: 0,
  discountedPrice: 0,
  isIndulgence: 0,
  type: 1,
})
const getPayPageDataAction = async (code: string) => {
  const res = await getPayPageData(code)
  if (res) {
    payData.value = res.data as ICouponList
  }
}

const confirmOrderAction = async (code: string) => {
  const res = await confirmOrder(code)
  if (res) {
    const orderData = res.data as IOrderData
    requestPayment({
      provider: 'wxpay',
      timeStamp: orderData.timeStamp,
      nonceStr: orderData.nonceStr,
      package: orderData.packageValue,
      signType: orderData.signType,
      paySign: orderData.paySign,
      success: (resSuccess: any) => {
        uni.showToast({
          icon: 'none',
          title: '购买券支付成功！',
        })
        uni.navigateBack({
          delta: 1,
        })
      },
      fail: (resError: any) => {
        console.log(resError)
        uni.showToast({
          icon: 'none',
          title: '购买券支付失败',
        })
      },
    })
  }
}

onLoad((option: any) => {
  getPayPageDataAction(option.code as string)
})
</script>

<style></style>
