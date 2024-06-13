<template>
  <tm-app ref="app">
    <web-view :src="urls"></web-view>
  </tm-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
const urls = ref('')
onLoad(options => {
  urls.value = decodeURIComponent(options.url)
})
</script>
