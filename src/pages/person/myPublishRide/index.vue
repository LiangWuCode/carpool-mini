<template>
  <tm-app ref="app">
    <tm-sheet
      v-for="(item, index) in ownRideTripsData"
      :key="index"
      :margin="[24, 12]"
      :round="3"
      :padding="[12, 24]"
    >
      <view class="relative">
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
        <view>
          <tm-text
            _class="d-inline-block pa-5 mt-5"
            color="grey-darken-1"
            :font-size="24"
            :label="item.createDateDesc"
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
            v-show="item.status === 0"
            @click="gotoSetTopPage(item.id)"
          ></tm-button>
          <tm-button
            color="green"
            :margin="[10, 0]"
            :shadow="0"
            v-show="item.status === 0"
            text
            size="small"
            label="设满座"
            @click="fullSeatAction(item.id)"
          ></tm-button>
          <tm-button
            color="green"
            :margin="[10, 0]"
            :shadow="0"
            text
            size="small"
            label="编辑"
            v-show="item.status === 0"
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
        <view class="absolute r-10 t-n10">
          <!-- <tm-image v-if="item.status === 0" :width="150" :height="150" :src="status0"></tm-image> -->
          <tm-image v-if="item.status === 1" :width="150" :height="150" :src="status1"></tm-image>
          <tm-image
            v-else-if="item.status === 2"
            :width="150"
            :height="150"
            :src="status2"
          ></tm-image>
          <tm-image
            v-else-if="item.status === 3"
            :width="150"
            :height="150"
            :src="status3"
          ></tm-image>
        </view>
      </view>
    </tm-sheet>
    <tm-modal
      color="white"
      okColor="red"
      cancelColor="red"
      okLinear="left"
      splitBtn
      @ok="setFullSeatAction"
      title="满座确认"
      content="请注意，设置满座后，行程电话将会被隐藏，是否确认进行此操作！"
      v-model:show="setFullSeatModalShow"
    ></tm-modal>
  </tm-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
import { getOwnRideTripsList, setFullSeat } from '@/service/rideTrips'
import { IPageRequestCommon } from '@/interfaces/common'
import { IOwnRideTripsList } from '@/interfaces/rideTrips'
import { navigateTo } from '@/common/utils/base'
// import status0 from '@/static/status/0.png'
import status1 from '@/static/status/1.png'
import status2 from '@/static/status/2.png'
import status3 from '@/static/status/3.png'

//跳转至行程详情页
const goToRideTripsDetailPage = (rideTripsId: number | undefined) => {
  navigateTo({ url: `/pages/index/rideTripsDetail/index?rideTripsId=${rideTripsId}` })
}

const page = ref<IPageRequestCommon>({
  pageNum: 1,
  pageSize: 5,
})

const ownRideTripsData = ref<Array<IOwnRideTripsList>>([])
const total = ref(0)
const getOwnRideTripsListAction = async () => {
  const res = await getOwnRideTripsList(page.value)
  if (res) {
    const listData = res.data.list as Array<IOwnRideTripsList>
    total.value = res.data.total as number
    //如果是顶部下拉刷新
    if (topRefreshFlag.value) {
      ownRideTripsData.value = listData
      uni.stopPullDownRefresh()
      topRefreshFlag.value = false
      page.value.pageNum++
      return
    }

    if (bottomRefreshFlag.value) {
      if (ownRideTripsData.value.length <= total.value) {
        ownRideTripsData.value?.push(...listData)
        page.value.pageNum++
      }
      bottomRefreshFlag.value = false
    } else {
      ownRideTripsData.value = listData
      page.value.pageNum++
    }
  }
}

// 跳转置顶页面
const gotoSetTopPage = (rideTripsId: number | undefined) => {
  navigateTo({ url: `/pages/person/setTop/index?rideTripsId=${rideTripsId}` })
}

const setFullSeatModalShow = ref(false)
const rideTripsId = ref<number>(0)
const fullSeatAction = (id: number) => {
  setFullSeatModalShow.value = true
  rideTripsId.value = id
}

//新增置顶
const setFullSeatAction = async () => {
  setFullSeatModalShow.value = false
  const res = await setFullSeat(rideTripsId.value)
  if (res) {
    page.value.pageNum = 1
    page.value.pageSize = 5
    topRefreshFlag.value = true
    getOwnRideTripsListAction()
  }
}

onLoad(() => {
  getOwnRideTripsListAction()
})

const topRefreshFlag = ref<boolean>(false)
onPullDownRefresh(() => {
  page.value.pageNum = 1
  page.value.pageSize = 5
  topRefreshFlag.value = true
  getOwnRideTripsListAction()
})

const bottomRefreshFlag = ref<boolean>(false)
onReachBottom(() => {
  bottomRefreshFlag.value = true
  getOwnRideTripsListAction()
})
</script>
