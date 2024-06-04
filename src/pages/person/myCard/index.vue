<template>
  <tm-app ref="app">
    <tm-result v-show="ownCardData?.length === 0" :showBtn="false"></tm-result>
    <tm-sheet
      v-for="(item, index) in ownCardData"
      :key="index"
      :margin="[24, 12]"
      :padding="[0]"
      :round="3"
      :shadow="2"
    >
      <view class="relative fulled">
        <tm-image :width="700" :height="220" :src="cardImage"></tm-image>
        <view class="absolute t-0 l-0 px-n10 py-25" style="width: calc(100% - 90rpx)">
          <view class="flex flex-row-center-between fulled">
            <view class="flex flex-center">
              <view>
                <tm-image :width="82" :height="82" :src="cardIconImage"></tm-image>
              </view>
              <view class="ml-n7">
                <tm-text
                  color="white"
                  :fontSize="32"
                  _class="text-weight-b mb-14"
                  label="发布月卡"
                ></tm-text>
                <tm-text
                  color="white"
                  :fontSize="24"
                  :label="`有效期至${item.createDate}`"
                ></tm-text>
              </view>
            </view>
            <view class="flex flex-row-bottom-start">
              <tm-text
                color="orange"
                :fontSize="30"
                _class="text-weight-b mr-6"
                :label="item.status"
              ></tm-text>
            </view>
          </view>
          <view class="flex flex-row-center-between fulled mt-n8">
            <view class="flex">
              <tm-tag
                :round="10"
                class="mr-10"
                :margin="[0]"
                outlined
                :shadow="0"
                color="white"
                size="xs"
                label="行程发布可用"
              >
              </tm-tag>
              <tm-tag
                :round="10"
                :margin="[0]"
                outlined
                :shadow="0"
                color="white"
                size="xs"
                label="30天有效"
              >
              </tm-tag>
            </view>
            <!-- <view>
              <tm-tag
                :round="10"
                :margin="[0]"
                :shadow="0"
                icon="tmicon-angle-right"
                iconAlign="right"
                color="indigo"
                size="n"
                label="立即购买"
              >
              </tm-tag>
            </view> -->
          </view>
        </view>
      </view>
    </tm-sheet>
  </tm-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onPullDownRefresh, onReachBottom, onShow } from '@dcloudio/uni-app'
import { IPageRequestCommon } from '@/interfaces/common'
import { getCardList } from '@/service/user'
import * as dayjs from '@/tmui/tool/dayjs/esm/index'
import { ICouponData } from '@/interfaces/pay'
import cardImage from '@/static/pay/card.png'
import cardIconImage from '@/static/pay/card-icon.png'
import { i } from 'vite/dist/node/types.d-aGj9QkWt'
const DayJs = dayjs.default

const page = ref<IPageRequestCommon>({
  pageNum: 1,
  pageSize: 10,
})
const total = ref(0)
const ownCardData = ref<Array<ICouponData>>([])
const getCardListAction = async () => {
  const res = await getCardList(page.value)
  if (res) {
    const listData = res.data.list as Array<ICouponData>
    listData.forEach(item => {
      item.createDate = DayJs(item.createDate).add(30, 'day').format('YYYY-MM-DD HH:mm:ss')
      if (DayJs(item.createDate).isAfter(new Date())) {
        item.status = '生效中'
      } else {
        item.status = '已过期'
      }
    })
    total.value = res.data.total as number
    //如果是顶部下拉刷新
    if (topRefreshFlag.value) {
      ownCardData.value = listData
      uni.stopPullDownRefresh()
      topRefreshFlag.value = false
      page.value.pageNum++
      return
    }

    if (bottomRefreshFlag.value) {
      if (ownCardData.value.length <= total.value && listData.length > 0) {
        ownCardData.value?.push(...listData)
        page.value.pageNum++
      }
      bottomRefreshFlag.value = false
    } else {
      ownCardData.value = listData
      page.value.pageNum++
    }
  }
}

onShow(() => {
  page.value.pageNum = 1
  page.value.pageSize = 10
  getCardListAction()
})

const topRefreshFlag = ref<boolean>(false)
onPullDownRefresh(() => {
  page.value.pageNum = 1
  page.value.pageSize = 10
  topRefreshFlag.value = true
  getCardListAction()
})

const bottomRefreshFlag = ref<boolean>(false)
onReachBottom(() => {
  bottomRefreshFlag.value = true
  getCardListAction()
})
</script>
