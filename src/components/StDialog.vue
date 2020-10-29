<template>
  <view>
     <uMask :show="true" z-index="999" :zoom="false" class="flex flex-align-center flex-justify-center">
        <view class="content uni-white-bg">
            <view class="close text-right">
                <image class="close-icon" src="../static/close@2x.png" @tap="handleClose"></image>
            </view>
            <view class="title text-center">{{ title }}</view>
            <view class="body">
                <slot name="content"></slot>
            </view>
            <view class="btn-group flex flex-justify-around">
                <button class="cancel flex-1 uni-bg-color-opacity" v-if="isCancel" @tap="handleClose">{{cancelTitle}}</button>
                <button class="confirm flex-1 uni-bg-color-primary" v-if="isConfirm" @tap="handelConfirm">{{ confirmTitle }} </button>
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
.content {
    width: 622upx;
    box-sizing: border-box;
    padding: 20upx;
    border-radius: 6upx;
}
.close-icon {
    width: 24upx;
    height: 24upx;
}
.title {
    padding-bottom: 28upx;
    font-size: $uni-font-size-lg;
    font-weight: bold;
    color: #323233;
}
.body {
   font-size: $uni-font-size-base; 
   line-height: 40upx;
   color: rgba(125,126,128,1);
   padding: 0 40upx;
}
.btn-group {
    padding: 0 40upx;
    padding-top: 50upx;
}

.confirm, .cancel {
    height: 84upx;
    line-height: 84upx;
    font-size: $uni-font-size-base;
}
.cancel {
    margin-right: 28upx;
}
</style>
