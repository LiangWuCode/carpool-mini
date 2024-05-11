<template>
  <tm-app ref="app">
    <tm-sheet :margin="[24, 12]" :padding="[20, 0]" :round="3">
      <view class="flex flex-row-center-between">
        <view class="flex">
          <tm-text color="orange" label="每条消息"></tm-text>
          <tm-text color="orange" label="0.50"></tm-text>
          <tm-text color="orange" label="券"></tm-text>
          <tm-text color="orange" label="（您的积分："></tm-text>
          <tm-text color="orange" label="1.00"></tm-text>
          <tm-text color="orange" label="）"></tm-text>
        </view>
        <view>
          <tm-button size="small" label="点击充值"></tm-button>
        </view>
      </view>
    </tm-sheet>
    <tm-sheet :margin="[24, 12]" :round="3">
      <tm-text
        :font-size="30"
        color="grey-darken-1"
        _class="text-weight-b"
        label="拼车信息"
      ></tm-text>
      <tm-divider></tm-divider>
      <tm-form ref="form" :margin="[0]" :padding="[0]" v-model="carpoolInfo" :label-width="100">
        <tm-form-item
          :margin="[0]"
          :padding="[0]"
          required
          label="起点"
          field="startAddress"
          :rules="[{ required: true, message: '请输入起点', trigger: 'blur' }]"
        >
          <tm-input
            :inputPadding="[0, 0]"
            v-model.lazy="carpoolInfo.startAddress"
            :transprent="true"
            :showBottomBotder="false"
          >
          </tm-input>
        </tm-form-item>
      </tm-form>
    </tm-sheet>
  </tm-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const carpoolInfo = ref<{
  startAddress: string
}>({
  startAddress: '',
})
</script>

<style lang="scss" scoped>
</style>