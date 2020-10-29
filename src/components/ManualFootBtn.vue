<template>
      <view class="bottom-btn flex flex-align-center">
            <view class="flex flex-align-center" @tap="changIcon(1)">
                 <u-icon class="icon-hand" color="#6550FB" size="40" :name="iconType==1?'thumb-up-fill':'thumb-up'" ></u-icon>
                 <text>有用</text>
            </view>
            <view class="flex flex-align-center"  @tap="changIcon(2)">
                <u-icon class="icon-hand  icon-hand-write" color="#6550FB" size="40" :name="iconType==2?'thumb-down-fill':'thumb-down'" ></u-icon>
                <text>没用 </text>          
            </view>
                      
      </view>
</template>
<script lang="ts">
import {Component,Prop,Vue} from "vue-property-decorator";
@Component({
      name:"FootBtn"
})
export default class FootBtn extends Vue {
      private iconType=0;
      changIcon(type:number){
            this.iconType = type;
      }
}
</script>
<style lang="scss" scoped>
.bottom-btn{
      position: fixed;
      width: 600upx;
      box-sizing: border-box;
      padding: 0 20upx;
      height: 98upx;
      left: 20upx;
      bottom: 0;
      background-color: #fff;
      box-shadow:0px -4px 8px rgba(153,153,153,0.1);
      border-radius:0 0 20upx 20upx;
      .icon-hand{
            vertical-align: bottom;
            margin-right: 20upx;
      }
      .icon-hand-write{
            margin-left: 68upx;
            transform:rotateY(180deg);
            -ms-transform:rotateY(180deg); 	/* IE 9 */
            -moz-transform:rotateY(180deg); 	/* Firefox */
            -webkit-transform:rotateY(180deg); /* Safari 和 Chrome */
            -o-transform:rotateY(180deg);
      }
}
</style>