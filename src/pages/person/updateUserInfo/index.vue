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
        <view class="flex fulled flex-row-center-between">
          <view class="flex flex-shrink flex-row-center-between pr-n10" style="width: 120rpx">
            <tm-icon :font-size="26" color="primary" name="tmicon-md-person"></tm-icon>
            <tm-text label="昵称"></tm-text>
            <tm-text _class="mr-5" :font-size="30" color="red" label="*"></tm-text>
          </view>
          <view class="ml-10 fulled border-l-2 pl-20">
            <tm-input placeholder="输入昵称" :transprent="true" class="fulled mr-20" color="primary"></tm-input>
          </view>
        </view>
      </view>
      <tm-divider></tm-divider>
      <view class="flex flex-row-center-between">
        <view class="flex flex-row-center-between">
          <view class="flex flex-row-center-between pr-n10" style="width: 120rpx">
            <tm-icon :font-size="26" color="orange" name="tmicon-md-male"></tm-icon>
            <tm-text label="性别"></tm-text>
            <tm-text _class="mr-5" :font-size="30" color="red" label="*"></tm-text>
          </view>
          <view class="ml-10 border-l-2 pl-20">
            <tm-radio-group :defaultValue="1">
              <tm-radio :value="1" label="男"></tm-radio>
              <tm-radio :value="2" label="女"></tm-radio>
            </tm-radio-group>
          </view>
        </view>
      </view>
      <tm-divider></tm-divider>
      <view class="flex flex-row-center-between">
        <view class="flex flex-start fulled">
          <view class="flex flex-shrink flex-row-center-between pr-n10" style="width: 120rpx">
            <tm-icon :font-size="26" color="red" name="tmicon-md-phone-portrait"></tm-icon>
            <tm-text label="手机"></tm-text>
            <tm-text _class="mr-5" :font-size="30" color="red" label="*"></tm-text>
          </view>
          <view class="flex fulled flex-row-center-between ml-10 border-l-2 pl-20">
            <tm-input placeholder="点击获取或输入号码" type="number" :transprent="true" class="fulled mr-20" color="primary"></tm-input>
            <tm-button
              :margin="[0]"
              :padding="[0, 20]"
              :width="140"
              size="small"
              openType="feedback"
             
              label="获取手机号"
            ></tm-button>
          </view>
        </view>
      </view>
      <tm-divider></tm-divider>
      <view class="flex flex-row-center-between">
        <view class="flex fulled flex-row-center-between">
          <view
            class="flex flex-shrink fulled flex-row-center-between pr-n10"
            style="width: 120rpx"
          >
            <tm-icon :font-size="26" color="teal" name="tmicon-weixin"></tm-icon>
            <tm-text label="微信"></tm-text>
            <tm-text _class="mr-5" :font-size="30" color="red" label="*"></tm-text>
          </view>
          <view class="ml-10 fulled border-l-2 pl-20">
            <tm-input placeholder="输入微信号" :transprent="true" class="fulled mr-20"></tm-input>
          </view>
        </view>
      </view>
    </tm-sheet>

    <tm-button class="mx-20 mt-n10" block label="提交修改"></tm-button>
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
const getphonenumber=(e)=>{
  console.log(e)
}
</script>

<style></style>
