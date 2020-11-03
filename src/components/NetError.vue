<template>
    <view class="box" v-if="!networkType" :style="styles">
        <view v-if="!refreshing" class="main_box">
            <view class="tip"></view>
            <text class="title">网络请求失败</text>
            <text class="msg">请检查您的网络
            重新加载吧</text>
            <button class="btn" @click="reFresh">重新加载</button>
        </view>
        <uLoading class="main_box" mode="flower" size="50" :show="refreshing"></uLoading>
    </view>
</template>

<script lang="ts">
import { Component, Vue, Watch,Prop } from "vue-property-decorator";
import { SystemModule } from "@/store/modules/system";

export default class NetError extends Vue {
    @Prop({default: ''}) url!: ''; // 图片地址
    @Prop({default: null}) styles!: object; // 错误的高度
    refreshing = false;

    get networkType(){
        return SystemModule.networkType;
    }

    @Watch('networkType') getNetworkType(val,old){
        if(val){
            if(this.url){
                uni.redirectTo({
                    url:(this as any).url
                })
            }else{
                this.$emit('onconnect');
            }
        }

    }

    reFresh(){
        (this as any).refreshing = true;
        let that = (this as any);
        uni.getNetworkType({
            success: function (res) {
                if(res.networkType!='none'){
                    if(that.url){
                        uni.redirectTo({
                            url:that.url
                        })
                    }
                }else{
                    uni.showToast({
                        title:'网络异常',
                        icon:'none',
                        duration:2000
                    })
                    that.refreshing = false;
                }
            }
        });

    }
}
</script>
<style lang="scss" scoped>
.box{
    width: 100%;
    background: #ffffff;
    position: relative;
}
.main_box{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .btn {
        width: 160rpx;
        height: 64rpx;
        background: #F4F4F4;
        border: 2rpx solid #CCCCCC;
        border-radius: 4rpx;
        color: #000000;
        text-align: center;
        line-height: 64rpx;
        font-size: 28rpx;

    }
    .tip{
        background-image: url(../static/network_error.png);
        background-size: 100% 100%;
        width: 177rpx;
        height: 177rpx;
    }
    .title{
        font-size: 32rpx;
        line-height: 42rpx;
        color: #333333;
        letter-spacing: 1rpx;
        margin-top: 60rpx;
    }
    .msg{
        font-size: 28rpx;
        line-height: 38rpx;
        color: #999999;
        letter-spacing: 1rpx;
        opacity: 1;
        margin-top: 20rpx;
        margin-bottom: 44rpx;
        text-align: center;
    }

}

</style>