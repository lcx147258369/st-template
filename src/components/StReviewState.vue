<template>
  <view>
     <view class="section state uni-white-bg flex  flex-align-center">
          <image v-if="type" class="state-pic" mode="aspectFit" :src="require(`../static/${type}_pic.png`)"></image>
          <view>
              <view class="state-text" :class="type">{{ stateText }}</view>
              <view class="state-hint">{{ hintText }}</view>
          </view>
      </view>
  </view>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator"; 

@Component({})
export default class ReviewState extends Vue {
    @Prop({default: ''}) stateText!:string;  // 状态文本
    @Prop({default: ''}) hintText!:string;  // 校验文本
    @Prop({default: ''}) type!: string;  // 图标类型
}

</script>

<style lang="scss" scoped>
.section {
    padding: 50upx 40upx;
}

.state {
   .state-pic {
       width: 204upx;
       height: 129upx;
       margin-right: 50upx;
   } 
   .state-text {
       font-size: $uni-font-size-lg;
       font-weight: bold;
   }

   .success {
       color: #0A7BFF;
   }
   .error {
       color: #CE3C39;
   }
   .finish {
        color: #0A7BFF;
   }
   .cancel {
       color: #CE3C39;
   }
   .state-hint {
       padding-top: 20upx;
       color: $uni-text-color-disable;
   }
}
</style>
