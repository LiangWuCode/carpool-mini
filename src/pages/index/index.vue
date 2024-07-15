<template>
  <tm-app ref="app">
    <tm-sheet :margin="[0, 0]" :padding="[0, 0, 0, 20]" :linear-color="['#0163ff', '#fff']" linear="bottom">
      <tm-carousel autoplay :margin="[0, 8]" :padding="[0, 0]" :round="3" :width="710" :height="300" :list="listimg"
        model="dot" @click="carouselTap"></tm-carousel>
    </tm-sheet>
    <tm-sheet :padding="[12, 6]" :margin="[24, 12]" :round="3">
      <view class="flex flex-row-center-between gap-col-5">
        <view class="flex-1"><tm-input v-model="page.startAddress" placeholder="从哪儿出发"></tm-input></view>
        <view class="flex-1"><tm-input v-model="page.endAddress" placeholder="要到哪儿去"></tm-input></view>
        <view><tm-button size="small" @click="getRideTripsListSearch" label="查询"></tm-button></view>
      </view>
    </tm-sheet>
    <tm-sticky :offset="offset">
      <template v-slot:sticky>
        <tm-sheet :margin="[0, 0]" :padding="[0, 0]">
          <tm-tabs @change="tabschange" :list="tabsTitle" :width="750" default-name="0" align="around" itemModel="line"
            :round="3"></tm-tabs>
        </tm-sheet>
      </template>
      <tm-result v-show="list?.length === 0" :showBtn="false"></tm-result>
      <tm-sheet v-for="(item, index) in list" :key="index" :margin="[24, 24]" :round="3" :padding="[12, 24]"
        @click="goToRideTripsDetailPage(item.id)">
        <view class="flex flex-row-center-between">
          <view class="flex flex-row-center-center">
            <tm-tag :padding="[0, 10]" color="red" v-show="item.isTop === 1" size="s" label="置顶"></tm-tag>
            <tm-tag :padding="[0, 10]" color="primary" size="s" v-show="item.type === 1" label="车找人"></tm-tag>
            <tm-tag :padding="[0, 10]" color="orange" size="s" v-show="item.type === 2" label="人找车"></tm-tag>
            <tm-tag :padding="[0, 10]" color="green" size="s" v-show="item.status === 1"
              :label="item.type === 1 ? '已满座' : '已预订'"></tm-tag>
            <tm-text v-show="item.type === 1 && item.status === 0" :font-size="24" label="还有"></tm-text>
            <tm-text v-show="item.type === 2 && item.status === 0" :font-size="24" label="有"></tm-text>
            <tm-text v-show="item.status === 0" :font-size="28" color="red" class="text-weight-b mx-8"
              :label="item.seats"></tm-text>
            <tm-text v-show="item.type === 1 && item.status === 0" :font-size="24" label="个座位"></tm-text>
            <tm-text v-show="item.type === 2 && item.status === 0" :font-size="24" label="人同行"></tm-text>
          </view>
          <view class="mr-10">
            <tm-icon :font-size="40" color="green" name="tmicon-weixin"></tm-icon>
          </view>
        </view>
        <view class="flex flex-row-center-start mt-10 ml-8">
          <tm-text :font-size="36" :label="item.startAddress" class="text-weight-b"></tm-text>
          <view class="mx-10"><tm-icon color="primary" :font-size="30" name="tmicon-ios-arrow-dropright-"></tm-icon>
          </view>
          <tm-text :font-size="36" :label="item.endAddress" class="text-weight-b"></tm-text>
        </view>
        <view>
          <tm-text _class="d-inline-block border-1 pa-5 mt-10 round-3" :font-size="26"
            :label="item.startDate"></tm-text>
        </view>
        <view v-show="item.type === 1 && item.channelAddress != ''">
          <tm-text color="grey-darken-1" _class="d-inline-block pa-5 mt-5" :font-size="26"
            :label="`途径：` + item.channelAddress"></tm-text>
        </view>
        <view>
          <tm-text _class="d-inline-block pa-5 mt-5" color="grey-darken-1" :font-size="26"
            :label="item.notes"></tm-text>
        </view>
        <view class="flex flex-row-center-between">
          <view class="flex flex-row-center-start">
            <tm-avatar :size="40" :round="12" :font-size="40" color="green" icon="tmicon-weixin"
              :img="item.avatar"></tm-avatar>
            <tm-text _class="ml-10" color="orange" :font-size="26"
              :label="`${item.createDateDesc}前发布 ·${item.viewCount}次浏览`"></tm-text>
            <tm-text color="orange" v-show="item.messageCount > 0" :font-size="26"
              :label="`·${item.messageCount}条留言`"></tm-text>
          </view>
          <view v-show="item.status === 0">
            <tm-button color="deep-orange" icon="tmicon-phone-fill" :width="80" :height="50" :fontSize="30"
              :margin="[10]" :shadow="0" :round="5" @tap.stop="callPhone(item.mobile)" size="normal"></tm-button>
          </view>
        </view>
      </tm-sheet>
    </tm-sticky>

    <!-- 新人注册活动 -->
    <tm-overlay align="flex-center" :overlayClick="false" v-model:show="newRegisterFlag" contentAnimation>
      <view @click.stop="" class="relative">
        <tm-image :width="480" :height="853" src="https://healthy.wuliang.plus/active/newRegister.png"></tm-image>
        <view class="absolute b-n20 flex flex-center fulled" style="bottom: 125rpx">
          <tm-icon @click="newRegisterFlag = false" color="orange" :fontSize="50" name="tmicon-times-circle"
            :shadow="0"></tm-icon>
        </view>
        <view @click="gotoNewRegisterPage" class="absolute flex flex-center fulled" style="bottom: 275rpx">
          <tm-text color="red" :fontSize="32" label="立即领取"></tm-text>
        </view>
      </view>
    </tm-overlay>
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
import { getDictData } from '@/service/common'
import { getGiftCouponCount } from '@/service/coupon'
import { share } from '@/tmui/tool/lib/share'
const { onShareAppMessage, onShareTimeline } = share({
  title: '轻松觅行，快乐出行！',
  desc: '轻松觅行，快乐出行！',
  path: `/pages/index/index`,
  imageUrl: 'https://healthy.wuliang.plus/shareBanner/fc689b34e3cd5c7216908630dc0c5b3.png',
})
onShareAppMessage()
onShareTimeline()


const tabsTitle = ref([
  { key: '0', title: '全部', icon: 'tmicon-box-fill' },
  { key: '1', title: '车找人', icon: 'tmicon-qiche' },
  { key: '2', title: '人找车', icon: 'tmicon-user-fill' },
])

const tabschange = (e: any) => {
  page.value = { pageSize: 5, pageNum: 1, type: e, startAddress: '', endAddress: '' }
  getRideTripsListAction()
}

const getRideTripsListSearch = () => {
  page.value.pageNum = 1
  page.value.pageSize = 5
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
const total = ref(0)
const getRideTripsListAction = async () => {
  const res = await getRideTripsList(page.value)
  const listData = res.data.list as Array<IRideTripsList>
  total.value = res.data.total as number
  //如果是顶部下拉刷新
  if (topRefreshFlag.value) {
    list.value = listData
    uni.stopPullDownRefresh()
    topRefreshFlag.value = false
    page.value.pageNum++
    return
  }

  if (bottomRefreshFlag.value) {
    if (list.value.length <= total.value && listData.length > 0) {
      list.value?.push(...listData)
      page.value.pageNum++
    }
    bottomRefreshFlag.value = false
  } else {
    list.value = listData
    page.value.pageNum++
  }
}

//跳转至行程详情页
const goToRideTripsDetailPage = (rideTripsId: number | undefined) => {
  navigateTo({ url: `/pages/index/rideTripsDetail/index?rideTripsId=${rideTripsId}&type=1` })
}

const listimg = ref<Array<{ url: string; navigateUrl: string }>>([{ url: '', navigateUrl: '' }])
// 首页数据
const getHomeData = async () => {
  const res = await getDictData('mini_home')
  if (res) {
    listimg.value = res.data.map((item: any) => {
      return {
        url: item.value,
        navigateUrl: item.label,
      }
    })
  }
}
const carouselTap = (idx: number) => {
  const navigateUrl = listimg.value[idx].navigateUrl
  if (navigateUrl === '无') {
    return
  }
  if (navigateUrl.includes('http')) {
    navigateTo({ url: `/pages/common/webView/index?url=${navigateUrl}` })
  } else {
    navigateTo({ url: navigateUrl })
  }
}

// 新人注册活动
const newRegisterFlag = ref<boolean>(false)
const gotoNewRegisterPage = () => {
  newRegisterFlag.value = false
  navigateTo({ url: '/pages/activity/newRegister/index' })
}

// 是否有活动券可以领取
const getGiftCouponCountAction = async () => {
  const res = await getGiftCouponCount('1,2')
  if (res) {
    newRegisterFlag.value = Number(res.data) > 0
  }
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
  getHomeData()
  getGiftCouponCountAction()
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
  getRideTripsListAction()
})


</script>
