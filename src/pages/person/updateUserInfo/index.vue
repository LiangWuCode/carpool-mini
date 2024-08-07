<template>
  <tm-app ref="app">
    <tm-sheet :margin="[0, 0, 0, 0]" :padding="[0, 48]" color="blue">
      <view class="flex flex-col flex-center fulled">
        <tm-avatar outlined :size="100" :round="16" color="white" icon="tmicon-weixin"
          :img="changeUserInfoData.avatarUrl"></tm-avatar>
        <tm-button :width="300" :margin="[0, 24]" open-type="chooseAvatar" @chooseavatar="onChooseavatar" text
          size="small" outlined label="点这里，获取头像"></tm-button>
      </view>
    </tm-sheet>
    <tm-sheet :margin="[24, 24]" :round="3">
      <view class="flex flex-row-center-between">
        <view class="flex fulled flex-row-center-between">
          <view class="flex flex-shrink flex-row-center-between pr-n10" style="width: 120rpx">
            <tm-icon :font-size="26" color="primary" name="tmicon-md-person"></tm-icon>
            <tm-text label="昵称"></tm-text>
            <tm-text _class="mr-5" :font-size="30" color="red" label="*"></tm-text>
          </view>
          <view class="ml-10 fulled border-l-2 pl-20">
            <tm-input v-model="changeUserInfoData.username" placeholder="输入昵称" :transprent="true"
              class="fulled mr-20"></tm-input>
          </view>
        </view>
      </view>
      <tm-divider></tm-divider>
      <view class="flex flex-row-center-between">
        <view class="flex flex-row-center-between">
          <view class="flex flex-row-center-between pr-n10" style="width: 120rpx">
            <tm-icon :font-size="26" color="orange" name="tmicon-md-male"></tm-icon>
            <tm-text label="性别"></tm-text>
            <tm-text _class="mr-5" :font-size="30" color="red" label="*"></tm-text>
          </view>
          <view class="ml-10 border-l-2 pl-20">
            <tm-radio-group :defaultValue="1" v-model="changeUserInfoData.sex">
              <tm-radio :value="1" label="男"></tm-radio>
              <tm-radio :value="2" label="女"></tm-radio>
            </tm-radio-group>
          </view>
        </view>
      </view>
      <tm-divider></tm-divider>
      <view class="flex flex-row-center-between">
        <view class="flex flex-start fulled">
          <view class="flex flex-shrink flex-row-center-between pr-n10" style="width: 120rpx">
            <tm-icon :font-size="26" color="red" name="tmicon-md-phone-portrait"></tm-icon>
            <tm-text label="手机"></tm-text>
            <tm-text _class="mr-5" :font-size="30" color="red" label="*"></tm-text>
          </view>
          <view class="flex fulled flex-row-center-between ml-10 border-l-2 pl-20">
            <tm-input v-model="changeUserInfoData.photo" placeholder="输入号码" disabled type="number" :transprent="true"
              class="fulled mr-20"></tm-input>
            <tm-button :margin="[0]" :padding="[0, 20]" :width="140" size="small" openType="getPhoneNumber"
              :disabled="changeUserInfoData.photo" @getphonenumber="getphonenumber" label="获取手机号"></tm-button>
          </view>
        </view>
      </view>
      <tm-divider></tm-divider>
      <view class="flex flex-row-center-between">
        <view class="flex fulled flex-row-center-between">
          <view class="flex flex-shrink fulled flex-row-center-between pr-n10" style="width: 120rpx">
            <tm-icon :font-size="26" color="teal" name="tmicon-weixin"></tm-icon>
            <tm-text label="微信"></tm-text>
            <!-- <tm-text _class="mr-5" :font-size="30" color="red" label="*"></tm-text> -->
          </view>
          <view class="ml-10 fulled border-l-2 pl-20">
            <tm-input v-model="changeUserInfoData.chatInfo" placeholder="输入微信号" :transprent="true"
              class="fulled mr-20"></tm-input>
          </view>
        </view>
      </view>
    </tm-sheet>

    <tm-button @click="changePersonInfoAction" class="mx-24 mt-n10" block label="提交修改"></tm-button>
  </tm-app>
</template>

<script setup lang="ts">
import { getUserInfoAction } from '@/common/ts/nav'
import { toast } from '@/common/utils'
import { IChangeUserInfo, IUserInfo } from '@/interfaces/common'
import { getPhoneNo, uploadFileAction } from '@/service/common'
import { changePersonInfo } from '@/service/user'
import { ref } from 'vue'
import pinia from '@/store/store'
import { useUser } from '@/store/user'
import { onLoad } from '@dcloudio/uni-app'

const userStore = useUser(pinia)

const onChooseavatar = (e: any) => {
  uploadFileAction(e.detail.avatarUrl).then(res => {
    changeUserInfoData.value.avatarUrl = res as string
  })
}
const getphonenumber = async (e: any) => {
  console.log(e)
  if (e.target.errMsg === 'getPhoneNumber:ok') {
    const res = await getPhoneNo(e.detail.code)
    if (res) {
      changeUserInfoData.value.photo = res.data as any
    }
  }

}
const changeUserInfoData = ref<IChangeUserInfo>({
  avatarUrl: '',
  username: '',
  photo: '',
  sex: 1,
  chatInfo: '',
})

const changePersonInfoAction = async () => {
  const res = await changePersonInfo(changeUserInfoData.value)
  if (res) {
    getUserInfoAction()
    toast('修改成功！', 2000)
  }
}

const userInfo = ref<IUserInfo>()
onLoad(async () => {
  userInfo.value = userStore.userInfo
  changeUserInfoData.value = {
    avatarUrl: userInfo.value?.avatar || '',
    username: userInfo.value?.nickName || '',
    photo: userInfo.value?.mobile || '',
    sex: userInfo.value?.sex || 1,
    chatInfo: userInfo.value?.chatInfo || '',
  }
})
</script>

<style></style>
