<template>
  <tm-app ref="app">
    <tm-sheet :margin="[0, 0, 0, 0]" :padding="[0, 48]" color="blue">
      <view class="flex flex-col flex-center fulled">
        <tm-avatar
          outlined
          :size="100"
          :round="16"
          color="white"
          icon="tmicon-weixin"
          :img="avatarUrl"
        ></tm-avatar>
        <tm-button
          :width="300"
          :margin="[0, 24]"
          open-type="chooseAvatar"
          @chooseavatar="onChooseavatar"
          text
          size="small"
          outlined
          label="点这里，获取头像"
        ></tm-button>
      </view>
    </tm-sheet>
    <tm-sheet :margin="[0]" :round="3" :shadow="2">
      <view class="flex flex-row-center-between">
        <view class="flex flex-row-center-between">
          <view class="flex flex-row-center-between pr-n10" style="width: 100rpx">
            <tm-icon :font-size="26" color="primary" name="tmicon-md-person"></tm-icon>
            <tm-text label="昵称"></tm-text>
          </view>
          <view class="ml-10 border-l-2 pl-20">
            <tm-text
              :font-size="28"
              _class="text-weight-9"
              label="rideTrips.chatInfo"
            ></tm-text>
          </view>
        </view>
      </view>
      <tm-divider></tm-divider>
      <view class="flex flex-row-center-between">
        <view class="flex flex-row-center-between">
          <view class="flex flex-row-center-between pr-n10" style="width: 100rpx">
            <tm-icon :font-size="26" color="orange" name="tmicon-md-male"></tm-icon>
            <tm-text label="性别"></tm-text>
          </view>
          <view class="ml-10 border-l-2 pl-20">
            <tm-text
              :font-size="28"
              _class="text-weight-9"
              label="rideTrips.chatInfo"
            ></tm-text>
          </view>
        </view>
      </view>
      <tm-divider></tm-divider>
      <view class="flex flex-row-center-between">
        <view class="flex flex-row-center-between">
          <view class="flex flex-row-center-between pr-n10" style="width: 100rpx">
            <tm-icon :font-size="26" color="red" name="tmicon-md-phone-portrait"></tm-icon>
            <tm-text label="手机"></tm-text>
          </view>
          <view class="ml-10 border-l-2 pl-20">
            <tm-text
              :font-size="28"
              _class="text-weight-9"
              label="rideTrips.chatInfo"
            ></tm-text>
          </view>
        </view>
      </view>
      <tm-divider></tm-divider>
      <view class="flex flex-row-center-between">
        <view class="flex flex-row-center-between">
          <view class="flex flex-row-center-between pr-n10" style="width: 100rpx">
            <tm-icon :font-size="26" color="teal" name="tmicon-weixin"></tm-icon>
            <tm-text label="微信"></tm-text>
          </view>
          <view class="ml-10 border-l-2 pl-20">
            <tm-text
              :font-size="28"
              _class="text-weight-9"
              label="rideTrips.chatInfo"
            ></tm-text>
          </view>
        </view>
      </view>
    </tm-sheet>
  </tm-app>
</template>

<script setup lang="ts">
import { uploadFileAction } from '@/service/common'
import { ref } from 'vue'

const avatarUrl = ref('')
const onChooseavatar = (e: any) => {
  uploadFileAction(e.detail.avatarUrl).then(res => {
    avatarUrl.value = res as string
  })
}
</script>

<style></style>
