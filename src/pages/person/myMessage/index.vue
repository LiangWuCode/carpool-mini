<template>
  <tm-app ref="app">
    <tm-sheet :margin="[24, 12]" :round="3" :shadow="2">
      <view class="flex flex-row-center-between">
        <view
          ><tm-tag :padding="[0, 10]" color="primary" size="s" label="车找人"></tm-tag>
          <!-- <tm-tag :padding="[0, 10]" color="orange" size="s" label="人找车"></tm-tag> -->
          <!-- v-show="item.type === 2" -->
        </view>
        <view> <tm-text color="grey" :fontSize="24" label="对方已读"></tm-text></view>
      </view>
      <view><tm-text label="这是文本标签，文本显示必需要使用此标签"></tm-text></view>
      <view class="flex mt-10">
        <tm-text _class="mr-10" :fontSize="24" color="orange" label="我:"></tm-text>
        <tm-text :fontSize="24" color="orange" label="这个地方去不了！"></tm-text>
      </view>
      <tm-divider></tm-divider>
      <view class="flex flex-row-center-between">
        <view><tm-text color="grey" label="刚刚"></tm-text></view>
        <view class="flex"
          ><tm-button text color="grey" :margin="[0, 0]" size="small" label="详情页"></tm-button
          ><tm-button text color="red" :margin="[20, 0, 0, 0]" size="small" label="删除"></tm-button
        ></view>
      </view>
    </tm-sheet>
  </tm-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onShow, onLoad, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
import { getOwnRideMessageList } from '@/service/message'
import { IPageRequestCommon } from '@/interfaces/common'
import { IRideMessage } from '@/interfaces/rideTrips'

const page = ref<IPageRequestCommon>({
  pageNum: 1,
  pageSize: 5,
})
const total = ref(0)
const ownRideMessageData = ref<Array<IRideMessage>>([])
const getOwnRideMessageListAction = async () => {
  const res = await getOwnRideMessageList(page.value)

  if (res) {
    const listData = res.data.list as Array<IRideMessage>
    total.value = res.data.total as number
    //如果是顶部下拉刷新
    if (topRefreshFlag.value) {
      ownRideMessageData.value = listData
      uni.stopPullDownRefresh()
      topRefreshFlag.value = false
      page.value.pageNum++
      return
    }

    if (bottomRefreshFlag.value) {
      console.log(
        ownRideMessageData.value.length <= total.value,
        ownRideMessageData.value.length,
        total.value
      )
      if (ownRideMessageData.value.length <= total.value && listData.length > 0) {
        ownRideMessageData.value?.push(...listData)
        page.value.pageNum++
      }
      bottomRefreshFlag.value = false
    } else {
      ownRideMessageData.value = listData
      page.value.pageNum++
    }
  }
}
onShow(() => {
  page.value.pageNum = 1
  page.value.pageSize = 5
  getOwnRideMessageListAction()
})

const topRefreshFlag = ref<boolean>(false)
onPullDownRefresh(() => {
  page.value.pageNum = 1
  page.value.pageSize = 5
  topRefreshFlag.value = true
  getOwnRideMessageListAction()
})

const bottomRefreshFlag = ref<boolean>(false)
onReachBottom(() => {
  bottomRefreshFlag.value = true
  getOwnRideMessageListAction()
})
</script>
