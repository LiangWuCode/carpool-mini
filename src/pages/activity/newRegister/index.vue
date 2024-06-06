<template>
  <tm-app ref="app">
    <view class="relative">
      <view>
        <img
          src="http://healthy.wuliang.plus/active/newRegisterBackground3.png"
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
          :disabled="false"
          label="立即领取"
        ></tm-button>
      </view>
    </view>
  </tm-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onShow, onLoad } from '@dcloudio/uni-app'
onLoad(() => {})
</script>