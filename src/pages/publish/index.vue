<template>
  <tm-app ref="app" color="white">
    <tm-sheet :margin="[0, 0]" :padding="[0, 0, 0, 0]">
      <tm-carousel
        autoplay
        :margin="[0, 0]"
        :padding="[0, 0]"
        :height="300"
        :list="listimg"
        model="dot"
      ></tm-carousel>
    </tm-sheet>
    <tm-sheet :margin="[24, 24]" :round="3" color="orange" text>
      <tm-text
        label="免责声明：平台用户发布的信息仅简单进行识别，线下交易请自行甄别真假，谨防被骗。"
      ></tm-text>
    </tm-sheet>
    <tm-sheet :margin="[60, 0]">
      <tm-divider
        color="grey-darken-3"
        fontColor="black"
        align="center"
        label="请选择您需要发布的栏目"
      ></tm-divider>
    </tm-sheet>
    <tm-divider :border="0.5" color="grey-1"></tm-divider>
    <tm-sheet :margin="[12, 0]" :padding="[0, 0]">
      <tm-row :column="12" :height="0">
        <tm-col
          align="center"
          @click="goToPublishDetail(1)"
          :height="0"
          color="primary"
          :round="3"
          :margin="[0, 0, 10, 0]"
          :col="6"
        >
          <view class="flex flex-row-center-between px-10 py-30 fulled">
            <view class="ml-20">
              <tm-text _class="text-weight-b" :fontSize="32" label="我是车主"></tm-text>
              <tm-text
                _class="border-1 round-10 pa-3 px-10 mt-20"
                :fontSize="20"
                label="回家的路上不再孤单"
              ></tm-text>
            </view>
            <view class="white rounded pa-10 mr-20">
              <tm-icon color="primary" :font-size="60" name="tmicon-qiche"></tm-icon>
            </view>
          </view>
        </tm-col>
        <tm-col
          :height="0"
          color="orange"
          :round="3"
          :margin="[10, 0, 0, 0]"
          align="center"
          :col="6"
          @click="goToPublishDetail(2)"
        >
          <view class="flex flex-row-center-between px-10 py-30 fulled">
            <view class="ml-10">
              <tm-text _class="text-weight-b" :fontSize="32" label="我是乘客"></tm-text>
              <tm-text
                _class="border-1 round-10 pa-3 px-10 mt-20"
                :fontSize="20"
                label="节能环保，绿色出行"
              ></tm-text>
            </view>
            <view class="white rounded pa-10 mr-20">
              <tm-icon color="orange" :font-size="60" name="tmicon-user-group-fill"></tm-icon>
            </view>
          </view>
        </tm-col>
      </tm-row>
    </tm-sheet>
  </tm-app>
</template>

<script lang="ts" setup>
import { navigateTo } from '@/common/utils/base'

const listimg = [
  'https://api.yuanzhan.cn/uploads/ad/e25eb55dd4a466681e991a14fa2b96a9.jpg',
  'https://api.yuanzhan.cn/uploads/ad/666667777777775.jpg',
  'https://api.yuanzhan.cn/uploads/ad/3234444.jpg',
]

const goToPublishDetail = (navigatorType: number) => {
  navigateTo({
    url: '/pages/publish/detail/index',
    params: {
      type: navigatorType,
    },
  })
}
</script>

<style lang="scss" scoped>
</style>