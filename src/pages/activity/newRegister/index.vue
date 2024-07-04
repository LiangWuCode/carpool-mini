<template>
  <tm-app ref="app">
    <view class="relative">
      <view>
        <img
          src="https://healthy.wuliang.plus/active/newRegisterBackground3.png"
          style="width: 100vw; height: 100vh"
        />
      </view>
      <view class="absolute flex flex-center fulled" style="bottom: 36%">
        <tm-button
          :width="300"
          color="red"
          :round="10"
          :shadow="0"
          size="small"
          :disabled="newRegisterFlag"
          :label="newRegisterFlag ? `已领取` : `立即领取`"
          @click="collectCouponAction"
        ></tm-button>
      </view>

      <view
        class="absolute"
        style="width: 80rpx; height: 36rpx; background-color: #ffdba6; bottom: 47.1%; right: 29%"
      >
        <tm-text color="red" :label="`${couponData.quantity}张`"></tm-text>
      </view>
      <view
        class="absolute"
        style="width: 40rpx; height: 28rpx; background-color: #fff; bottom: 44.1%; right: 33.5%"
      >
        <tm-text color="red" :fontSize="22" :label="`${couponData.quantity}张`"></tm-text>
      </view>
    </view>
  </tm-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { collectCoupon, getGiftCoupon } from '@/service/coupon'
import { ICouponItem } from '@/interfaces/coupon'
import { navigateBack, showToast } from '@/common/utils/base'
import { share } from '@/tmui/tool/lib/share'
const { onShareAppMessage, onShareTimeline } = share({
  title: '点击领好礼,月卡行程券免费赠送！',
  desc: '觅行出行，回家的路不再孤单。',
  path: `/pages/activity/newRegister/index`,
  imageUrl: 'https://healthy.wuliang.plus/shareBanner/fc689b34e3cd5c7216908630dc0c5b3.png',
})
onShareAppMessage()
onShareTimeline()

const newRegisterFlag = ref(true)
const couponData = ref<ICouponItem>({
  id: 0,
  quantity: 0,
  type: 0,
})
const cardData = ref<ICouponItem>({
  id: 0,
  quantity: 0,
  type: 0,
})

const ids = ref<Array<number>>([])
const getGiftCouponAction = async () => {
  const res = await getGiftCoupon('1,2')
  if (res) {
    newRegisterFlag.value = res.data.length <= 0
    const data = res.data as Array<ICouponItem>
    data.forEach(item => {
      if (item.type === 1) {
        couponData.value = item
      } else {
        cardData.value = item
      }
      ids.value.push(item.id)
    })
  }
}

const collectCouponAction = async () => {
  const res = await collectCoupon(ids.value.join(','))
  if (res) {
    showToast({
      title: '领取成功',
      icon: 'none',
      duration: 2000,
    })
    navigateBack()
  }
}
onLoad(() => {
  getGiftCouponAction()
})
</script>
