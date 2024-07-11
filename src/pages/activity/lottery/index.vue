<template>
    <tm-app ref="app" color="#DB4E4E">
        <tm-sheet :margin="[36]" transprent>
            <view class="flex flex-row flex-row-center-center mb-20">
                <tm-text label="庆祝觅行出行顺风车小程序正式上线" :fontSize="38" color="white"></tm-text>
            </view>
            <view class="flex flex-row-center-between">
                <tm-text label="幸运" color="white" style="writing-mode: tb" :fontSize="70"
                    _class="text-weight-b"></tm-text>
                <tm-text label="抽奖" color="white" :fontSize="140" _class="text-weight-b"></tm-text>
                <view class="flex flex-col flex-col-center-center">
                    <tm-text color="white" :fontSize="42" label="每天都"></tm-text>
                    <tm-text color="white" :fontSize="60" label="可以"></tm-text>
                </view>
                <view class="pa-5 flex flex-col flex-col-center-center" style="background-color: #fff;">
                    <tm-text color="#DB4E4E" _class="text-weight-b" :fontSize="48" label="100%"></tm-text>
                    <tm-text color="#DB4E4E" _class="text-weight-b" :fontSize="48" label="中奖"></tm-text>
                </view>
            </view>
            <view class="flex flex-row-center mt-10">
                <tm-text color="white" :fontSize="45" label="每日登录、邀请好友、发布行程"></tm-text>
            </view>
            <view class="flex flex-row-center mt-10">
                <tm-text color="white" :fontSize="58" _class="text-weight-b" label="花样玩法惊喜好礼等你拿"></tm-text>
            </view>
            <view class="flex flex-row-center-center pa-5 mt-10" style="background-color: #fff;">
                <tm-text color="#DB4E4E" :fontSize="120" _class="text-weight-b" label="幸运大转盘"></tm-text>
            </view>
            <view class="mt-n10">
                <view class="f-c">
                   
                    <luckyTurn ref="luckyTurntable" :prizesList="prizesList" :prizesIndex="prizesIndex"
                                        @end="end" @start="start"></luckyTurn>
                </view>
                <view class="f-c pt-60" style="">
                    <view @click="luckyTurntableAction" class="btn br-full fw-b">2次抽奖机会</view>
                </view>
            </view>
        </tm-sheet>

    </tm-app>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { onShow, onLoad } from '@dcloudio/uni-app'
import luckyTurn from './luckyTurn.vue'

const prizesIndex = ref(1)
const prizesList = ref([
    {
        image: 'https://gd-hbimg.huaban.com/32d95e566bbbf22e0bbdfd32f363e011bcd1cca012ffc-WD4ZDs_fw658webp',
        name: '0个金币'
    },
    {
        image: 'https://gd-hbimg.huaban.com/32d95e566bbbf22e0bbdfd32f363e011bcd1cca012ffc-WD4ZDs_fw658webp',
        name: '1个金币'
    },
    {
        image: 'https://gd-hbimg.huaban.com/32d95e566bbbf22e0bbdfd32f363e011bcd1cca012ffc-WD4ZDs_fw658webp',
        name: '2个金币'
    },
    {
        image: 'https://gd-hbimg.huaban.com/32d95e566bbbf22e0bbdfd32f363e011bcd1cca012ffc-WD4ZDs_fw658webp',
        name: '3个金币'
    },
    {
        // 存在图片就会展示  支持：仅图片 仅文字 图片和文字
        image: 'https://gd-hbimg.huaban.com/32d95e566bbbf22e0bbdfd32f363e011bcd1cca012ffc-WD4ZDs_fw658webp',
        name: '抽奖'
    },
    {
        image: 'https://gd-hbimg.huaban.com/32d95e566bbbf22e0bbdfd32f363e011bcd1cca012ffc-WD4ZDs_fw658webp',
        name: '5个金币'
    },
    {
        image: 'https://gd-hbimg.huaban.com/32d95e566bbbf22e0bbdfd32f363e011bcd1cca012ffc-WD4ZDs_fw658webp',
        name: '6个金币'
    },
    {
        image: 'https://gd-hbimg.huaban.com/32d95e566bbbf22e0bbdfd32f363e011bcd1cca012ffc-WD4ZDs_fw658webp',
        name: '7个金币'
    },
    {
        image: 'https://gd-hbimg.huaban.com/32d95e566bbbf22e0bbdfd32f363e011bcd1cca012ffc-WD4ZDs_fw658webp',
        name: '8个金币'
    }
])

const luckyTurntable = ref(null)
const end = (index: number) => {
    uni.showToast({
        title: '恭喜获得：' + prizesList.value[index].name,
        icon: 'none'
    });
}
const start=()=>{
    prizesIndex.value = 5;
    // 奖品详情
    luckyTurntable.value.begin();
}

const luckyTurntableAction = () => {
    prizesIndex.value = 2;
    // 奖品详情
    luckyTurntable.value.begin();
}
onLoad(() => {

})
</script>

<style>
.min-h-100vh {
    min-height: 100vh;
}

.f-c {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.lg-t-b-_ffa15e-_ff7838 {
    background-image: linear-gradient(to bottom, #ffa15e, #ff7838);
}

.br-52 {
    border-radius: 52rpx;
}

.br-60 {
    border-radius: 60rpx;
}

.br-70 {
    border-radius: 70rpx;
}

.br-full {
    border-radius: 9999rpx;
}

.c-white {
    color: white;
}

.bg-white {
    background-color: white;
}

.bg-_fdf5ec {
    background-color: #fdf5ec;
}

.wh-540 {
    width: 564rpx;
    height: 564rpx;
}

.wh-560 {
    width: 560rpx;
    height: 560rpx;
}

.wh-590 {
    width: 590rpx;
    height: 590rpx;
}

.wh-660 {
    width: 660rpx;
    height: 660rpx;
}

.ta-c {
    text-align: center;
}

.ls-20 {
    letter-spacing: 20rpx;
}

.fs-86 {
    font-size: 86rpx;
}

.p-60 {
    padding: 60rpx;
}

.pt-60 {
    padding-top: 60rpx;
}

.fw-b {
    font-weight: 700;
}

.lg-1 {
    background-image: linear-gradient(to bottom, #ff2300, #ffaf69, #fff6d5);
}

.shadow1 {
    box-shadow: rgb(203 48 17 / 70%) 0px 0px 4px 3px inset, rgb(255 99 67) 0px 1px 0px 1px inset;
}

.shadow2 {
    box-shadow: inset 0px 0px 5rpx 5rpx #ffbd7c;
}

.shadow3 {
    box-shadow: inset 0px 0px 4rpx 4rpx #ffe8cb;
}

.btn {
    font-size: 46rpx;
    box-shadow: rgb(253 109 41 / 77%) 0px 12px 20px -5px;
    border: #fff9be solid 2px;
    background-image: linear-gradient(to right, #ffcd4e, #ffcc5c);
    padding: 30rpx 100rpx;
    color: #cb3011;
}
</style>