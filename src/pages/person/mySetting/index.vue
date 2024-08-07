<template>
  <tm-app ref="app">
    <tm-sheet :margin="[24, 12]" :round="3">
      <view class="flex flex-row-center-between my-5">
        <view><tm-text label="是否展示行程人数"></tm-text></view>
        <view class="flex">
          <tm-switch v-model="setting.seatShow" :selected="1" :unSelected="0"
            :default-value="setting.seatShow"></tm-switch>
        </view>
      </view>
      <tm-divider></tm-divider>
      <view class="flex flex-row-center-between my-5">
        <view><tm-text label="是否同步到群组"></tm-text></view>
        <view class="flex">
          <tm-switch disabled v-model="setting.groupShow" :selected="1" :unSelected="0"
            :default-value="setting.groupShow"></tm-switch>
        </view>
      </view>
      <tm-divider></tm-divider>
      <view class="flex flex-row-center-between my-5">
        <view><tm-text label="是否推送留言"></tm-text></view>
        <view class="flex">
          <tm-switch disabled v-model="setting.messageShow" :selected="1" :unSelected="0"
            :default-value="setting.messageShow"></tm-switch>
        </view>
      </view>
    </tm-sheet>

    <tm-button @click="updateUserSettingAction" class="mx-24 mt-n10" block label="提交修改"></tm-button>
  </tm-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { findByUserId, updateUserSetting } from '@/service/setting';
import { IUserSetting } from '@/interfaces/setting';
import { toast } from '@/common/utils';

const setting = ref<IUserSetting>({
  seatShow: 0,
  groupShow: 0,
  messageShow: 0
})
const findByUserIdAction = async () => {
  const res = await findByUserId()
  if (res) {
    setting.value = res.data as IUserSetting
  }
}

const updateUserSettingAction = async () => {
  const res = await updateUserSetting(setting.value)
  if (res) {
    toast('设置成功！', 2000)
  }
}

onShow(() => {
  findByUserIdAction()
})
</script>
