<template>
  <tm-app ref="app" class="pb-n25">
    <tm-sheet :margin="[0, 0, 0, 12]" :padding="[0]" :round="3">
      <map
        style="width: 100%; height: 200px"
        :latitude="point.latitude"
        :longitude="point.longitude"
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
      <tm-divider v-show="rideTrips.type === 1"></tm-divider>
      <view class="flex flex-row-center-between" v-show="rideTrips.type === 1">
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

    <tm-sheet :margin="[24, 12]" :round="3">
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
            <tm-icon :font-size="26" color="purple" name="tmicon-md-person"></tm-icon>
            <tm-text label="全程"></tm-text>
          </view>
          <view class="ml-10 border-l-2 pl-20">
            <tm-text
              :font-size="28"
              _class="text-weight-9"
              :label="`${rideTrips.duration}km`"
            ></tm-text>
          </view>
        </view>
      </view>
      <tm-divider></tm-divider>
      <view class="flex flex-row-center-between">
        <view class="flex flex-row-center-between">
          <view class="flex flex-row-center-between pr-n10" style="width: 100rpx">
            <tm-icon :font-size="26" color="indigo" name="tmicon-md-phone-portrait"></tm-icon>
            <tm-text label="用时"></tm-text>
          </view>
          <view class="ml-10 border-l-2 pl-20">
            <tm-text :font-size="28" _class="text-weight-9" :label="rideTrips.distance"></tm-text>
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
            <tm-text :font-size="28" _class="text-weight-9" :label="rideTrips.mobile"></tm-text>
          </view>
        </view>
      </view>
      <tm-divider></tm-divider>
      <view class="flex flex-row-center-between">
        <view class="flex flex-row-center-between">
          <view class="flex flex-row-center-between pr-n10" style="width: 100rpx">
            <tm-icon :font-size="26" color="teal" name="tmicon-weixin"></tm-icon>
            <tm-text label="微信"></tm-text>
          </view>
          <view class="ml-10 border-l-2 pl-20">
            <tm-text :font-size="28" _class="text-weight-9" :label="rideTrips.chatInfo"></tm-text>
          </view>
        </view>
      </view>
    </tm-sheet>

    <tm-sheet :margin="[24, 12, 24, 40]" :round="3" v-show="rideTrips.rideMessageVos?.length > 0">
      <view class="flex flex-row-center-between">
        <view class="flex flex-row-center-start">
          <tm-avatar :font-size="20" :size="34" icon="tmicon-weixin"></tm-avatar>
          <tm-text _class="ml-10" color="grey" label="微信用户"></tm-text>
        </view>
        <view> <tm-text color="primary" label="对方未读"></tm-text></view>
      </view>
      <tm-divider></tm-divider>
      <tm-text label="我们这里四个人了！"></tm-text>
      <tm-divider></tm-divider>
      <view class="flex flex-row-center-between">
        <view class="flex flex-row-center-start">
          <tm-text _class="ml-10" color="grey" label="2小时前"></tm-text>
          <tm-text _class="ml-10" color="grey" label="留言"></tm-text>
        </view>
        <view> <tm-button :margin="[10]" size="small" :shadow="0" label="回复"></tm-button></view>
      </view>
    </tm-sheet>
    <tm-sheet class="fixed b-0 fulled" :padding="[0]" :margin="[0]" :round="3">
      <tm-row :width="750" class="fulled" :column="4" :height="100">
        <tm-col class="fulled-height" :col="1" :height="100">
          <tm-icon :font-size="32" _class="mb-5 mt-10" name="tmicon-home"></tm-icon>
          <tm-text label="首页"></tm-text>
        </tm-col>
        <tm-col class="fulled-height" color="primary" :col="1" :height="100">
          <tm-icon :font-size="32" _class="mb-5 mt-10" name="tmicon-share"></tm-icon>
          <tm-text label="分享"></tm-text>
        </tm-col>
        <tm-col class="fulled-height" color="orange" :col="1" :height="100">
          <tm-icon :font-size="32" _class="mb-5 mt-10" name="tmicon-commentdots-fill"></tm-icon>
          <tm-text label="在线留言"></tm-text>
        </tm-col>
        <tm-col class="fulled-height" color="red" :col="1" :height="100">
          <tm-text _class="mb-5 mt-10" label="一键拨号"></tm-text>
          <tm-text label="15233552519"></tm-text>
        </tm-col>
      </tm-row>
    </tm-sheet>
  </tm-app>
</template>

<script setup lang="ts">
import { IPoint } from '@/interfaces/rideTrips'
import { getRideTripsDetail } from '@/service/rideTrips'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
const point = ref<IPoint>({ latitude: 39.909, longitude: 116.39742 })

//获取行程详情
const rideTrips = ref<any>({})
const getRideTripsDetailAction = async (rideTripsId: number) => {
  const res = await getRideTripsDetail(rideTripsId)
  rideTrips.value = res.data
}

const rideTripsId = ref<number>(0)
onLoad((option: any) => {
  rideTripsId.value = option.rideTripsId
  getRideTripsDetailAction(rideTripsId.value)
})
</script>
