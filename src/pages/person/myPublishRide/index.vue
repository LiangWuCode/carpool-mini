<template>
  <tm-app ref="app">
    <tm-sheet
      v-for="(item, index) in ownRideTripsData"
      :key="index"
      :margin="[24, 12, 24, 12]"
      :round="3"
      :padding="[12, 24]"
    >
      <view class="flex flex-row-center-between">
        <view class="flex flex-row-center-center">
          <tm-tag
            :padding="[0, 10]"
            color="red"
            v-show="item.isTop === 1"
            size="s"
            label="置顶"
          ></tm-tag>
          <tm-tag
            :padding="[0, 10]"
            color="primary"
            size="s"
            v-show="item.type === 1"
            label="车找人"
          ></tm-tag>
          <tm-tag
            :padding="[0, 10]"
            color="orange"
            size="s"
            v-show="item.type === 2"
            label="人找车"
          ></tm-tag>
          <tm-text v-show="item.type === 1" :font-size="24" label="还有"></tm-text>
          <tm-text v-show="item.type === 2" :font-size="24" label="有"></tm-text>
          <tm-text
            :font-size="28"
            color="red"
            class="text-weight-b mx-8"
            :label="item.seats"
          ></tm-text>
          <tm-text v-show="item.type === 1" :font-size="24" label="个座位"></tm-text>
          <tm-text v-show="item.type === 2" :font-size="24" label="人同行"></tm-text>
        </view>
        <view class="mr-10">
          <tm-text
            @click="goToRideTripsDetailPage(item.id)"
            :fontSize="24"
            color="grey"
            label="查看详情页"
          ></tm-text>
        </view>
      </view>
      <view class="flex flex-row-center-start mt-10 ml-8">
        <tm-text :font-size="36" :label="item.startAddress" class="text-weight-b"></tm-text>
        <view class="mx-10"
          ><tm-icon color="primary" :font-size="30" name="tmicon-ios-arrow-dropright-"></tm-icon
        ></view>
        <tm-text :font-size="36" :label="item.endAddress" class="text-weight-b"></tm-text>
      </view>
      <view>
        <tm-text
          _class="d-inline-block border-1 pa-5 mt-10 round-3"
          :font-size="26"
          :label="item.startDate"
        ></tm-text>
      </view>
      <view v-show="item.type === 1 && item.channelAddress != ''">
        <tm-text
          color="grey-darken-1"
          _class="d-inline-block pa-5 mt-5"
          :font-size="26"
          :label="`途径：` + item.channelAddress"
        ></tm-text>
      </view>
      <view>
        <tm-text
          _class="d-inline-block pa-5 mt-5"
          color="grey-darken-1"
          :font-size="26"
          :label="item.notes"
        ></tm-text>
      </view>
      <tm-divider></tm-divider>
      <view class="flex flex-end">
        <tm-button
          color="orange"
          :margin="[10, 0]"
          :shadow="0"
          text
          size="small"
          label="置顶"
        ></tm-button>
        <tm-button
          color="green"
          :margin="[10, 0]"
          :shadow="0"
          text
          size="small"
          label="设满座"
        ></tm-button>
        <tm-button
          color="green"
          :margin="[10, 0]"
          :shadow="0"
          text
          size="small"
          label="编辑"
        ></tm-button>
        <tm-button
          color="red"
          :margin="[10, 0]"
          :shadow="0"
          text
          size="small"
          label="删除"
        ></tm-button>
      </view>
    </tm-sheet>
  </tm-app>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { onShow, onLoad } from '@dcloudio/uni-app'
import { getOwnRideTripsList } from '@/service/rideTrips'
import { IPageRequestCommon } from '@/interfaces/common'
import { IOwnRideTripsList } from '@/interfaces/rideTrips'
import { navigateTo } from '@/common/utils/base'

//跳转至行程详情页
const goToRideTripsDetailPage = (rideTripsId: number | undefined) => {
  navigateTo({ url: `/pages/index/rideTripsDetail/index?rideTripsId=${rideTripsId}` })
}

const page = ref<IPageRequestCommon>({
  pageNum: 1,
  pageSize: 5,
})

const ownRideTripsData = ref<Array<IOwnRideTripsList>>([])
const getOwnRideTripsListAction = async () => {
  const res = await getOwnRideTripsList(page.value)
  if (res) {
    ownRideTripsData.value = res.data as Array<IOwnRideTripsList>
  }
}

onLoad(() => {
  getOwnRideTripsListAction()
})
</script>
