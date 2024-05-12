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
      <tm-form
        ref="form"
        :margin="[20, 0]"
        :padding="[10, 0]"
        v-model="carpoolInfo"
        :label-width="90"
      >
        <tm-form-item
          :margin="[0, 10, 0, 0]"
          :padding="[0]"
          required
          label="起点"
          field="startAddress"
          :rules="[{ required: true, message: '请输入起点', trigger: 'blur' }]"
          :showError="false"
        >
          <tm-input
            :inputPadding="[10, 0, 0, 0]"
            v-model.lazy="carpoolInfo.startAddress"
            :transprent="true"
            placeholder="从哪儿出发"
            :showBottomBotder="false"
            suffix="tmicon-map"
            suffixColor="primary"
          >
          </tm-input>
        </tm-form-item>
        <tm-form-item
          :margin="[0, 20, 0, 0]"
          :padding="[0]"
          label="途径"
          field="channelAddress"
          :showError="false"
        >
          <tm-input
            :inputPadding="[10, 0, 0, 0]"
            v-model.lazy="carpoolInfo.channelAddress"
            :transprent="true"
            :showBottomBotder="false"
            placeholder="经过哪儿"
          >
          </tm-input>
        </tm-form-item>
        <tm-form-item
          :margin="[0, 20, 0, 0]"
          :padding="[0]"
          label="终点"
          field="endAddress"
          required
          :rules="[{ required: true, message: '请输入终点', trigger: 'blur' }]"
          :showError="false"
        >
          <tm-input
            :inputPadding="[10, 0, 0, 0]"
            placeholder="要到哪儿去"
            v-model.lazy="carpoolInfo.endAddress"
            :transprent="true"
            :showBottomBotder="false"
            suffix="tmicon-map"
            suffixColor="primary"
          >
          </tm-input>
        </tm-form-item>
        <tm-form-item
          :margin="[0, 20, 0, 0]"
          :padding="[0]"
          label="时间"
          field="endAddress"
          required
          :rules="[{ required: true, message: '请输入终点', trigger: 'blur' }]"
          :showError="false"
        >
          <view
            @click="startDateFlag = !startDateFlag"
            class="flex flex-row flex-row-center-between pl-10 py-15"
          >
            <tm-text
              color="grey-darken-1"
              :userInteractionEnabled="false"
              :label="startDate || '请选择出发日期'"
            ></tm-text>
            <tm-icon
              :userInteractionEnabled="false"
              :font-size="24"
              color="grey-darken-1"
              name="tmicon-angle-right"
            ></tm-icon>
          </view>
        </tm-form-item>
        <tm-form-item
          :margin="[0, 20, 0, 0]"
          :padding="[0]"
          label="空位"
          field="seats"
          required
          :rules="[{ required: true, message: '请输入终点', trigger: 'change' }]"
          :showError="false"
        >
          <view class="flex flex-row-center-between">
            <tm-tag
              :margin="[5, 10]"
              checkable
              @click="carpoolInfo.seats = 1"
              :checked="carpoolInfo.seats === 1"
              color="primary"
              size="m"
              label="1"
            ></tm-tag>
            <tm-tag
              :margin="[5, 10]"
              checkable
              @click="carpoolInfo.seats = 2"
              :checked="carpoolInfo.seats === 2"
              color="primary"
              size="m"
              label="2"
            ></tm-tag>
            <tm-tag
              :margin="[5, 10]"
              checkable
              @click="carpoolInfo.seats = 3"
              :checked="carpoolInfo.seats === 3"
              color="primary"
              size="m"
              label="3"
            ></tm-tag>
            <tm-tag
              :margin="[5, 10]"
              checkable
              @click="carpoolInfo.seats = 4"
              :checked="carpoolInfo.seats === 4"
              color="primary"
              size="m"
              label="4"
            ></tm-tag>
            <tm-tag
              :margin="[5, 10]"
              checkable
              @click="carpoolInfo.seats = 5"
              :checked="carpoolInfo.seats === 5"
              color="primary"
              size="m"
              label="5"
            ></tm-tag>
            <tm-tag
              :margin="[5, 10]"
              checkable
              @click="carpoolInfo.seats = 6"
              :checked="carpoolInfo.seats === 6"
              color="primary"
              size="m"
              label="6"
            ></tm-tag>
          </view>
        </tm-form-item>
      </tm-form>
    </tm-sheet>
    <tm-sheet :margin="[24, 12]" :round="3">
      <view class="flex flex-start">
        <tm-text _class="mr-5" :font-size="30" color="red" label="*"></tm-text>
        <tm-text
          :font-size="30"
          color="grey-darken-1"
          _class="text-weight-b"
          label="备注"
        ></tm-text>
      </view>
      <tm-divider></tm-divider>
      <view class="mx-20">
        <textarea
          class="fulled overflow-x"
          v-model="carpoolInfo.notes"
          placeholder="请在此处填写，或点击下方预设内容"
          :maxlength="-1"
          style="height: 200rpx"
        />
      </view>
      <tm-divider></tm-divider>
      <view class="flex flex-row-start flex-wrap">
        <tm-tag
          v-for="(item, index) in notesOptions"
          :key="index"
          :margin="[0, 0, 10, 15]"
          checkable
          :checked="item.checked"
          @click="notesSelectedAction(index)"
          color="primary"
          size="m"
          :label="item.value"
        ></tm-tag>
      </view>
    </tm-sheet>
    <tm-picker
      v-model:show="startDateFlag"
      :columns="citydate3"
      v-model="carpoolInfo.startDate"
      v-model:model-str="startDate"
    >
    </tm-picker>
  </tm-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const carpoolInfo = ref<{
  startAddress: string
  channelAddress: string
  endAddress: string
  startDate: Array<number>
  seats: number
  notes: string
}>({
  startAddress: '',
  channelAddress: '',
  endAddress: '',
  startDate: [],
  seats: 0,
  notes: '',
})
const chooseAddress = (type: number) => {
  console.log(type)
  uni.chooseLocation({
    success: function (res) {
      if (type === 1) {
        carpoolInfo.value.startAddress = res.name
      } else {
        carpoolInfo.value.endAddress = res.name
      }
    },
  })
}
const startDate = ref(<string>'')
const startDateFlag = ref(<boolean>false)
const citydate3 = ref([
  {
    text: '苹果',
    id: 0,
    children: [
      { text: '香蕉', id: 10 },
      { text: '香蕉2', id: 122 },
    ],
  },
  {
    text: '苹果',
    id: 1,
    children: [
      { text: '香蕉', id: 10 },
      { text: '香蕉2', id: 122 },
    ],
  },
  {
    text: '越南水果',
    id: 3,
    children: [
      { text: '苹果2222', id: 10 },
      { text: '香蕉', id: 12 },
    ],
  },
])
const notesOptions = ref<Array<{ value: string; checked: boolean }>>([
  {
    value: '准时准点',
    checked: false,
  },
  {
    value: '私家小车',
    checked: false,
  },
  {
    value: '拒载醉酒乘客',
    checked: false,
  },
  {
    value: '顺路同行',
    checked: false,
  },
  {
    value: '放假回家',
    checked: false,
  },
  {
    value: '有大件行李的提前说',
    checked: false,
  },
  {
    value: '可以带货',
    checked: false,
  },
])
const notesSelectedAction = (index: number) => {
  let item = notesOptions.value[index]
  if (!item.checked) {
    carpoolInfo.value.notes += item.value + '、'
  } else {
    const reg = new RegExp(item.value + '、')
    carpoolInfo.value.notes = carpoolInfo.value.notes.replace(reg, '')
  }
  item.checked = !item.checked
}
</script>

<style lang="scss" scoped></style>
