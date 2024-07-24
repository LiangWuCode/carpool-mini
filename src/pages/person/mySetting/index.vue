<template>
  <tm-app ref="app">
    <tm-sheet :margin="[24, 12]" :round="3">
      <view class="flex flex-row-center-between my-5">
        <view><tm-text label="是否展示行程人数"></tm-text></view>
        <view class="flex">
          <tm-switch v-model="setting.seatShow" :default-value="setting.seatShow"></tm-switch
        ></view>
      </view>
      <tm-divider></tm-divider>
      <view class="flex flex-row-center-between my-5">
        <view><tm-text label="是否同步到群组"></tm-text></view>
        <view class="flex">
          <tm-switch v-model="setting.groupShow" :default-value="setting.groupShow"></tm-switch
        ></view>
      </view>
    </tm-sheet>
  </tm-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onShow, onLoad } from '@dcloudio/uni-app'

const setting = ref<{ seatShow: boolean; groupShow: boolean }>({
  seatShow: false,
  groupShow: false,
})
const confirm = e => {
  console.log(e)
}
onLoad(() => {})
</script>
