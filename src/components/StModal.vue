<template>
    <view>
         <uMask :show="true" z-index="999" :zoom="false" class="flex flex-align-center flex-justify-center">
            <view class="box">
                <view class="logo_box">
                    <slot name="head"></slot>
                </view>
                <view class="title">{{ title }}</view>
                <view class="content">
                    {{ content }}
                    <slot name="content"></slot>
                </view>
                <button @click="goBind" v-if="isConfirm" @tap="handelConfirm">{{ confirmTitle }}</button>
                <view class="no_bind" v-if="isCancel" @tap="handleClose">{{ cancelTitle }}</view>
            </view>
         </uMask>
    </view>
   
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import uMask from "uview-ui/components/u-mask/u-mask.vue";

@Component({
    components: {
        uMask
    }
})
default class StModal extends Vue  {
    @Prop({default: ''}) title!:string; // 弹窗标题
    @Prop({default: false}) isCancel!:boolean;  // 是否需要取消按钮
    @Prop({default: true}) isConfirm!:boolean;  // 是否需要确定按钮
    @Prop({default: '取消'}) cancelTitle!:string; // 取消按钮的文本自定义
    @Prop({default: '确定'}) confirmTitle!:string; // 确定按钮的文本自定义
    @Prop({default: false}) cancelPlain!:boolean; // 取消按钮是否需要镂空
    @Prop({default: false}) confirmPlain!:boolean; // 确定按钮是否需要镂空


    handleClose () {
        this.$emit('close', false);
    }

    handelConfirm () {
        this.$emit('confirm', false);
    }
}
</script>
<style lang="scss" scoped>
.page{
    position: relative;
}
.logo-size{
    width: 92rpx;
    height: 92rpx;
}
.arrow-size{
    width: 41rpx;
    height: 38rpx;
    margin:0 52rpx
}
.box{
    padding: 60rpx 60rpx 40rpx 60rpx;
    width: 622rpx;
    height: 540rpx;
    background: #FFFFFF;
    opacity: 1;
    border-radius: 12rpx;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    .logo_box{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-bottom: 48rpx;
    }
    .title{
        font-weight: bold;
        color: #323233;
        font-size: 32rpx;
        line-height: 42rpx;
    }
    .content{
        margin-top: 20rpx;
        line-height: 38rpx;
        color: #7D7E80;
        font-size: 28rpx;
    }
    button{
        width: 500rpx;
        height: 84rpx;
        background: #624EFF;
        border-radius: 8rpx;
        text-align: center;
        line-height: 84rpx;
        color: #FFFFFF;
        font-size: 28rpx;
        margin-top: 50rpx;
    }
    .no_bind{
        font-size: 28rpx;
        color: #999999;
        line-height: 38rpx;
        margin-top: 28rpx;
    }
}
</style>