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
            <view class="ml-16 mt-10"
              ><tm-text :fontSize="20" color="white" label="充值卡"></tm-text
            ></view>
            <view class="mr-16 flex-end">
              <tm-text :fontSize="24" color="white" label="100券"></tm-text
            ></view>
          </view>
          <view>
            <tm-text _class="text-weight-b mb-25 mt-5" label="100券充值卡"></tm-text>
            <tm-text _class="mb-5 ml-5" label="x 1" color="grey"></tm-text>
          </view>
        </view>
        <tm-text color="black" _class="text-weight-b" label="¥100.00"></tm-text>
      </view>
      <tm-divider></tm-divider>
      <view class="flex flex-end pb-10">
        <tm-text color="grey" label="合计："></tm-text>
        <tm-text color="orange" _class="text-weight-b ml-5" label="¥100.00"></tm-text>
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
      <tm-button block label="确认支付"></tm-button>
    </tm-sheet>
  </tm-app>
</template>
  
<script setup lang='ts'>
</script>
  
<style>
</style>