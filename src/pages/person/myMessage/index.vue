<template>
  <tm-app ref="app">
    <tm-sheet
      :margin="[24, 12]"
      :round="3"
      :shadow="2"
      v-for="(item, index) in ownRideMessageData"
      :key="index"
    >
      <view class="flex flex-row-center-between">
        <view
          ><tm-tag
            v-show="item.type === 1"
            :padding="[0, 10]"
            color="primary"
            size="s"
            label="车找人"
          ></tm-tag>
          <tm-tag
            v-show="item.type === 2"
            :padding="[0, 10]"
            color="orange"
            size="s"
            label="人找车"
          ></tm-tag>
        </view>
        <view>
          <tm-text
            color="grey"
            :fontSize="24"
            :label="item.readStatus === 0 ? '对方未读' : '对方已读'"
          ></tm-text
        ></view>
      </view>
      <view class="mt-20"><tm-text :label="item.content"></tm-text></view>
      <view class="flex mt-10" v-for="(item1, index1) in item.rideMessageVoList" :key="index1">
        <tm-text
          _class="mr-10"
          :fontSize="24"
          color="orange"
          :label="`${item1.username}:`"
        ></tm-text>
        <tm-text :fontSize="24" color="orange" :label="item1.content"></tm-text>
        <tm-text
          class="flex-shrink"
          color="grey"
          :label="`（${item1.createDateDesc}前）`"
        ></tm-text>
      </view>
      <tm-divider></tm-divider>
      <view class="flex flex-row-center-between">
        <view><tm-text color="grey" :label="`${item.createDateDesc}前`"></tm-text></view>
        <view class="flex"
          ><tm-button
            text
            color="grey"
            @click="goToRideTripsDetailPage(item.rideTripsId)"
            :margin="[0, 0]"
            size="small"
            label="详情页"
          ></tm-button
          ><tm-button
            @click="deleteRideMessageModelAction(item.id)"
            text
            color="red"
            :margin="[20, 0, 0, 0]"
            size="small"
            label="删除"
          ></tm-button
        ></view>
      </view>
    </tm-sheet>
    <tm-modal
      color="white"
      okColor="red"
      cancelColor="red"
      okLinear="left"
      splitBtn
      @ok="deleteRideMessageAction"
      title="删除提醒"
      content="是否确认删除当前留言？"
      v-model:show="deleteRideMessageModel"
    ></tm-modal>
  </tm-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onShow, onLoad, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
import { deleteRideMessageById, getOwnRideMessageList } from '@/service/message'
import { IPageRequestCommon } from '@/interfaces/common'
import { IRideMessage } from '@/interfaces/rideTrips'
import { navigateTo } from '@/common/utils/base'

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

//跳转至行程详情页
const goToRideTripsDetailPage = (rideTripsId: number | undefined) => {
  navigateTo({ url: `/pages/index/rideTripsDetail/index?rideTripsId=${rideTripsId}` })
}

const deleteRideMessageModel = ref(false)
const deleteMessageId = ref<number>(0)
const deleteRideMessageModelAction = (messageId: number) => {
  deleteRideMessageModel.value = true
  deleteMessageId.value = messageId
}

const deleteRideMessageAction = async () => {
  const res = await deleteRideMessageById(deleteMessageId.value)
  if (res) {
    page.value.pageNum = 1
    page.value.pageSize = 5
    topRefreshFlag.value = true
    getOwnRideMessageListAction()
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
