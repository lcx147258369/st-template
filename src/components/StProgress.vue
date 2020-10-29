<template>
  <view class="st-progress">
      <view class="progress-box flex"> 
          <view class="progress-active" :style="{background: activeColor, width: ((value/max)*100)+ '%'}"></view>
      </view>
  </view>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class StProgress extends Vue {
    @Prop({default: '#ccc'}) activeColor!:string; // 进度背景色
    @Prop({default: 0}) min!:number; // 最小值
    @Prop({default: 0}) max!:number; // 最大值
    @Prop({default: 0}) value!: number; // 当前值
    
}

</script>

<style lang="scss" scoped>
.st-progress {
    padding-top: 4upx;
    padding-bottom: 20upx;
}
.progress-box {
    background: #F0F0F0;
    border-radius: 20upx;
    height: 8upx;
    overflow: hidden;
    .progress-active {
        height: 100%;
        border-radius: 20upx;
    }
}
</style>
