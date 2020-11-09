<template>
  <view class="error-wrapper">
        <view class="flex flex-vertical flex-align-center flex-justify-center" v-if="state">
            <image class="pic" src="../../static/network_error.png"></image>
            <text class="title">网络请求失败</text>
            <text class="msg">请检查您的网络<br>重新加载吧</text>
            <view>
                <u-button type="primary" class="btn-item" size="mini" @click="reFresh">重新加载</u-button>
            </view>
        </view>
        <view v-else>
           <u-no-network></u-no-network>
        </view>
  </view>
</template>

<script lang="ts">
import { $navigateBack } from '@/utils/util';
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class error extends Vue {
    state = '';
    reFresh () {
        $navigateBack();
    }

    onLoad (option: any) {
        if(option.state) {
            this.state = option.state;
        }
    }
}

</script>

<style lang="scss" scoped>
    .error-wrapper {
        height: 100vh;
    }
    .pic {
        width: 177rpx;
        height: 177rpx;
    }
    .title {
        font-size: $uni-font-size-lg;
        line-height: 42rpx;
        color: #333333;
        margin-top: 60rpx;
    }
    .msg {
        font-size: $uni-font-size-base;
        line-height: 38rpx;
        color: #999999;
        opacity: 1;
        margin-top: 20rpx;
        margin-bottom: 44rpx;
        text-align: center;
    }
    .btn-item {
        margin: 0 20rpx;
    }
    
</style>
