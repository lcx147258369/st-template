<template>
  <view>
     <uniPopup ref="popup" type="dialog" :maskClick="false">
		      <view class="modal-content uni-white-bg">
		           <image class="close-icon" :src="require('../static/close@2x.png')" @tap="closePopup"></image> 
		           <view class="title">{{title}}</view>
				   <view class="info font-color-666">输入兑换码</view>
				   <input type="text" v-model="exchangeCode" placeholder="请输入兑换码">
		           <view class="info font-color-999">
					   <view>请确保兑换码有效，才能兑换成功。</view>
						<view>兑换成功后兑换码不可退还。</view>
				   </view>
		           <button class="uni-bg-color-primary modal-btn" :loading="loading" @tap="handleExchange">确定兑换</button>
		      </view>
	 </uniPopup> 
  </view>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import loading from '@/utils/loading';

@Component({
    components: {
        uniPopup
    }
})
export default class KeyModal extends Vue {
   @Prop({default: 2}) type!: number; 
   @Prop({default: '兑换课程'}) title!: string;
   @Prop({default: false}) open!:boolean;
   @Prop({default: ''}) dataList!: object;
   @Watch('open') setState (val) {
       if(val == true) {
           this.openPopup();
       }
   }
      
   exchangeCode = '';
   loading = false;

   openPopup () {
        (this as any).$refs['popup'].open();
   }
		
   closePopup () {
        (this as any).$refs['popup'].close();
		this.exchangeCode = '';
        this.$emit('close', false);
   }
   /**
    * 兑换课程 */ 
   async handleExchange () {
	   if(this.exchangeCode == ''){
		   uni.showToast({title:'请输入兑换码',icon:'none'});
		   return;
	   }
       try {
           this.loading = true;
           var params;
           if(this.type == 2) {
               const courseId = (this as any).dataList.id;
               params = {
                    code: this.exchangeCode,
                    type: this.type,
                    type_id: courseId
               };
           } else if(this.type == 1) {
                params = {
                   code: this.exchangeCode,
                   type: this.type
               };
           }
          
           const { data, id } = await (this as any).$http.codeExchange(params);
		   
           if(id == 1000) {
               this.$emit('change', {state: true, id: (this as any).dataList.id});
               this.closePopup();
           }
           this.loading = false;

       }
       catch(err) {
           console.log(err);
       }
   }
}

</script>

<style lang="scss" scoped>
.font-color-666 {
    color: $uni-text-color-grey;
}
.font-color-999 {
    color: $uni-text-color-disable;
}
.modal-content {
		    width:622upx;
		    border-radius:8upx;
		    box-sizing: border-box;
		    padding: 20upx 60upx;
		    position: relative;
		    .close-icon {
		        width: 24upx;
		        height: 24upx;
		        position: absolute;
		        z-index: 99;
		        top: 20upx;
		        right: 20upx;
		        
		    }
		    .title {
		        font-size: $uni-font-size-lg;
		        color: #323233;
		        line-height: 44upx;
		        padding-bottom: 24upx;
		        padding-top: 34upx;
				text-align: center;
		    }
		    .info {
		        font-size: $uni-font-size-base;
		        line-height: 40upx;
		    }
			input {
				width:476upx;
				height:88upx;
				background:rgba(242,245,255,1);
				font-size:24upx;
				border-radius:4upx;
				margin: 20upx 0 32upx;
				padding-left: 24upx;
				.uni-input-placeholder{
					color: #CCCCCC;
				}
				
			}
		    .modal-btn {
		        width:500upx;
		        height:84upx;
		        line-height: 84upx;
				background:rgba(98,78,255,1);
		        border-radius:8upx;
		        color: $uni-text-color-inverse;
		        font-size: $uni-font-size-base;
		        margin-top: 50upx;
		    }
		}
</style>
