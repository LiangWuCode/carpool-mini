<template>
  <tm-app ref="app">
    <tm-sheet :margin="[24, 24]" :round="3" :shadow="2">
      <view class="flex flex-center pb-n6"
        ><tm-text class="text-weight-b" color="orange" label="合理安排置顶时间"></tm-text
      ></view>
      <tm-divider :margin="[16, 0]"></tm-divider>
      <tm-cell
        :round="3"
        :margin="[0]"
        :rightText="`${topCount}小时`"
        :titleFontSize="30"
        rightColor="grey-darken-1"
        title="选择置顶时长"
        @click="selectTopCountFlag = true"
      >
      </tm-cell>
      <tm-divider :margin="[16, 0]"></tm-divider>
      <tm-cell
        :round="3"
        :margin="[0]"
        rightColor="grey"
        :rightText="`${total}券`"
        :titleFontSize="30"
        title="总消费券"
      >
      </tm-cell>
    </tm-sheet>
    <tm-sheet transprent :margin="[24, 36]" :padding="[0]" :round="3" :shadow="2">
      <tm-button @click="setTopAction" color="primary" block label="确认支付并置顶"></tm-button>
    </tm-sheet>

    <tm-sheet transprent :margin="[36, 36]" :padding="[0]" :round="3" :shadow="2">
      <tm-text
        color="grey"
        :lineHeight="50"
        label="注：
      1、如果当前已是置顶状态，且未结束，将会在当前时间上累加；(例如：现有置顶15:30结束，这里选择1小时，那么结束时间即为16:30)
      2、如果当前置顶状态已结束，或者未置顶，将会在提交成功后从当前时间点开始计算置顶时间；
      3、置顶状态为一次性操作，置顶后所使用的券不再退还，请谨慎操作，合理安排置顶时间。
      "
      ></tm-text>
    </tm-sheet>

    <tm-picker
      v-model:show="selectTopCountFlag"
      :columns="topCountMaxData"
      @confirm="confirmSelectTopCount"
    ></tm-picker>
  </tm-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getDictData } from '@/service/common'
import { setTop } from '@/service/rideTrips'
import { navBack } from '@/common/utils';

//置顶单价
const topPrice = ref<number>(1)
const topCountMax = ref<number>(7)
const topCountMaxData = ref<Array<{ text: string; id: number }>>([])
const total = ref<number>(1)
const generateCountData = () => {
  const data = []
  for (let i = 1; i <= topCountMax.value; i++) {
    data.push({
      text: i + '小时',
      id: i,
    })
  }
  topCountMaxData.value = data
}

// 获取置顶相关配置
const getTopData = async () => {
  const res = await getDictData('wechat_publish')
  if (res) {
    const data = res.data
    data.forEach((element: any) => {
      if (element.label === 'topHourPrice') {
        topPrice.value = element.value as any as number
      } else if (element.label === 'topCountMax') {
        topCountMax.value = element.value as any as number
        generateCountData()
      }
    })
  }
}

// 选择置顶时长
const selectTopCountFlag = ref<boolean>(false)
const topCount = ref<number>(1)
const confirmSelectTopCount = (value: any) => {
  topCount.value = topCountMaxData.value[value[0]].id
  total.value = topCount.value * topPrice.value
}

const setTopAction = async () => {
  const res = await setTop(rideTripsId.value, topCount.value)
  if(res){
    navBack()
  }
}

const rideTripsId = ref<number>(0)
onLoad((option: any) => {
  rideTripsId.value = option.rideTripsId
  getTopData()
})
</script>
