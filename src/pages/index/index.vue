<template>
  <tm-app ref="app">
    <tm-sheet
      :margin="[0, 0]"
      :padding="[0, 0, 0, 20]"
      :linear-color="['#3B5CF0', '#fff']"
      linear="bottom"
    >
      <tm-carousel
        autoplay
        :margin="[0, 8]"
        :padding="[0, 0]"
        :round="3"
        :width="710"
        :height="300"
        :list="listimg"
        model="dot"
      ></tm-carousel>
    </tm-sheet>
    <tm-sheet :padding="[12, 6]" :margin="[24, 12]" :round="3">
      <view class="flex flex-row-center-between gap-col-5">
        <view class="flex-1"><tm-input placeholder="从哪儿出发"></tm-input></view>
        <view class="flex-1"><tm-input placeholder="要到哪儿去"></tm-input></view>
        <view><tm-button size="small" label="查询"></tm-button></view>
      </view>
    </tm-sheet>
    <tm-sticky :offset="offset">
      <template v-slot:sticky>
        <tm-sheet :margin="[0, 0]" :padding="[0, 0]">
          <tm-tabs
            @change="tabschange"
            :list="tabsTitle"
            :width="750"
            default-name="1"
            align="around"
            itemModel="line"
            :round="3"
          ></tm-tabs>
        </tm-sheet>
      </template>
      <tm-sheet
        v-for="(item, index) in 20"
        :key="index"
        :margin="[24, 24]"
        :round="3"
        :padding="[12, 24]"
      >
        <view class="flex flex-row-center-between">
          <view class="flex flex-row-center-center">
            <tm-tag :padding="[0, 10]" color="red" size="s" label="置顶"></tm-tag>
            <tm-tag :padding="[0, 10]" color="primary" size="s" label="车找人"></tm-tag>
            <tm-text :font-size="24" label="还有"></tm-text>
            <tm-text :font-size="28" color="red" class="text-weight-b mx-8" label="3"></tm-text>
            <tm-text :font-size="24" label="个座位"></tm-text>
          </view>
          <view class="mr-10">
            <tm-icon :font-size="40" color="green" name="tmicon-weixin"></tm-icon>
          </view>
        </view>
        <view class="flex flex-row-center-start mt-10 ml-8">
          <tm-text :font-size="36" label="安康市" class="text-weight-b"></tm-text>
          <view class="mx-10"
            ><tm-icon color="primary" :font-size="30" name="tmicon-ios-arrow-dropright-"></tm-icon
          ></view>
          <tm-text :font-size="36" label="岚皋县" class="text-weight-b"></tm-text>
        </view>
        <view>
          <tm-text
            _class="d-inline-block border-1 pa-5 mt-10 round-3"
            :font-size="26"
            label="今天：2024年05月11日 19:00-20:00"
          ></tm-text>
        </view>
        <view>
          <tm-text
            color="grey-darken-1"
            _class="d-inline-block pa-5 mt-5"
            :font-size="26"
            label="途径：蔺河镇"
          ></tm-text>
        </view>
        <view>
          <tm-text
            _class="d-inline-block pa-5 mt-5"
            color="grey-darken-1"
            :font-size="26"
            label="顺路同行，有大件行李的提前说，车内不允许吸烟痛，还可以拉两个人。"
          ></tm-text>
        </view>
        <view class="flex flex-row-center-between">
          <view class="flex flex-row-center-start">
            <tm-avatar
              :size="40"
              :round="12"
              :font-size="26"
              color="green"
              img=""
              icon="tmicon-weixin"
            ></tm-avatar>
            <tm-text
              _class="ml-10"
              color="orange"
              :font-size="26"
              label="9小时前发布 87次浏览"
            ></tm-text>
          </view>
          <view>
            <tm-button
              color="deep-orange"
              icon="tmicon-phone-fill"
              :width="80"
              :height="50"
              :fontSize="30"
              :margin="[10]"
              :shadow="0"
              :round="5"
              size="normal"
            ></tm-button>
          </view>
        </view>
      </tm-sheet>
    </tm-sticky>
  </tm-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onShow, onLoad } from '@dcloudio/uni-app'
const listimg = [
  'https://api.yuanzhan.cn/uploads/ad/e25eb55dd4a466681e991a14fa2b96a9.jpg',
  'https://api.yuanzhan.cn/uploads/ad/666667777777775.jpg',
  'https://api.yuanzhan.cn/uploads/ad/3234444.jpg',
]

const tabsTitle = ref([
  { key: '1', title: '全部', icon: 'tmicon-box-fill' },
  { key: '2', title: '车找人', icon: 'tmicon-qiche' },
  { key: '3', title: '人找车', icon: 'tmicon-user-fill' },
])

const offset = ref(0)
// #ifdef H5
offset.value = uni.$tm.u.torpx(44)
// #endif
onLoad(() => {})
</script>
