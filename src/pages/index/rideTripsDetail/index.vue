<template>
  <tm-app ref="app" class="pb-n25">
    <tm-sheet :margin="[0, 0, 0, 12]" :padding="[0]" :round="3">
      <map
        style="width: 100%; height: 200px"
        :latitude="point.latitude"
        :longitude="point.longitude"
        :polyline="polyline"
        :include-points="polylineItem"
        :markers="markers"
      >
      </map>
    </tm-sheet>
    <tm-sheet :margin="[24, 12]" :round="3">
      <view class="flex flex-row-center-between">
        <tm-text
          :font-size="30"
          color="grey-darken-1"
          _class="text-weight-b"
          :label="rideTrips.type === 1 ? '车找人' : '人找车'"
        ></tm-text>
        <tm-text
          :font-size="26"
          color="grey-darken-1"
          :label="`${rideTrips.viewCount}次浏览·${rideTrips.messageCount}条留言`"
        ></tm-text>
      </view>
      <tm-divider></tm-divider>
      <view class="flex flex-row-center-between">
        <view class="flex flex-row-center-between">
          <view class="flex flex-row-center-between pr-n10" style="width: 100rpx">
            <tm-icon :font-size="22" color="primary" name="tmicon-yuan"></tm-icon>
            <tm-text label="起点"></tm-text>
          </view>
          <view class="ml-10 border-l-2 pl-20">
            <tm-text
              :font-size="28"
              _class="text-weight-9"
              :label="rideTrips.startAddress"
            ></tm-text>
          </view>
        </view>
        <view><tm-icon :fontSize="30" color="primary" name="tmicon-map"></tm-icon></view>
      </view>
      <tm-divider v-if="rideTrips.type === 1 && rideTrips.channelAddress"></tm-divider>
      <view
        class="flex flex-row-center-between"
        v-if="rideTrips.type === 1 && rideTrips.channelAddress"
      >
        <view class="flex flex-row-center-between">
          <view class="flex flex-row-center-between pr-n10" style="width: 100rpx">
            <tm-icon :font-size="22" color="green" name="tmicon-yuan"></tm-icon>
            <tm-text label="途径"></tm-text>
          </view>
          <view class="ml-10 border-l-2 pl-20">
            <tm-text
              :font-size="28"
              _class="text-weight-9"
              :label="rideTrips.channelAddress"
            ></tm-text>
          </view>
        </view>
      </view>
      <tm-divider></tm-divider>
      <view class="flex flex-row-center-between">
        <view class="flex flex-row-center-between">
          <view class="flex flex-row-center-between pr-n10" style="width: 100rpx">
            <tm-icon :font-size="22" color="red" name="tmicon-yuan"></tm-icon>
            <tm-text label="终点"></tm-text>
          </view>
          <view class="ml-10 border-l-2 pl-20">
            <tm-text :font-size="28" _class="text-weight-9" :label="rideTrips.endAddress"></tm-text>
          </view>
        </view>
        <view><tm-icon :fontSize="30" color="primary" name="tmicon-map"></tm-icon></view>
      </view>
      <tm-divider></tm-divider>
      <view class="flex flex-row-center-between">
        <view class="flex flex-row-center-between">
          <view class="flex flex-row-center-between pr-n10" style="width: 100rpx">
            <tm-icon :font-size="26" color="primary" name="tmicon-clock"></tm-icon>
            <tm-text label="时间"></tm-text>
          </view>
          <view class="ml-10 border-l-2 pl-20">
            <tm-text
              :font-size="28"
              _class="text-weight-9"
              color="orange"
              :label="rideTrips.createDateDesc"
            ></tm-text>
          </view>
        </view>
      </view>
      <tm-divider></tm-divider>
      <view class="flex flex-row-center-between">
        <view class="flex flex-row-center-between">
          <view class="flex flex-row-center-between pr-n10" style="width: 100rpx">
            <tm-icon :font-size="26" color="primary" name="tmicon-user-group-fill"></tm-icon>
            <tm-text :label="rideTrips.type === 1 ? '空位' : '同行'"></tm-text>
          </view>
          <view class="ml-10 border-l-2 pl-20">
            <tm-text
              :font-size="28"
              _class="text-weight-9"
              color="orange"
              :label="rideTrips.seats"
            ></tm-text>
          </view>
        </view>
      </view>
    </tm-sheet>

    <tm-sheet :margin="[24, 12]" :round="3" v-if="rideTrips.polyline">
      <view class="flex flex-row-center-between">
        <tm-text
          :font-size="30"
          color="grey-darken-1"
          _class="text-weight-b"
          label="预估时效"
        ></tm-text>
      </view>
      <tm-divider></tm-divider>
      <view class="flex flex-row-center-between">
        <view class="flex flex-row-center-between">
          <view class="flex flex-row-center-between pr-n10" style="width: 100rpx">
            <tm-icon :font-size="26" color="purple" name="tmicon-paperplane-fill"></tm-icon>
            <tm-text label="全程"></tm-text>
          </view>
          <view class="ml-10 border-l-2 pl-20">
            <tm-text
              :font-size="28"
              _class="text-weight-9"
              :label="`${rideTrips.distance} km`"
            ></tm-text>
          </view>
        </view>
      </view>
      <tm-divider></tm-divider>
      <view class="flex flex-row-center-between">
        <view class="flex flex-row-center-between">
          <view class="flex flex-row-center-between pr-n10" style="width: 100rpx">
            <tm-icon :font-size="26" color="indigo" name="tmicon-clock-fill"></tm-icon>
            <tm-text label="用时"></tm-text>
          </view>
          <view class="ml-10 border-l-2 pl-20">
            <tm-text :font-size="28" _class="text-weight-9" :label="rideTrips.duration"></tm-text>
          </view>
        </view>
      </view>
    </tm-sheet>

    <tm-sheet :margin="[24, 12]" :round="3">
      <view class="flex flex-row-center-between">
        <tm-text
          :font-size="30"
          color="grey-darken-1"
          _class="text-weight-b"
          label="备注"
        ></tm-text>
      </view>
      <tm-divider></tm-divider>
      <tm-text :label="rideTrips.notes"></tm-text>
    </tm-sheet>

    <tm-sheet :margin="[24, 12]" :round="3">
      <view class="flex flex-row-center-between">
        <tm-text
          :font-size="30"
          color="grey-darken-1"
          _class="text-weight-b"
          label="联系人"
        ></tm-text>
        <tm-text :fontSize="24" color="grey" label="点击号码可复制"></tm-text>
      </view>
      <tm-divider></tm-divider>
      <view class="flex flex-row-center-between">
        <view class="flex flex-row-center-between">
          <view class="flex flex-row-center-between pr-n10" style="width: 100rpx">
            <tm-icon :font-size="26" color="purple" name="tmicon-md-person"></tm-icon>
            <tm-text label="称呼"></tm-text>
          </view>
          <view class="ml-10 border-l-2 pl-20">
            <tm-text :font-size="28" _class="text-weight-9" :label="rideTrips.username"></tm-text>
          </view>
        </view>
      </view>
      <tm-divider></tm-divider>
      <view class="flex flex-row-center-between">
        <view class="flex flex-row-center-between">
          <view class="flex flex-row-center-between pr-n10" style="width: 100rpx">
            <tm-icon :font-size="26" color="indigo" name="tmicon-md-phone-portrait"></tm-icon>
            <tm-text label="联系"></tm-text>
          </view>
          <view class="ml-10 border-l-2 pl-20">
            <tm-text
              :font-size="28"
              @click="
                rideTrips.status === 0
                  ? setClipboardData(rideTrips.mobile, '复制联系人成功！')
                  : showToast({
                      title: '当前行程已经满座！',
                      icon: 'none',
                      duration: 2000,
                    })
              "
              _class="text-weight-9"
              :label="rideTrips.mobileEllipsis"
            ></tm-text>
          </view>
        </view>
      </view>
      <tm-divider></tm-divider>
      <view class="flex flex-row-center-between" v-if="rideTrips.chatInfo != ''">
        <view class="flex flex-row-center-between">
          <view class="flex flex-row-center-between pr-n10" style="width: 100rpx">
            <tm-icon :font-size="26" color="teal" name="tmicon-weixin"></tm-icon>
            <tm-text label="微信"></tm-text>
          </view>
          <view class="ml-10 border-l-2 pl-20">
            <tm-text
              :font-size="28"
              @click="
                rideTrips.status === 0
                  ? setClipboardData(rideTrips.chatInfo, '复制微信号成功！')
                  : showToast({
                      title: '当前行程已经满座！',
                      icon: 'none',
                      duration: 2000,
                    })
              "
              _class="text-weight-9"
              :label="rideTrips.chatInfoEllipsis"
            ></tm-text>
          </view>
        </view>
      </view>
    </tm-sheet>

    <tm-sheet
      v-for="(item, index) in rideTrips.rideMessageVos"
      :key="index"
      :margin="[24, 12, 24, 40]"
      :round="3"
      v-show="rideTrips.rideMessageVos?.length > 0"
    >
      <view class="flex flex-row-center-between">
        <view class="flex flex-row-center-start">
          <tm-avatar :font-size="40" :size="34" icon="tmicon-weixin" :img="item.avatar"></tm-avatar>
          <tm-text _class="ml-10" color="grey" :label="item.username"></tm-text>
        </view>
        <view v-if="item.readStatus === 0">
          <tm-text color="primary" label="对方未读"></tm-text>
        </view>
        <view v-else> <tm-text color="grey" label="对方已读"></tm-text></view>
      </view>
      <tm-divider></tm-divider>
      <tm-text :label="item.content"></tm-text>
      <view
        class="flex mt-10"
        v-for="(itemMessage, indexMessage) in item.rideMessageVoList"
        :key="indexMessage"
      >
        <tm-text
          color="orange"
          :font-size="24"
          :label="`${itemMessage.username}：${itemMessage.content}`"
        ></tm-text>
        <tm-text
          class="flex-shrink"
          color="grey"
          :font-size="24"
          :label="`(${itemMessage.createDateDesc}前)`"
        ></tm-text>
      </view>

      <tm-divider></tm-divider>
      <view class="flex flex-row-center-between">
        <view class="flex flex-row-center-start">
          <tm-text _class="ml-10" color="grey" :label="`${item.createDateDesc}前`"></tm-text>
          <tm-text _class="ml-10" color="grey" label="留言"></tm-text>
        </view>
        <view>
          <tm-button
            :margin="[10]"
            size="small"
            @click="messageAction(item.id)"
            :shadow="0"
            label="回复"
          ></tm-button>
        </view>
      </view>
    </tm-sheet>
    <view style="margin-top: env(safe-area-inset-bottom); padding-bottom: 12rpx"></view>

    <tm-sheet class="fixed fulled b-0" :padding="[0]" :margin="[0]">
      <tm-row :width="750" class="fulled" :column="4" :height="100">
        <tm-col @click="goToHomePage" class="fulled-height" :col="1" :height="100">
          <tm-icon :font-size="32" _class="mb-5 mt-10" name="tmicon-home"></tm-icon>
          <tm-text label="首页"></tm-text>
        </tm-col>
        <tm-col class="fulled-height relative" color="primary" :col="1" :height="100">
          <button
            style="
              color: #ffffff;
              background: #0163ff;
              border: #0163ff;
              padding: 0;
              line-height: 1.5;
              font-size: 28rpx;
              width: 100%;
              height: 100%;
              position: absolute;
            "
            color="primary"
            size="mini"
            plain
            openType="share"
          >
            <tm-icon :font-size="32" _class="mt-15" name="tmicon-share"></tm-icon>
            <view class="mt-10">分享</view>
          </button>
        </tm-col>
        <tm-col
          @click="messageAction(0)"
          class="fulled-height"
          color="orange"
          :col="1"
          :height="100"
        >
          <tm-icon :font-size="32" _class="mb-5 mt-10" name="tmicon-commentdots-fill"></tm-icon>
          <tm-text label="在线留言"></tm-text>
        </tm-col>
        <tm-col
          @click="
            rideTrips.status === 0
              ? callPhone(rideTrips.mobile)
              : showToast({
                  title: '当前行程已经满座！',
                  icon: 'none',
                  duration: 2000,
                })
          "
          class="fulled-height"
          color="red"
          :col="1"
          :height="100"
        >
          <tm-text _class="mb-5 mt-10" label="一键拨号"></tm-text>
          <tm-text :label="rideTrips.mobileEllipsis"></tm-text>
        </tm-col>
      </tm-row>
      <view style="height: env(safe-area-inset-bottom); background-color: #fff"></view>
    </tm-sheet>
    <tm-modal
      ref="modal"
      color="grey-5"
      :height="500"
      :border="0"
      text
      okColor="primary"
      cancelColor="white"
      linear="bottom"
      title="留言"
      v-model:show="messageShow"
      @ok="messageConfirm"
    >
      <view>
        <tm-input :height="300" v-model="message.content" type="textarea"></tm-input>
      </view>
    </tm-modal>
  </tm-app>
</template>

<script setup lang="ts">
import { IPoint, IRideTripsDetail } from '@/interfaces/rideTrips'
import { IRideMessage } from '@/interfaces/message'
import { getRideTripsDetail } from '@/service/rideTrips'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { setClipboardData, showToast, switchTab } from '@/common/utils/base'
import { callPhone } from '@/tmui/tool/function/util'
import { share } from '@/tmui/tool/lib/share'
import { rideMessageAdd } from '@/service/message'
import { wxshareConfig } from '@/tmui/tool/lib/interface'
import startImage from '@/static/rideTrips/start.png'
import endImage from '@/static/rideTrips/end.png'
import { getUserInfoAction } from '@/common/ts/nav'
const { onShareAppMessage, setShareApp, setShareTime, onShareTimeline } = share()
onShareAppMessage()
onShareTimeline()
const point = ref<IPoint>({ latitude: 39.909, longitude: 116.39742 })

//获取行程详情
const rideTrips = ref<IRideTripsDetail>({
  type: 1,
  messageCount: 0,
  viewCount: 0,
  startAddress: '',
  channelAddress: '',
  endAddress: '',
  createDateDesc: '',
  seats: 0,
  duration: '',
  distance: 0,
  notes: '',
  username: '',
  mobile: '',
  chatInfo: '',
  polyline: [],
  rideMessageVos: [],
  mobileEllipsis: '',
  shareImageUrl: '',
  status: 0,
  chatInfoEllipsis: '',
})

const polyline = ref<Array<any>>([])
const polylineItem = ref<Array<IPoint>>([])
const markers = ref<Array<any>>([])
const getRideTripsDetailAction = async (rideTripsId: number) => {
  const res = await getRideTripsDetail(rideTripsId)
  if (res) {
    rideTrips.value = res.data as IRideTripsDetail
    shareConfig.value.desc = `${rideTrips.value.startAddress}到${rideTrips.value.endAddress}`
    shareConfig.value.imageUrl = rideTrips.value.shareImageUrl
    shareConfig.value.title =
      (rideTrips.value.type === 1 ? '车找人' : '人找车') + '，点击查看详情！'

    if (rideTrips.value.polyline) {
      polylineItem.value = formatPolyline(rideTrips.value.polyline)
      polyline.value = [
        {
          points: polylineItem.value,
          width: 3,
          arrowLine: true,
          id: 0,
          style: 4,
          color: '#0CF',
        },
      ]
      point.value = polylineItem.value[0]

      markers.value = [
        {
          id: 999,
          latitude: polylineItem.value[0].latitude,
          longitude: polylineItem.value[0].longitude,
          width: 24,
          height: 30,
          anchor: {
            x: 0.5,
            y: 0.5,
          },
          iconPath: startImage,
        },
        {
          id: 998,
          latitude: polylineItem.value[polylineItem.value.length - 1].latitude,
          longitude: polylineItem.value[polylineItem.value.length - 1].longitude,
          width: 24,
          height: 30,
          anchor: {
            x: 0.5,
            y: 0.5,
          },
          iconPath: endImage,
        },
      ]
    }
  }
}

//去首页
const goToHomePage = () => {
  switchTab({
    url: '/pages/index/index',
  })
}

// 点串解压并处理成符合小程序的数据格式
const formatPolyline = (polyline: Array<number>) => {
  const coors = polyline,
    pl = []
  //坐标解压（返回的点串坐标，通过前向差分进行压缩）
  for (let i = 2; i < coors.length; i++) {
    coors[i] = Number(coors[i - 2]) + Number(coors[i]) / 1000000
  }
  //将解压后的坐标放入点串数组pl中
  for (let i = 0; i < coors.length; i += 2) {
    pl.push({
      latitude: coors[i],
      longitude: coors[i + 1],
    })
  }
  return pl
}

const message = ref<IRideMessage>({
  rideTripsId: 0,
  content: '',
  parentId: 0,
})
const messageShow = ref(false)
const messageAction = (parentId: number) => {
  messageShow.value = true
  message.value.parentId = parentId
}

const messageConfirm = async () => {
  const res = await rideMessageAdd(message.value)
  if (res) {
    getRideTripsDetailAction(rideTripsId.value)
  }
}
const rideTripsId = ref<number>(0)
const shareConfig = ref<wxshareConfig>({
  title: '顺风车，点击查看详情！',
  desc: '安康到岚皋，现在就出发！',
  path: '',
  imageUrl: '',
})
onLoad(async (option: any) => {
  rideTripsId.value = option.rideTripsId
  message.value.rideTripsId = option.rideTripsId
  shareConfig.value.path = `/pages/index/rideTripsDetail/index?rideTripsId=${rideTripsId.value}`
  await getUserInfoAction()

  getRideTripsDetailAction(rideTripsId.value)

  setShareApp(shareConfig.value)
  setShareTime(shareConfig.value)
})
</script>
