<template>
  <tm-app ref="app">
    <tm-sticky :offset="offset">
      <template v-slot:sticky>
        <tm-sheet :margin="[0, 0, 0, 20]" :padding="[0, 48]" color="blue">
          <view class="flex flex-around">
            <view class="flex-col flex-center">
              <tm-text
                _class="text-weight-b"
                :fontSize="42"
                color="white"
                :label="userInfo?.couponCount"
              ></tm-text>
              <tm-text color="white" label="券数"></tm-text>
            </view>
            <view class="flex-col flex-center">
              <tm-text
                _class="text-weight-b"
                :fontSize="42"
                color="white"
                :label="userInfo?.cardCount"
              ></tm-text>
              <tm-text color="white" label="月卡"></tm-text>
            </view>
          </view>
          <view class="flex flex-center mt-20"
            ><tm-button
              linear="right"
              :round="10"
              color="orange"
              :margin="[0, 24]"
              size="normal"
              @click="goToPayPage"
              label="立即充值"
            ></tm-button
          ></view>
        </tm-sheet>
      </template>
      <tm-result v-show="list?.length === 0" :showBtn="false"></tm-result>

      <tm-sheet
        v-for="(item, index) in ownCouponData"
        :key="index"
        :margin="[0]"
        :padding="[34, 24]"
        :border="1"
        borderDirection="bottom"
      >
        <view class="flex flex-between" v-if="item.type === 1">
          <tm-text :fontSize="30" color="black" :label="`充值${item.quantity}券`"></tm-text>
          <tm-text
            :fontSize="34"
            color="orange"
            _class="text-weight-b"
            :label="`+${item.quantity}`"
          ></tm-text>
        </view>
        <view class="flex flex-between" v-else-if="item.type === 2">
          <tm-text :fontSize="30" color="black" :label="`充值${item.quantity}月卡`"></tm-text>
          <tm-text
            :fontSize="34"
            color="orange"
            _class="text-weight-b"
            :label="`+${item.quantity}`"
          ></tm-text>
        </view>
        <view class="flex flex-between" v-else-if="item.type === 3">
          <tm-text :fontSize="30" color="black" :label="`发布行程`"></tm-text>
          <tm-text
            :fontSize="34"
            color="orange"
            _class="text-weight-b"
            :label="`${item.quantity}`"
          ></tm-text>
        </view>
        <view class="flex flex-between" v-else-if="item.type === 4">
          <tm-text :fontSize="30" color="black" :label="`置顶`"></tm-text>
          <tm-text
            :fontSize="34"
            color="orange"
            _class="text-weight-b"
            :label="`${item.quantity}`"
          ></tm-text>
        </view>
        <view class="flex flex-between" v-else-if="item.type === 5">
          <tm-text :fontSize="30" color="black" :label="`月卡发布行程`"></tm-text>
          <tm-text
            :fontSize="34"
            color="orange"
            _class="text-weight-b"
            :label="`${item.quantity}`"
          ></tm-text>
        </view>
        <view class="flex flex-between" v-else-if="item.type === 6">
          <tm-text :fontSize="30" color="black" :label="`赠送${item.quantity}月卡`"></tm-text>
          <tm-text
            :fontSize="34"
            color="orange"
            _class="text-weight-b"
            :label="`+${item.quantity}`"
          ></tm-text>
        </view>
        <view class="flex flex-between mt-20">
          <tm-text :fontSize="24" color="grey" :label="item.createDate"></tm-text>
          <tm-text
            v-if="item.type === 1 || item.type === 2"
            :fontSize="24"
            color="grey-darken-1"
            label="充值"
          ></tm-text>
          <tm-text
            v-else-if="item.type === 3 || item.type === 4 || item.type === 5"
            :fontSize="24"
            color="grey-darken-1"
            label="消费"
          ></tm-text>
          <tm-text
            v-else-if="item.type === 6 || item.type === 7"
            :fontSize="24"
            color="grey-darken-1"
            label="赠送"
          ></tm-text>
        </view>
      </tm-sheet>
    </tm-sticky>
  </tm-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad, onPullDownRefresh, onReachBottom, onShow } from '@dcloudio/uni-app'
import pinia from '@/store/store'
import { useUser } from '@/store/user'
import { IPageRequestCommon, IUserInfo } from '@/interfaces/common'
import { navigateTo } from '@/common/utils/base'
import { getOwnCouponList } from '@/service/user'
import { ICouponData } from '@/interfaces/pay'
const userStore = useUser(pinia)
import * as dayjs from '@/tmui/tool/dayjs/esm/index'
const DayJs = dayjs.default

const goToPayPage = () => {
  navigateTo({ url: '/pages/payTicket/index' })
}

const page = ref<IPageRequestCommon>({
  pageNum: 1,
  pageSize: 10,
})
const total = ref(0)
const ownCouponData = ref<Array<ICouponData>>([])
const getOwnCouponListAction = async () => {
  const res = await getOwnCouponList(page.value)
  if (res) {
    const listData = res.data.list as Array<ICouponData>
    listData.forEach(item => {
      item.createDate = DayJs(item.createDate).format('YYYY-MM-DD HH:mm:ss')
    })
    total.value = res.data.total as number
    //如果是顶部下拉刷新
    if (topRefreshFlag.value) {
      ownCouponData.value = listData
      uni.stopPullDownRefresh()
      topRefreshFlag.value = false
      page.value.pageNum++
      return
    }

    if (bottomRefreshFlag.value) {
      console.log(
        ownCouponData.value.length <= total.value,
        ownCouponData.value.length,
        total.value
      )
      if (ownCouponData.value.length <= total.value && listData.length > 0) {
        ownCouponData.value?.push(...listData)
        page.value.pageNum++
      }
      bottomRefreshFlag.value = false
    } else {
      ownCouponData.value = listData
      page.value.pageNum++
    }
  }
}

const offset = ref(0)
// #ifdef H5
offset.value = uni.$tm.u.torpx(44)
// #endif
const userInfo = ref<IUserInfo>()
onShow(() => {
  userInfo.value = userStore.userInfo
  page.value.pageNum = 1
  page.value.pageSize = 10
  getOwnCouponListAction()
})

const topRefreshFlag = ref<boolean>(false)
onPullDownRefresh(() => {
  page.value.pageNum = 1
  page.value.pageSize = 10
  topRefreshFlag.value = true
  getOwnCouponListAction()
})

const bottomRefreshFlag = ref<boolean>(false)
onReachBottom(() => {
  bottomRefreshFlag.value = true
  getOwnCouponListAction()
})
</script>