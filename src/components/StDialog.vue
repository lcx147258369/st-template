<template>
  <view>
     <uMask :show="show" z-index="999" :zoom="false" class="flex flex-align-center flex-justify-center">
        <view class="content uni-white-bg">
            <view class="close text-right">
                <u-icon class="close-icon" name="close" @tap="handleClose"></u-icon>
            </view>
            <view class="title text-center" v-if="$slots.title || title" :style="[titleStyle]">
                <slot name="title">{{ title }}</slot>
            </view>
            <view class="body" v-if="$slots.default" :style="[contentStyle]">
                <slot></slot>
            </view>
            <view class="btn-group flex flex-justify-around" v-if="isConfirm || isCancel">
                <button 
                    :style="[cancelStyle]"
                    class="cancel flex-1 uni-bg-color-opacity" 
                    v-if="isCancel" 
                    @tap="handleClose"
                >
                    {{cancelTitle}}
                </button>
                <button 
                    :style="[confirmStyle]"
                    class="confirm flex-1 uni-bg-color-primary" 
                    v-if="isConfirm" 
                    @tap="handelConfirm"
                  
                >
                    {{ confirmTitle }} 
                </button>
            </view>
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
export default class StDialog extends Vue {
    @Prop({default: ''}) title!:string; // 弹窗标题
    @Prop({default: false}) show!:boolean; // 是否显示
    @Prop({default: false}) isCancel!:boolean;  // 是否需要取消按钮
    @Prop({default: true}) isConfirm!:boolean;  // 是否需要确定按钮
    @Prop({default: '取消'}) cancelTitle!:string; // 取消按钮的文本自定义
    @Prop({default: '确定'}) confirmTitle!:string; // 确定按钮的文本自定义
    @Prop({default: null}) titleStyle!:object; // 标题样式
    @Prop({default: null}) contentStyle!:object; // 内容样式
    @Prop({default: null}) cancelStyle!:object; // 取消按钮样式
    @Prop({default: null}) confirmStyle!:object; // 确定按钮样式

    handleClose () {
        this.$emit('update:show', false);
        this.$emit('cancel', false);
    }

    handelConfirm () {
        this.$emit('update:show', false);
        this.$emit('confirm', true);
    }
}

</script>

<style lang="scss" scoped>
.content {
    width: 622rpx;
    box-sizing: border-box;
    padding: 20rpx;
    border-radius: 6rpx;
}
.close-icon {
    width: 24rpx;
    height: 24rpx;
}
.title {
    padding-bottom: 28rpx;
    font-size: $uni-font-size-lg;
    font-weight: bold;
    color: #323233;
}
.body {
   font-size: $uni-font-size-base; 
   line-height: 40rpx;
   color: rgba(125,126,128,1);
   padding: 0 40rpx;
}
.btn-group {
    padding: 0 40rpx;
    padding-top: 50rpx;
}

.confirm, .cancel {
    height: 84rpx;
    line-height: 84rpx;
    font-size: $uni-font-size-base;
}
.cancel {
    margin-right: 28rpx;
}
</style>
