<template>
  <tm-app ref="app">
    <tm-sheet
      :margin="[0, 0]"
      :padding="[0, 0, 0, 20]"
      :linear-color="['#0163ff', '#fff']"
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
        <view class="flex-1"
          ><tm-input v-model="page.startAddress" placeholder="从哪儿出发"></tm-input
        ></view>
        <view class="flex-1"
          ><tm-input v-model="page.endAddress" placeholder="要到哪儿去"></tm-input
        ></view>
        <view
          ><tm-button size="small" @click="getRideTripsListAction" label="查询"></tm-button
        ></view>
      </view>
    </tm-sheet>
    <tm-sticky :offset="offset">
      <template v-slot:sticky>
        <tm-sheet :margin="[0, 0]" :padding="[0, 0]">
          <tm-tabs
            @change="tabschange"
            :list="tabsTitle"
            :width="750"
            default-name="0"
            align="around"
            itemModel="line"
            :round="3"
          ></tm-tabs>
        </tm-sheet>
      </template>
      <tm-result v-show="list?.length === 0" :showBtn="false"></tm-result>
      <tm-sheet
        v-for="(item, index) in list"
        :key="index"
        :margin="[24, 24]"
        :round="3"
        :padding="[12, 24]"
        @click="goToRideTripsDetailPage(item.id)"
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
            <tm-icon :font-size="40" color="green" name="tmicon-weixin"></tm-icon>
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
        <view class="flex flex-row-center-between">
          <view class="flex flex-row-center-start">
            <tm-avatar
              :size="40"
              :round="12"
              :font-size="26"
              color="green"
              :img="item.avatar"
              icon="tmicon-weixin"
            ></tm-avatar>
            <tm-text
              _class="ml-10"
              color="orange"
              :font-size="26"
              :label="`${item.createDateDesc}前发布 ·${item.viewCount}次浏览`"
            ></tm-text>
            <tm-text
              color="orange"
              v-show="item.messageCount > 0"
              :font-size="26"
              :label="`·${item.messageCount}条留言`"
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
              @click="callPhone(item.mobile)"
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
import { onShow, onLoad, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
import { getUserInfoAction } from '@/common/ts/nav'
import { getRideTripsList } from '@/service/rideTrips'
import { IGetRideTrips, IRideTripsList } from '@/interfaces/rideTrips'
import { callPhone } from '@/tmui/tool/function/util'
import { navigateTo } from '@/common/utils/base'
const listimg = [
  'https://api.yuanzhan.cn/uploads/ad/e25eb55dd4a466681e991a14fa2b96a9.jpg',
  'https://api.yuanzhan.cn/uploads/ad/666667777777775.jpg',
  'https://api.yuanzhan.cn/uploads/ad/3234444.jpg',
]

const tabsTitle = ref([
  { key: '0', title: '全部', icon: 'tmicon-box-fill' },
  { key: '1', title: '车找人', icon: 'tmicon-qiche' },
  { key: '2', title: '人找车', icon: 'tmicon-user-fill' },
])

const tabschange = (e: any) => {
  page.value = { pageSize: 5, pageNum: 1, type: e, startAddress: '', endAddress: '' }
  getRideTripsListAction()
}

const page = ref<IGetRideTrips>({
  pageSize: 5,
  pageNum: 1,
  type: 0,
  startAddress: '',
  endAddress: '',
})
const list = ref<Array<IRideTripsList>>([])
const getRideTripsListAction = async () => {
  const res = await getRideTripsList(page.value)
  const listData = res.data.list as Array<IRideTripsList>
  //如果是顶部下拉刷新
  if (topRefreshFlag.value) {
    list.value = listData
    uni.stopPullDownRefresh()
    topRefreshFlag.value = false
    return
  }

  if (bottomRefreshFlag.value) {
    if (listData.length > 0) {
      list.value?.push(...listData)
      page.value.pageNum++
    }
    bottomRefreshFlag.value = false
  } else {
    list.value = listData
  }
}

//跳转至行程详情页
const goToRideTripsDetailPage = (rideTripsId:number|undefined) => {
  navigateTo({ url: `/pages/index/rideTripsDetail/index?rideTripsId=${rideTripsId}` })
}

const offset = ref(0)
// #ifdef H5
offset.value = uni.$tm.u.torpx(44)
// #endif
onShow(() => {
  page.value.pageNum = 1
  page.value.pageSize = 5
  getRideTripsListAction()
})
onLoad(() => {
  getUserInfoAction()
})
const topRefreshFlag = ref<boolean>(false)
onPullDownRefresh(() => {
  page.value.pageNum = 1
  page.value.pageSize = 5
  topRefreshFlag.value = true
  getRideTripsListAction()
})

const bottomRefreshFlag = ref<boolean>(false)
onReachBottom(() => {
  bottomRefreshFlag.value = true
  if (list.value.length < 5 && page.value.pageNum === 1) {
    page.value.pageNum = 2
  }
  getRideTripsListAction()
})
</script>
