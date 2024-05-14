<template>
  <tm-app ref="app">
    <tm-sheet :margin="[0, 0, 0, 20]" :padding="[0, 48]" color="blue">
      <view class="flex flex-col flex-center">
        <tm-avatar
          outlined
          :round="12"
          :font-size="52"
          color="white"
          icon="tmicon-weixin"
        ></tm-avatar>
        <tm-text :fontSize="30" _class="text-weight-b mt-20" label="微信用户"></tm-text>
      </view>
    </tm-sheet>
    <tm-sheet :margin="[24, 12]" :padding="[50, 24, 0, 24]" :round="3">
      <view class="flex flex-around">
        <view class="flex flex-col flex-center">
          <view class="flex flex-row-bottom-center mb-5"
            ><tm-text _class="text-weight-b" color="orange" :fontSize="36" label="0"></tm-text
            ><tm-text color="orange" :fontSize="24" label="条"></tm-text
          ></view>
          <tm-text :fontSize="24" label="信息"></tm-text>
        </view>
        <view class="flex flex-col flex-center pl-40">
          <tm-text _class="text-weight-b mb-5" color="red" :fontSize="36" label="100.00"></tm-text>
          <tm-text :fontSize="24" label="券"></tm-text>
        </view>
        <view class="flex flex-col flex-center">
          <tm-button @click="goToPayPage" :margin="[10]" size="small" label="券充值"></tm-button>
        </view>
      </view>
    </tm-sheet>
    <tm-sheet :margin="[24, 12]" :round="3">
      <tm-cell :margin="[0, 0]" :titleFontSize="30">
        <template v-slot:title>
          <view class="flex"
            ><tm-icon color="primary" _class="mr-20" name="tmicon-ios-filing"></tm-icon>
            <tm-text label="我发布的"></tm-text
          ></view>
        </template>
      </tm-cell>
      <tm-cell :margin="[0, 0]" :titleFontSize="30">
        <template v-slot:title>
          <view class="flex"
            ><tm-icon color="primary" _class="mr-20" name="tmicon-md-chatbubbles"></tm-icon>
            <tm-text label="我的留言"></tm-text
          ></view>
        </template>
      </tm-cell>
      <tm-cell :margin="[0, 0]" :titleFontSize="30">
        <template v-slot:title>
          <view class="flex"
            ><tm-icon color="primary" _class="mr-20" name="tmicon-database-set"></tm-icon>
            <tm-text label="修改资料"></tm-text
          ></view>
        </template>
      </tm-cell>
    </tm-sheet>
    <tm-sheet :margin="[24, 12]" :round="3">
      <tm-cell :margin="[0, 0]" :titleFontSize="30">
        <template v-slot:title>
          <view class="flex"
            ><tm-icon color="primary" _class="mr-20" name="tmicon-ios-filing"></tm-icon>
            <tm-text label="客服"></tm-text
          ></view>
        </template>
      </tm-cell>
      <tm-cell :margin="[0, 0]" :titleFontSize="30">
        <template v-slot:title>
          <view class="flex"
            ><tm-icon color="primary" _class="mr-20" name="tmicon-md-chatbubbles"></tm-icon>
            <tm-text label="使用协议"></tm-text
          ></view>
        </template>
      </tm-cell>
    </tm-sheet>

    <tm-sheet :margin="[24, 12]" :padding="[24, 0]" :round="3">
      <tm-cell :margin="[0, 0]" :titleFontSize="30">
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
import { navigateTo } from '@/common/utils/base'
// 跳转到券充值页
const goToPayPage = () => {
  navigateTo({ url: '/pages/payTicket/index' })
}
</script>

<style lang="scss" scoped>

</style>