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
        @click="carouselTap"
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
    <tm-modal
      color="white"
      okColor="primary"
      cancelColor="primary"
      okLinear="left"
      :height="350"
      splitBtn
      title="提醒"
      okText="确定"
      content="您还未完善用户信息，确定跳转信息完善页面吗？"
      v-model:show="userInfoFlag"
      @ok="gotoUpdateUserInfoPage"
    ></tm-modal>
  </tm-app>
</template>

<script lang="ts" setup>
import { navigateTo } from '@/common/utils/base'
import pinia from '@/store/store'
import { useUser } from '@/store/user'
import { getUserInfoAction } from '@/common/ts/nav'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { IUserInfo } from '@/interfaces/common'
import { ref } from 'vue'
import { getDictData } from '@/service/common'
import { share } from '@/tmui/tool/lib/share'
const { onShareAppMessage, onShareTimeline } = share({
  title: '觅行出行，回家的路不再孤单。',
  desc: '觅行出行，回家的路不再孤单。',
  path: `/pages/index/index`,
  imageUrl: 'http://healthy.wuliang.plus/shareBanner/fc689b34e3cd5c7216908630dc0c5b3.png',
})
onShareAppMessage()
onShareTimeline()

const userStore = useUser(pinia)

const listimg = ref<Array<{ url: string; navigateUrl: string }>>([])
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

const userInfoFlag = ref(false)
const goToPublishDetail = (navigatorType: number) => {
  if (userStore.isAuth()) {
    navigateTo({
      url: '/pages/publish/detail/index?type=' + navigatorType,
    })
  } else {
    userInfoFlag.value = true
  }
}

const gotoUpdateUserInfoPage = () => {
  navigateTo({
    url: '/pages/person/updateUserInfo/index',
  })
}

const userInfo = ref<IUserInfo>()
onShow(() => {
  getUserInfoAction()
  userInfo.value = userStore.userInfo
})

onLoad(() => {
  getHomeData()
})
</script>

<style lang="scss" scoped></style>
