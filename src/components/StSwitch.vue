<template>
  <view>
      <view class="switch-item">
          <view class="title">{{ title }}</view>
          <view class="flex flex-justify-between item-body flex-align-center">
              <view @click="handleConfirm" class="flex-1 text-center">{{ confirmText }}</view>
              <view @click="handleCancel" class="flex-1 text-center">{{ cancelText }}</view>
              <view class="bg" :class="activeClass"></view>
          </view>
      </view>
  </view>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class StSwitch extends Vue {
    @Prop({default: ''}) confirmText!:string;
    @Prop({default: ''}) cancelText!:string;
    @Prop({default: ''}) title!:string;
    @Prop({default: ''}) activeClass!:string;

    handleConfirm () {
        this.$emit('confirm');
    }

    handleCancel () {
        this.$emit('cancel');
    }
}

</script>

<style lang="scss" scoped>
.switch-item {
    margin-top: 25rpx;
    .title {
        position: relative;
        font-size: 15rpx;
        padding-left: 8rpx;
        line-height: 1;
        margin-bottom: 22rpx;
    }
    .item-body {
        height: 35px;
        background-color: rgb(238, 238, 239);
        padding: 3px;
        border-radius: 5px;
        position: relative;
        z-index: 1;
    }
    .bg {
        position: absolute;
        z-index: -1;
        width: 49%;
        left: 50%;
        background-color: rgb(255, 255, 255);
        height: 68rpx;
        border-radius: 5px;
        bottom: 8rpx;
        transition: all 0.35s ease 0s;
        &.active {
            left: 0;
        }
    }
}
</style>
