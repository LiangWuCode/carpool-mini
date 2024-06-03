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
        class="text-weight-b"
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
      <tm-button color="primary" block label="确认支付并置顶"></tm-button>
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

const topCount = ref<number>(1)
const confirmSelectTopCount = (value: any) => {
  topCount.value = value[0]
  total.value = topCount.value * topPrice.value
}

const selectTopCountFlag = ref<boolean>(false)
onLoad(() => {
  getTopData()
})
</script>