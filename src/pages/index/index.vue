<template>
  <tm-app ref="app">
    <tm-carousel
      autoplay
      :margin="[0, 8]"
      :round="3"
      :width="686"
      :height="300"
      :list="listimg"
      model="dot"
    ></tm-carousel>
    <tm-sheet :padding="[12, 6]" :margin="[24, 12]" :round="2">
      <view class="flex flex-row-center-between gap-col-5">
        <view class="flex-1"><tm-input placeholder="从哪儿出发"></tm-input></view>
        <view class="flex-1"><tm-input placeholder="要到哪儿去"></tm-input></view>
        <view><tm-button size="small" label="查询"></tm-button></view>
      </view>
    </tm-sheet>
    <tm-sheet :margin="[24, 6]" :padding="[12, 0]">
      <tm-tabs
        @change="tabschange"
        :list="tabsTitle"
        :width="636"
        default-name="1"
        align="around"
        itemModel="line"
        :round="3"
      ></tm-tabs>
    </tm-sheet>
  </tm-app>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue'
import { onShow, onLoad, onInit } from '@dcloudio/uni-app'
const listimg = [
  'https://api.yuanzhan.cn/uploads/ad/e25eb55dd4a466681e991a14fa2b96a9.jpg',
  'https://api.yuanzhan.cn/uploads/ad/666667777777775.jpg',
  'https://api.yuanzhan.cn/uploads/ad/3234444.jpg',
]
const tabsTitle = ref([
  { key: '1', title: '全部', icon: 'tmicon-ios-leaf' },
  { key: '2', title: '车找人', icon: 'tmicon-ios-umbrella' },
  { key: '3', title: '人找车', icon: 'tmicon-ios-rocket' },
])
onLoad(() => {})
</script>
