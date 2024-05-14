<template>
  <tm-app ref="app">
    <tm-sticky>
      <template v-slot:sticky>
        <view class="relative">
          <view
            class="fulled"
            style="
              height: 200rpx;
              background-image: linear-gradient(to top, #4481eb 0%, #04befe 100%);
              clip-path: ellipse(80% 100% at 50% 100%);
              transform: rotate(180deg);
            "
          >
          </view>
          <view class="absolute t-0 fulled">
            <view class="flex flex-row-center-between mx-50 mt-30">
              <view class="flex flex-row-center-center">
                <tm-icon :font-size="38" color="white" name="tmicon-quan"></tm-icon>
                <tm-text :font-size="30" _class="ml-10 " color="white" label="当前拥有"></tm-text>
              </view>
              <view class="flex flex-row-bottom-center">
                <tm-text :font-size="36" _class="text-weight-b" color="white" label="100"></tm-text>
                <tm-text
                  :font-size="24"
                  _class="text-weight-b ml-5"
                  color="white"
                  label="券"
                ></tm-text>
              </view>
            </view>
            <view class="flex flex-row-center-center mt-30">
              <tm-icon :font-size="24" color="orange" name="tmicon-exclamation-circle"></tm-icon>
              <tm-text _class="ml-10" :font-size="24" color="orange" label="充值说明"></tm-text>
            </view>
          </view>
        </view>
      </template>

      <tm-sheet :margin="[24, 24]" :transprent="true" :padding="[0]" :round="3" class="mt-20">
        <tm-row align="start" justify="end" :height="0" :column="2">
          <tm-col
            v-for="(item, index) in 10"
            :key="index"
            :height="0"
            :margin="[15, 0, 15, 20]"
            color="white"
            :round="3"
            :shadow="3"
          >
            <view class="flex flex-col flex-start fulled">
              <view class="flex flex-row-bottom-start fulled">
                <view style="background-color: #276cf5; padding: 6rpx" class="round-10 ml-20 mt-20">
                  <tm-icon :font-size="26" color="white" name="tmicon-quan"></tm-icon
                ></view>
                <tm-text
                  _class="ml-20 text-weight-b"
                  :font-size="40"
                  color="grey-darken-3"
                  label="1"
                ></tm-text>
                <tm-text _class="ml-5" :font-size="28" color="grey-darken-2" label="券"></tm-text>
              </view>
              <view
                class="flex flex-row-bottom-center fulled py-15 relative"
                style="border-bottom: dashed 2px rgb(245, 245, 245)"
              >
                <tm-text _class="text-weight-b" :font-size="36" color="red" label="0.98"></tm-text>
                <tm-text _class="ml-2" :font-size="24" color="red" label="元"></tm-text>
                <tm-text
                  _class="ml-13 text-delete"
                  :font-size="24"
                  color="grey"
                  label="1元"
                ></tm-text>
                <view
                  class="absolute b--13 l--13"
                  style="
                    width: 26rpx;
                    height: 26rpx;
                    border-radius: 13rpx;
                    background-color: rgb(245, 245, 245);
                  "
                ></view>
                <view
                  class="absolute b--13 r--13"
                  style="
                    width: 26rpx;
                    height: 26rpx;
                    border-radius: 13rpx;
                    background-color: rgb(245, 245, 245);
                  "
                ></view>
              </view>
              <view class="flex flex-row-center-center mt-11 mb-15">
                <tm-text
                  _class="mr-5 text-weight-b"
                  :font-size="24"
                  color="primary"
                  label="立即购买"
                  @click="goToOrderConfirmPage(item)"
                ></tm-text>
                <tm-icon :font-size="24" color="primary" name="tmicon-caret-right"></tm-icon>
              </view>
            </view>
          </tm-col>
        </tm-row>
      </tm-sheet>
    </tm-sticky>
  </tm-app>
</template>

<script setup lang="ts">
import { navigateTo } from '@/common/utils/base'

const goToOrderConfirmPage = (item: any) => {
  navigateTo({ url: '/pages/payTicket/orderConfirm/index' })
}
</script>
