<template>
  <tm-app ref="app" class="pb-30">
    <tm-sheet :margin="[24, 12]" :padding="[20, 0]" :round="3">
      <view class="flex flex-row-center-between pa-10">
        <view>
          <view class="flex mb-10">
            <tm-text color="orange" label="每条消息"></tm-text>
            <tm-text color="orange" :label="strokePrice"></tm-text>
            <tm-text color="orange" label="券"></tm-text>
            <tm-text color="orange" label="（您的券："></tm-text>
            <tm-text color="orange" :label="userInfo?.couponCount"></tm-text>
            <tm-text color="orange" label="）"></tm-text>
          </view>
          <view class="flex">
            <tm-text color="green" :label="userInfo?.cardCount > 0 ? '已' : '未'"></tm-text>
            <tm-text color="green" label="拥有月卡"></tm-text>
            <tm-text color="green" label="（今日剩余使用次数："></tm-text>
            <tm-text color="green" :label="userInfo?.residueCount"></tm-text>
            <tm-text color="green" label="）"></tm-text>
          </view>
        </view>
        <view>
          <tm-button @click="goToPayPage" size="small" label="点击充值"></tm-button>
        </view>
      </view>
    </tm-sheet>
    <tm-sheet :margin="[24, 12]" :round="3">
      <view class="flex">
        <tm-text label="发布类型:"></tm-text>
        <tm-text _class="ml-10" color="orange" :label="navigateTypeTitle"></tm-text>
      </view>
    </tm-sheet>
    <tm-sheet :margin="[24, 12]" :round="3">
      <tm-text :font-size="30" color="grey-darken-1" _class="text-weight-b" label="拼车信息"></tm-text>
      <tm-divider></tm-divider>
      <tm-form ref="form" :margin="[20, 0]" :padding="[10, 0]" v-model="carpoolInfo" :label-width="90">
        <tm-form-item :margin="[0, 10, 0, 0]" :padding="[0]" required label="起点" field="startAddress"
          :showError="false">
          <tm-input :inputPadding="[10, 0, 0, 0]" v-model.lazy="carpoolInfo.startAddress" :transprent="true"
            placeholder="从哪儿出发" :showBottomBotder="false">
            <template v-slot:right>
              <tm-icon @click="chooseAddress(1)" :fontSize="30" color="primary" name="tmicon-map"></tm-icon>
            </template>
          </tm-input>
        </tm-form-item>
        <tm-form-item :margin="[0, 20, 0, 0]" :padding="[0]" label="途径" field="channelAddress" :showError="false"
          v-if="carpoolInfo.type === 1">
          <tm-input :inputPadding="[10, 0, 0, 0]" v-model.lazy="carpoolInfo.channelAddress" :transprent="true"
            :showBottomBotder="false" placeholder="经过哪儿">
          </tm-input>
        </tm-form-item>
        <tm-form-item :margin="[0, 20, 0, 0]" :padding="[0]" label="终点" field="endAddress" required :showError="false">
          <tm-input :inputPadding="[10, 0, 0, 0]" placeholder="要到哪儿去" v-model.lazy="carpoolInfo.endAddress"
            :transprent="true" :showBottomBotder="false">
            <template v-slot:right>
              <tm-icon @click="chooseAddress(2)" :fontSize="30" color="primary" name="tmicon-map"></tm-icon>
            </template>
          </tm-input>
        </tm-form-item>
        <tm-form-item :margin="[0, 20, 0, 0]" :padding="[0]" label="时间" field="endAddress" required :showError="false">
          <view @click="startDateFlag = !startDateFlag" class="flex flex-row flex-row-center-between pl-10 py-15">
            <tm-text color="grey-darken-1" :userInteractionEnabled="false" :label="startDate || '请选择出发日期'"></tm-text>
            <tm-icon :userInteractionEnabled="false" :font-size="24" color="grey-darken-1"
              name="tmicon-angle-right"></tm-icon>
          </view>
        </tm-form-item>
        <tm-form-item :margin="[0, 20, 0, 0]" :padding="[0]" :label="carpoolInfo.type === 1 ? '空位' : '同行'" field="seats"
          required :showError="false">
          <view class="flex flex-row-center-between">
            <tm-tag v-for="(item, index) in seatsTotal" :key="index" :margin="[5, 10]" checkable
              @click="carpoolInfo.seats = item" :checked="carpoolInfo.seats === item" color="primary" size="m"
              :label="item"></tm-tag>
          </view>
        </tm-form-item>
      </tm-form>
    </tm-sheet>
    <tm-sheet :margin="[24, 12]" :round="3">
      <view class="flex flex-start">
        <tm-text _class="mr-5" :font-size="30" color="red" label="*"></tm-text>
        <tm-text :font-size="30" color="grey-darken-1" _class="text-weight-b" label="备注"></tm-text>
      </view>
      <tm-divider></tm-divider>
      <view class="mx-20">
        <textarea class="fulled overflow-x" v-model="carpoolInfo.notes" placeholder="请在此处填写，或点击下方预设内容" :maxlength="-1"
          style="height: 200rpx" />
      </view>
      <tm-divider></tm-divider>
      <view class="flex flex-row-start flex-wrap">
        <tm-tag v-for="(item, index) in notesOptions" :key="index" :margin="[0, 0, 10, 15]" checkable
          :checked="item.checked" @click="notesSelectedAction(index)" color="primary" size="m"
          :label="item.value"></tm-tag>
      </view>
    </tm-sheet>
    <tm-sheet :margin="[24, 12]" :round="3">
      <tm-text :font-size="30" color="grey-darken-1" _class="text-weight-b" label="联系人"></tm-text>
      <tm-divider></tm-divider>
      <tm-form ref="form" :margin="[20, 0]" :padding="[10, 0]" v-model="carpoolInfo" :label-width="90">
        <tm-form-item :margin="[0, 20, 0, 0]" :padding="[0]" label="昵称" field="username" required :showError="false">
          <tm-input :inputPadding="[10, 0, 0, 0]" v-model.lazy="carpoolInfo.username" :transprent="true"
            :showBottomBotder="false" placeholder="请输入姓名">
          </tm-input>
        </tm-form-item>
        <tm-form-item :margin="[0, 20, 0, 0]" :padding="[0]" label="性别" field="sex" required :showError="false">
          <tm-radio-group v-model="carpoolInfo.sex" :defaultValue="1">
            <tm-radio :value="1" label="男"></tm-radio>
            <tm-radio :value="2" label="女"></tm-radio>
          </tm-radio-group>
        </tm-form-item>
        <tm-form-item :margin="[0, 20, 0, 0]" :padding="[0]" label="电话" field="mobile" required :showError="false">
          <tm-input :inputPadding="[10, 0, 0, 0]" v-model.lazy="carpoolInfo.mobile" :transprent="true"
            :showBottomBotder="false" placeholder="请输入电话" type="number">
          </tm-input>
        </tm-form-item>
        <tm-form-item :margin="[0, 20, 0, 0]" :padding="[0]" label="微信" field="chatInfo" :showError="false">
          <tm-input :inputPadding="[10, 0, 0, 0]" v-model.lazy="carpoolInfo.chatInfo" :transprent="true"
            :showBottomBotder="false" placeholder="请输入微信号">
          </tm-input>
        </tm-form-item>
      </tm-form>
    </tm-sheet>
    <tm-sheet :margin="[24, 12]" :round="3">
      <view class="flex flex-row-center-between">
        <tm-text :font-size="30" color="grey-darken-1" _class="text-weight-b" label="我要置顶"></tm-text>
        <tm-switch @change="isTopAction" unCheckedColor="primary" color="primary" text :label="['是', '否']"></tm-switch>
      </view>
      <view class="mx-20" v-if="isTop">
        <view class="flex flex-row-center-between mt-20">
          <tm-text :font-size="30" color="grey" label="置顶时长:"></tm-text>
          <view class="flex flex-row-center-end">
            <tm-stepper :width="160" :max="topCountMax" :min="1" @change="topCountTotal" :defaultValue="0"></tm-stepper>
            <tm-text _class="ml-30" :font-size="30" color="grey" label="小时"></tm-text>
          </view>
        </view>
        <view class="mt-20 flex flex-row-bottom-start">
          <tm-text :font-size="30" color="grey" label="本次置顶话花费:"></tm-text>
          <tm-text _class="ml-20 text-weight-b mr-10" color="orange" :font-size="30"
            :label="carpoolInfo.topCount"></tm-text>
          <tm-text color="orange" :font-size="24" label="券"></tm-text>
        </view>
      </view>
    </tm-sheet>
    <tm-checkbox @change="isAgreeProtocol" :defaultChecked="true" :size="32" class="ml-20 mt-10 mb-20">
      <template v-slot:default="{ checked }">
        <view class="flex flex-row">
          <tm-text label="我已经阅读并同意"></tm-text>
          <view>
            <tm-text @click="gotoAgreementPage" color="primary" label="《拼车协议》"></tm-text>
          </view>
        </view>
      </template>
    </tm-checkbox>
    <tm-button @click="publishTripsAction" :loading="publishLoading" :margin="[24, 16]" block
      :label="`立即发布（${navigateTypeTitle}）`"></tm-button>
    <tm-picker v-model:show="startDateFlag" :columns="district" v-model="carpoolInfo.startDateDesc"
      v-model:model-str="startDate" :defaultValue="[0, 0]">
    </tm-picker>

    <tm-modal color="white" okColor="primary" cancelColor="primary" okLinear="left" :height="350" splitBtn title="提醒"
      okText="确定" content="您今日月卡发布行程已达上限，确认发布将消耗消费券，是否继续？" v-model:show="publishNoHaveFlag"
      @ok="publishTrips"></tm-modal>
    <canvas style="width: 480px; height: 384px;position:fixed;left:100%;" canvas-id="shareCanvas"
      id="shareCanvas"></canvas>
  </tm-app>
</template>

<script lang="ts" setup>
import { navigateTo, setNavigationBarTitle, switchTab } from '@/common/utils/base'
import { IDateOptions, IDateOptionsAll, INotesItem } from '@/interfaces/publish'
import { getDictData, uploadFileForShareAction } from '@/service/common'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import pinia from '@/store/store'
import { useUser } from '@/store/user'
import { IUserInfo } from '@/interfaces/common'
import { toast } from '@/common/utils'
import { publish } from '@/service/rideTrips'
import { share } from '@/tmui/tool/lib/share'
import * as dayjs from '@/tmui/tool/dayjs/esm/index'
const DayJs = dayjs.default
const { onShareAppMessage, onShareTimeline } = share({
  title: '觅行出行，顺路同行。',
  desc: '觅行出行，顺路同行。',
  path: `/pages/index/index`,
  imageUrl: 'https://healthy.wuliang.plus/shareBanner/fc689b34e3cd5c7216908630dc0c5b3.png',
})
onShareAppMessage()
onShareTimeline()

const userStore = useUser(pinia)
//置顶单价
const topPrice = ref<number>(0.5)
//发布单价
const strokePrice = ref<number>(0.5)
let timeFrame: number = 3
const topCountMax = ref<number>(7)
const getIntegralPriceAndDateDeadline = async () => {
  timeFrame = 3
  const res = await getDictData('wechat_publish')
  const data = res.data
  data.forEach((element: any) => {
    if (element.label === 'unitPrice') {
      strokePrice.value = element.value as any as number
    } else if (element.label === 'topHourPrice') {
      topPrice.value = element.value as any as number
    } else if (element.label === 'timeFrame') {
      timeFrame = element.value as any as number
      generateStartDate()
    } else if (element.label === 'topCountMax') {
      topCountMax.value = element.value as any as number
    }
  })
}
const carpoolInfo = ref<{
  startAddress: string
  channelAddress: string
  endAddress: string
  startDate: string
  seats: string
  notes: string
  sex: number
  mobile: string
  chatInfo: string
  username: string
  topCount: number
  type: number
  startDateDesc: Array<number>
  shareImageUrl: string
}>({
  startAddress: '',
  channelAddress: '',
  endAddress: '',
  startDate: '',
  seats: '5',
  notes: '',
  sex: 1,
  mobile: '',
  chatInfo: '',
  username: '',
  topCount: 0,
  type: 1,
  startDateDesc: [0, 0],
  shareImageUrl: ''
})

// 生成开始日期选择集合
const district = ref<Array<IDateOptionsAll>>([])
const generateStartDate = () => {
  function formatDate(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  const dateArray: { text: string; id: string }[] = []

  const currentDate = new Date()
  const days: Array<string> = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  for (let i = 0; i < timeFrame; i++) {
    const currentDateCopy = new Date(currentDate)
    currentDateCopy.setDate(currentDate.getDate() + i)

    let description: string
    switch (i) {
      case 0:
        description = '今天'
        break
      case 1:
        description = '明天'
        break
      case 2:
        description = '后天'
        break
      default:
        description = days[currentDateCopy.getDay()]
        break
    }

    dateArray.push({
      text: `${formatDate(currentDateCopy)}(${description})`,
      id: formatDate(currentDateCopy),
    })
  }

  function formatTime(hour: number, minute: number): string {
    const hourStr = String(hour).padStart(2, '0')
    const minuteStr = String(minute).padStart(2, '0')
    return `${hourStr}:${minuteStr}`
  }

  function generateTimeSlots(): { text: string; id: string }[] {
    const timeSlots: { text: string; id: string }[] = []
    let hour = 5 // 早晨 05:00 开始
    const minute = 30 // 早晨 05:30 开始

    // 从早晨 05:30 开始，每隔一个小时生成一个时间段字符串
    while (!(hour === 23)) {
      const startTime = formatTime(hour, minute)
      const endTime = formatTime(hour + 1, minute)
      timeSlots.push({ text: `${startTime}-${endTime}`, id: `${startTime}-${endTime}` })
      hour += 1
    }

    // 添加 23:00-23:59 时间段
    timeSlots.push({ text: '23:00-23:59', id: '23:00-23:59' })

    return timeSlots
  }

  function filterUpcomingTimeSlots(
    timeSlots: { text: string; id: string }[]
  ): { text: string; id: string }[] {
    const currentTime = new Date()
    const currentHour = currentTime.getHours()
    const currentMinute = currentTime.getMinutes()
    const currentSlot = formatTime(currentHour, currentMinute)

    // 查找当前时间所在的时间段
    let currentIndex = -1
    for (let i = 0; i < timeSlots.length; i++) {
      const [startTime] = timeSlots[i].id.split('-')
      if (currentSlot < startTime) {
        currentIndex = i
        break
      }
    }

    if (currentIndex === -1) {
      return [{ id: '23:00-23:59', text: '23:00-23:59' }]
    } else {
      return timeSlots.slice(currentIndex)
    }
  }

  // 生成第一个数组
  const timeSlots = generateTimeSlots()

  // 生成第二个数组
  const upcomingTimeSlots = filterUpcomingTimeSlots(timeSlots)
  for (let index = 0; index < dateArray.length; index++) {
    const element = dateArray[index]
    if (index === 0) {
      district.value.push({
        id: element.id,
        text: element.text,
        children: upcomingTimeSlots,
      })
    } else {
      district.value.push({
        id: element.id,
        text: element.text,
        children: timeSlots,
      })
    }
  }
}

const seatsTotal = ref<Array<string>>(['1', '2', '3', '4', '5', '6'])
const chooseAddress = (type: number) => {
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

// 出发时间
const startDate = ref(<string>'')
const startDateFlag = ref(<boolean>false)

// 备注选择
const notesOptions = ref<Array<INotesItem>>([])
const getNotesItem = async () => {
  const res = await getDictData('wechat_publish_notes')
  let data: Array<INotesItem> = []
  res.data.forEach((element: any) => {
    let item: INotesItem = {
      value: element.label,
      checked: false,
    }
    data.push(item)
  })
  notesOptions.value = data
}
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

// 置顶操作
const isTop = ref(false)
const isTopAction = (isTopIndex: boolean) => {
  isTop.value = isTopIndex
  carpoolInfo.value.topCount = 0
}
const topCountTotal = (count: number) => {
  carpoolInfo.value.topCount = count * topPrice.value
}

// 是否同意协议
const isAgree = ref(true)
const isAgreeProtocol = (e: boolean) => {
  isAgree.value = e
}

// 跳转到券充值页
const goToPayPage = () => {
  navigateTo({ url: '/pages/payTicket/index' })
}

const publishNoHaveFlag = ref(false)
const publishTripsAction = () => {
  if (userInfo.value?.residueCount === 0) {
    publishNoHaveFlag.value = true
    return
  }
  publishTrips()
}

//生成分享的图片
const genShareImage = async (startDate: string, startTime: string,
  startAddress: string, endAddress: string, type: string) => {
  return new Promise<void>((resolve) => {
    let ctx = uni.createCanvasContext('shareCanvas')
    ctx.font = "PingFang SC"

    function calculateMinFontSize(ctx: UniApp.CanvasContext, text1: string, text2: string, areaWidth: number, minFontSize: number = 10, maxFontSize: number = 24): number {
      function calculateFontSizeForText(text: string): number {
        let fontSize = maxFontSize;
        ctx.setFontSize(fontSize);
        ctx.font = `${fontSize}px 'PingFang SC'`;
        let textWidth = ctx.measureText(text).width;

        while (textWidth > areaWidth && fontSize > minFontSize) {
          fontSize--;
          ctx.setFontSize(fontSize);
          ctx.font = `${fontSize}px 'PingFang SC'`;
          textWidth = ctx.measureText(text).width;
        }
        return fontSize;
      }

      const fontSize1 = calculateFontSizeForText(text1);
      const fontSize2 = calculateFontSizeForText(text2);

      return Math.min(fontSize1, fontSize2);
    }


    uni.getImageInfo({
      src: "https://healthy.wuliang.plus/share/share.png",
      success: function (res) {
        if (res.errMsg === 'getImageInfo:ok') {
          ctx.drawImage(res.path, 0, 0, res.width, res.height)
          ctx.setFontSize(24)
          ctx.setFillStyle('#000000')
          ctx.fillText(type, 50, 325)
          ctx.fillText(startDate, 50, 150)
          ctx.setFontSize(34)
          ctx.fillText(startTime, 170, 150)
          ctx.setFontSize(calculateMinFontSize(ctx, startAddress, endAddress, 320))
          ctx.fillText(startAddress, 70, 210)
          ctx.fillText(endAddress, 70, 250)

          ctx.draw(true, (ret) => {
            uni.canvasToTempFilePath({
              canvasId: 'shareCanvas',
              fileType: 'png',
              quality: 1,
              success(result) {
                uploadFileForShareAction(result.tempFilePath).then(res => {
                  carpoolInfo.value.shareImageUrl = res as string
                  resolve()
                })
              }
            })
          })
        }
      },
    });
  });
}

//发布行程
const publishLoading = ref(false)
const publishTrips = async () => {
  publishLoading.value = true
  if (!isAgree.value) {
    toast('请先阅读并同意拼车协议！')
    publishLoading.value = false
    return
  }

  //出发时间
  const startDateIndexArray: Array<number> = carpoolInfo.value.startDateDesc
  const needAllData: IDateOptionsAll = district.value[startDateIndexArray[0]]
  const date = needAllData.id
  const needTimesData: IDateOptions = needAllData.children[startDateIndexArray[1]]
  const times = needTimesData.id
  carpoolInfo.value.startDate = date + ',' + times
  const formattedDate = DayJs(date).format('MM月DD日');
  await genShareImage(formattedDate, times, carpoolInfo.value.startAddress, carpoolInfo.value.endAddress, carpoolInfo.value.type === 1 ? "车找人" : "人找车")
  const res = await publish(carpoolInfo.value)
  if (res) {
    switchTab({
      url: '/pages/index/index',
    })
  }
  publishLoading.value = false
}

const gotoAgreementPage = () => {
  navigateTo({ url: `/pages/common/agreement/index?type=3` })
}

const userInfo = ref<IUserInfo>()
const navigateTypeTitle = ref<string>('')
onLoad((option: any) => {
  carpoolInfo.value.type = Number(option.type)
  carpoolInfo.value.seats = carpoolInfo.value.type === 1 ? '5' : '1'
  navigateTypeTitle.value = carpoolInfo.value.type === 1 ? '车找人' : '人找车'
  setNavigationBarTitle({ title: ` ${navigateTypeTitle.value}，发布消息` })
  getIntegralPriceAndDateDeadline()

  getNotesItem()

  userInfo.value = userStore.userInfo
})
</script>

<style lang="scss" scoped></style>
