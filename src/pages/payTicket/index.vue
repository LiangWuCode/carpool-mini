<template>
  <tm-app ref="app">
    <tm-sheet
      :margin="[24, 24, 24, 0]"
      color="primary"
      linear="top"
      linear-deep="light"
      :padding="[30, 60]"
      :round="3"
      :shadow="3"
      style="backdrop-filter: blur( 2px )"
    >
      <view class="flex flex-row-center-between mx-20">
        <view class="flex flex-row-center-center">
          <tm-icon :font-size="38" color="white" name="tmicon-quan"></tm-icon>
          <tm-text :font-size="30" _class="ml-10 " color="white" label="当前拥有"></tm-text>
        </view>
        <view class="flex flex-row-bottom-center">
          <tm-text
            :font-size="36"
            _class="text-weight-b mr-10"
            color="white"
            :label="userInfo?.couponCount"
          ></tm-text>
          <tm-text :font-size="24" _class="text-weight-b ml-5" color="white" label="券"></tm-text>
        </view>
      </view>
    </tm-sheet>

    <tm-sheet :margin="[24, 24]" :transprent="true" :padding="[0]" :round="3" class="mt-20">
      <tm-row align="start" justify="start" :height="0" :column="2">
        <tm-col
          v-for="(item, index) in couponList"
          :key="index"
          :height="0"
          :margin="[15, 0, 15, 20]"
          color="white"
          :round="3"
          :shadow="3"
        >
          <view class="flex flex-col flex-start fulled">
            <view class="flex flex-row-bottom-start fulled">
              <view style="background-color: #276cf5; padding: 6rpx" class="round-10 ml-20 mt-20">
                <tm-icon :font-size="26" color="white" name="tmicon-quan"></tm-icon
              ></view>
              <tm-text
                _class="ml-20 text-weight-b"
                :font-size="40"
                color="grey-darken-3"
                :label="item.num"
              ></tm-text>
              <tm-text _class="ml-5" :font-size="28" color="grey-darken-2" label="券"></tm-text>
            </view>
            <view
              class="flex flex-row-bottom-center fulled py-15 relative"
              style="border-bottom: dashed 2px rgb(245, 245, 245)"
            >
              <tm-text
                _class="text-weight-b"
                :font-size="36"
                color="red"
                :label="item.discountedPrice"
              ></tm-text>
              <tm-text _class="ml-2" :font-size="24" color="red" label="元"></tm-text>
              <tm-text
                _class="ml-13 text-delete"
                :font-size="24"
                color="grey"
                :label="`${item.originalPrice}元`"
              ></tm-text>
              <view
                class="absolute b--13 l--13"
                style="
                  width: 26rpx;
                  height: 26rpx;
                  border-radius: 13rpx;
                  background-color: rgb(245, 245, 245);
                "
              ></view>
              <view
                class="absolute b--13 r--13"
                style="
                  width: 26rpx;
                  height: 26rpx;
                  border-radius: 13rpx;
                  background-color: rgb(245, 245, 245);
                "
              ></view>
              <tm-icon
                v-if="item.isIndulgence"
                class="absolute t--n16 r-0"
                :font-size="60"
                name="tmicon-HOT-copy"
                color="red"
              ></tm-icon>
            </view>
            <view class="flex flex-row-center-center mt-11 mb-15">
              <tm-text
                _class="mr-5 text-weight-b"
                :font-size="24"
                color="primary"
                label="立即购买"
                @click="goToOrderConfirmPage(item.code)"
              ></tm-text>
              <tm-icon :font-size="24" color="primary" name="tmicon-caret-right"></tm-icon>
            </view>
          </view>
        </tm-col>
      </tm-row>
    </tm-sheet>
  </tm-app>
</template>

<script setup lang="ts">
import { navigateTo } from '@/common/utils/base'
import { IUserInfo } from '@/interfaces/common'
import { ICouponList } from '@/interfaces/pay'
import { getCouponList } from '@/service/pay'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import pinia from '@/store/store'
import { useUser } from '@/store/user'
const userStore = useUser(pinia)

const couponList = ref<Array<ICouponList>>([])
const getCouponListAction = async () => {
  const res = await getCouponList()
  couponList.value = res.data as Array<ICouponList>
}

const goToOrderConfirmPage = (code: string) => {
  navigateTo({ url: `/pages/payTicket/orderConfirm/index?code=${code}` })
}

const userInfo = ref<IUserInfo>()
onShow(() => {
  userInfo.value = userStore.userInfo
})

onLoad(() => {
  getCouponListAction()
})
</script>
