<template>
  <tm-app ref="app">
    <tm-sheet :margin="[0, 0, 0, 20]" :padding="[0, 48]" color="blue">
      <view class="flex flex-col flex-center fulled">
        <tm-avatar
          outlined
          :size="100"
          :round="16"
          color="white"
          icon="tmicon-weixin"
          :img="avatarUrl"
        ></tm-avatar>
        <tm-button
          :width="300"
          :margin="[0, 24]"
          open-type="chooseAvatar"
          @chooseavatar="onChooseavatar"
          text
          size="small"
          outlined
          label="点这里，获取头像"
        ></tm-button>
      </view>
    </tm-sheet>
  </tm-app>
</template>

<script setup lang="ts">
import { uploadFileAction } from '@/service/common'
import { ref } from 'vue'

const avatarUrl = ref('')
const onChooseavatar = (e: any) => {
  uploadFileAction(e.detail.avatarUrl).then(res => {
    avatarUrl.value = res as string
  })
}
</script>

<style></style>
