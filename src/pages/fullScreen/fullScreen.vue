<template>
	<view class="box">
		<VipModal v-if="type =='vip'"></VipModal>
		<updata-modal :isLauch='isLauch' v-if="type=='updatainit'||type == 'updataset'"></updata-modal>
		<tikCodeModal v-if="type=='tikCode'" @auth="onTikModalClick" :codeInfo="{}"></tikCodeModal>
		<bind-tik-modal v-if="type=='bindTik'" @nobind="noBind"></bind-tik-modal>
	</view>
</template>

<script>
    // const VipModal = () => import(path)
	export default {
		components:{
			VipModal,
			updataModal,
			tikCodeModal,
			bindTikModal
		},
		data() {
			return {
				type:'',
				isLauch:false
			};
		},
		onLoad(option) {
			uni.$once('funnScreenVipClose',()=>{
				uni.navigateBack({
                    delta: 1
				});
			})

			uni.$once('codeExp',()=>{
				uni.showToast({title:'二维码已过期，请重新保存',icon:'none'})
			})

			var page = plus.webview.currentWebview();
			page.setStyle({'popGesture':'none'});
			
			this.type = option.type
			this.isLauch = option.type =='updatainit' ? true : false;
		},
		onShow(){
			//已授权状态关闭弹窗
			if(this.type == 'bindTik'){
				const userinfo = UserModule.userInfo;
				if(userinfo.douyin_auth_status == 1){
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/index/index'
						})
					}, 500);
					
            	}
			}
		},
		onHide(){
			uni.$off('funnScreenVipClose');
		},
		onBackPress(e){
			if(e.from == 'backbutton'){
            	return true
        	}	
		},
		methods:{
			/**
			 * 抖音二维码点击
			 */
			onTikModalClick(){
				uni.navigateBack({
					delta:1
				})
				uni.$emit('tikModalClick');
			},
			/**
			 * 绑定抖音号点击取消
			 */
			noBind(){
				uni.navigateBack({
					 delta: 1
				});
			}
		}
		
	}
</script>

<style lang="scss">
body {
    background: rgba(0, 0, 0, 0.5);
	width: 750rpx;
	height: 100vh;
	position: relative;
}

</style>
