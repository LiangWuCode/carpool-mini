<template>
  <tm-app ref="app">
    <tm-sheet :margin="[0, 0, 0, 20]" :padding="[0, 48]" color="blue">
      <view class="flex flex-col flex-center">
        <tm-avatar
          outlined
          :size="100"
          :round="16"
          color="white"
          icon="tmicon-weixin"
          :img="userInfo?.avatar"
        ></tm-avatar>
        <tm-text :fontSize="30" _class="text-weight-b mt-20" :label="userInfo?.nickName"></tm-text>
      </view>
    </tm-sheet>
    <tm-sheet :margin="[24, 12]" :round="3">
      <view class="flex flex-around">
        <view class="flex flex-col flex-center" @click="gotoMyPublishPage">
          <view class="flex flex-row-bottom-center mb-5"
            ><tm-text
              _class="text-weight-b"
              color="orange"
              :fontSize="36"
              :label="userInfo?.rideCount"
            ></tm-text>
          </view>
          <tm-text :fontSize="24" label="信息"></tm-text>
        </view>
        <view class="flex flex-col flex-center" @click="gotoMyCouponPage">
          <tm-text
            _class="text-weight-b mb-5"
            color="red"
            :fontSize="36"
            :label="userInfo?.couponCount"
          ></tm-text>
          <tm-text :fontSize="24" label="券"></tm-text>
        </view>
        <view class="flex flex-col flex-center" @click="gotoMyCardPage">
          <view class="flex flex-row-bottom-center mb-5"
            ><tm-text
              _class="text-weight-b"
              color="primary"
              :fontSize="36"
              :label="userInfo?.cardCount"
            ></tm-text
          ></view>
          <tm-text :fontSize="24" label="月卡"></tm-text>
        </view>
      </view>
    </tm-sheet>
    <tm-sheet :margin="[24, 12]" :round="3">
      <tm-cell :margin="[0, 0]" :titleFontSize="30" url="/pages/payTicket/index">
        <template v-slot:title>
          <view class="flex"
            ><tm-icon color="primary" _class="mr-20" name="tmicon-huiyuan1"></tm-icon>
            <tm-text label="充值"></tm-text
          ></view>
        </template>
      </tm-cell>
      <tm-cell :margin="[0, 0]" :titleFontSize="30" @click="gotoMyPublishPage">
        <template v-slot:title>
          <view class="flex"
            ><tm-icon color="primary" _class="mr-20" name="tmicon-ios-filing"></tm-icon>
            <tm-text label="我发布的"></tm-text
          ></view>
        </template>
      </tm-cell>
      <tm-cell :margin="[0, 0]" :titleFontSize="30" url="/pages/person/myMessage/index">
        <template v-slot:title>
          <view class="flex"
            ><tm-icon color="primary" _class="mr-20" name="tmicon-md-chatbubbles"></tm-icon>
            <tm-text label="我的留言"></tm-text
          ></view>
        </template>
      </tm-cell>
    </tm-sheet>
    <tm-sheet :margin="[24, 12]" :round="3">
      <tm-cell :margin="[0, 0]" :titleFontSize="30" url="/pages/person/updateUserInfo/index">
        <template v-slot:title>
          <view class="flex"
            ><tm-icon color="primary" _class="mr-20" name="tmicon-database-set"></tm-icon>
            <tm-text label="修改资料"></tm-text
          ></view>
        </template>
      </tm-cell>
      <button class="contact" open-type="contact">
        <tm-cell :margin="[0, 0]" :titleFontSize="30">
          <template v-slot:title>
            <view class="flex"
              ><tm-icon color="primary" _class="mr-20" name="tmicon-ios-filing"></tm-icon>
              <tm-text label="客服"></tm-text
            ></view>
          </template>
        </tm-cell>
      </button>

      <tm-cell :margin="[0, 0]" :titleFontSize="30" @click="gotoAgreementPage">
        <template v-slot:title>
          <view class="flex"
            ><tm-icon color="primary" _class="mr-20" name="tmicon-md-chatbubbles"></tm-icon>
            <tm-text label="使用协议"></tm-text
          ></view>
        </template>
      </tm-cell>
    </tm-sheet>

    <tm-sheet :margin="[24, 12]" :padding="[24, 0]" :round="3">
      <tm-cell
        :margin="[0, 0]"
        :titleFontSize="30"
        @click="
          showToast({
            title: '正在开发，敬请期待！',
            icon: 'none',
            duration: 2000,
          })
        "
      >
        <template v-slot:title>
          <view class="flex"
            ><tm-icon color="primary" _class="mr-20" name="tmicon-ios-filing"></tm-icon>
            <tm-text label="分享推广"></tm-text
          ></view>
        </template>
      </tm-cell>
    </tm-sheet>
  </tm-app>
</template>

<script lang="ts" setup>
import { navigateTo, showToast } from '@/common/utils/base'
import { onShow } from '@dcloudio/uni-app'
import { IUserInfo } from '@/interfaces/common'
import { ref } from 'vue'
import { getUserInfoAction } from '@/common/ts/nav'
import pinia from '@/store/store'
import { useUser } from '@/store/user'
import { share } from '@/tmui/tool/lib/share'
const { onShareAppMessage, onShareTimeline } = share({
  title: '觅行出行，回家的路不再孤单。',
  desc: '觅行出行，回家的路不再孤单。',
  path: `/pages/index/index`,
  imageUrl: 'http://healthy.wuliang.plus/shareBanner/fc689b34e3cd5c7216908630dc0c5b3.png',
})
onShareAppMessage()
onShareTimeline()

const userStore = useUser(pinia)
// 跳转到券充值页
const goToPayPage = () => {
  navigateTo({ url: '/pages/payTicket/index' })
}

const gotoAgreementPage = () => {
  navigateTo({ url: `/pages/common/agreement/index?type=3` })
}

const gotoMyPublishPage = () => {
  navigateTo({ url: '/pages/person/myPublishRide/index' })
}

const gotoMyCouponPage = () => {
  navigateTo({ url: '/pages/person/myCoupon/index' })
}

const gotoMyCardPage = () => {
  navigateTo({ url: '/pages/person/myCard/index' })
}

const userInfo = ref<IUserInfo>()
onShow(() => {
  getUserInfoAction()
  userInfo.value = userStore.userInfo
})
</script>

<style scoped>
.contact {
  padding-left: 0px;
  padding-right: 0px;
  border: none;
  margin: 0;
}

uni-button:after {
  border: none !important;
}

uni-button::after {
  border: none !important;
}

button::after {
  border: none !important;
}
</style>
