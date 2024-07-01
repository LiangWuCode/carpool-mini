<template>
  <tm-app ref="app">
    <web-view :src="urls"></web-view>
  </tm-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import { share } from '@/tmui/tool/lib/share'
const { onShareAppMessage, onShareTimeline, setShareApp, setShareTime } = share({
  title: '觅行出行使用攻略。',
  desc: '觅行出行，回家的路不再孤单。',
  path: `/pages/common/webView/index`,
  imageUrl: 'http://healthy.wuliang.plus/shareBanner/fc689b34e3cd5c7216908630dc0c5b3.png',
})

onShareAppMessage()
onShareTimeline()
const urls = ref('')

onLoad((option: any) => {
  urls.value = decodeURIComponent(option.url)
  setShareApp({ path: `/pages/common/webView/index?url=${option.url}` })
  setShareTime({ path: `/pages/common/webView/index?url=${option.url}` })
})
</script>
