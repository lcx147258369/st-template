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
    @Prop({default: ''}) status!: any; // 状态
    stateText = '';  // 状态文本
    hintText = '';  // 校验文本
    type = '';  // 图标类型

    created () {
           console.log(this.status);
           switch (this.status) {
                case 22:
                    this.type = 'wait';
                    this.stateText = '测评作业待审核';
                    this.hintText = '作业将在两天内出审核结果';
                    break;
                case 15:
                    this.type = 'wait';
                    this.stateText = '订单待审核';
                    this.hintText = '订单将在两天内出审核结果';
                    break;
                case 1:
                     this.type = 'wait';
                     this.stateText = '等待审核资格';
                     this.hintText = '资格将在两天内出审核结果';
                     break;
                 case 40: 
                    this.type = 'wait';
                    this.stateText = '作业待审核';
                    this.hintText = '作业将在两天内出审核结果';
                    break;
                case 23:
                    this.type = 'error';
                    this.stateText = '测评作业审核未通过';
                    this.hintText = '请重新上传测评作业'
                    break;

                case 17:
                    this.type = 'error';
                    this.stateText = '订单审核未通过';
                    this.hintText = '请重新上传订单';
                    break;
                case 50:
                    this.type = 'error';
                    this.stateText = '作业审核未通过';
                    this.hintText = '请重新提交作业';
                    break;
                case 10:
                    this.type = 'success';
                    this.stateText = '资格审核通过';
                    this.hintText = '请去提交订单';
                    break;
                case 30:
                    this.type = 'success';
                    this.stateText = '订单审核通过';
                    this.hintText = '请去提交作业';
                    break;
                case 21:
                    this.type = 'success';
                    this.stateText = '资格审核通过';
                    this.hintText = '请去提交测评作业';
                    break;
                case 60:
                    this.type = 'success';
                    this.stateText = '作业审核通过';
                    this.hintText = '通过审核，作业完成，作业奖励已发放至您的账户余额';
                    break;
                case 90:
                    this.type = 'finish';
                    this.stateText = '恭喜您，已成功完成任务!';
                    this.hintText = '奖励金已转入您的余额，请注意查收~';
                    break;
                case -1 || -2 || -3 || -4 || -5:
                    this.type = 'finish';
                    this.stateText = '抱歉，任务已取消!';
                    this.hintText = '商家拒绝了您的任务申请，换别的任务试试吧~';
                    break;
            }  
         
    }
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
