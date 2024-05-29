<template>
  <tm-app ref="app">
    <tm-sheet :margin="[24, 12]" :round="3" :shadow="2">
      <tm-html :content="htmlContent"></tm-html>
    </tm-sheet>
  </tm-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onShow, onLoad } from '@dcloudio/uni-app'
import { getNoticesByType } from '@/service/common'

const htmlContent = ref('')
const getNoticesByTypeAction = async (type: string) => {
  const res = await getNoticesByType(type)
  if (res) {
    htmlContent.value = res.data.content as string
  }
}

onLoad((option: any) => {
  const type = option.type
  getNoticesByTypeAction(type)
})
</script>