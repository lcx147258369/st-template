<template>
	<view class="reg-wrapper">
		<u-navbar :is-back="false" title="" class="back">
			<view class="slot-wrap" @tap="$reLunch({url: '/pages/lunch/lunch'})">
				取消
			</view>
		</u-navbar>
		<h3>注册新账号</h3>
		<view class="form-box">
			<form class="form">
				<view class="margin-top-30">
					<view class="input-box flex flex-align-center">
						<input type="number" maxlength="11" placeholder="请输入手机号" v-model="regForm.nick" class="flex-1">
					</view>
				</view>
				<view class="flex">
					<view class="input-box flex flex-justify-between flex-align-center flex-1">
						<input type="text" placeholder="请输入图形验证码" class="flex flex-1" v-model="regForm.code">
						
					</view>
					<image class="pic-code" :src="pic" @click="handleGetPicCode()"></image>
				</view>
				<view class="flex">
					<view class="input-box flex flex-justify-between flex-align-center flex-1">
						<input type="number" maxlength="6" placeholder="请输入验证码" class="flex flex-1" v-model="regForm.smsCode">
						<button class="code-btn" :disabled="smsDisabled" @click="getSmsCode">
							{{ smsDisabled ? second + '秒后重新获取' : '获取验证码'}}
						</button>
					</view>
					
				</view>
				<view>
					<view class="input-box flex flex-align-center padding-0-15">
						<input :type="type" placeholder="请设置密码" v-model="regForm.pwd" class="flex-1 uni-input">
						<image :src="iconSrc" alt="" class="eye-icon" @click="typeChange"></image>
					</view>
				</view>
				<view>
					<view class="input-box flex flex-align-center padding-0-15">
						<input type="text" placeholder="请输入邀请码，可不填" v-model="regForm.userRegInviter" class="flex-1 uni-input">
					</view>
				</view>
				<button class="submit-btn" :class="{'active' : active}" :loading="btnLoading" @click="handleRegister">注册并登录</button>
				<view @tap="$redirect({url: '/pages/pwdLogin/pwdLogin'})" class="tip">
					<text>已有账号？立即登录</text>
				</view>
			</form>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		Component,
		Vue
	} from "vue-property-decorator";
	import {
		randomStr, uniSuper
	} from "@/utils/util";
	import {
		UserModule
	} from "@/store/modules/user";
	import {
		SystemModule
	} from '@/store/modules/system';

	@Component({})
	export default class register extends uniSuper {
		private regForm: object = {
			nick: "",
			code: "",
			smsCode: "",
			pwd: "",
			userRegInviter:""
		};
		private btnLoading = false;
		private smsDisabled = false;
		private checked = true;
		private codeKey = randomStr();
		private type = "password";
		private iconSrc = require("../../static/eyeClose@2x.png");
		private pic = '';
		private second = 60;
		private rules: object = {
			nick: [{
				pattern: /^1[3456789]\d{9}$/,
				message: "手机号格式不正确",
			}],
			pwd: [{
				pattern: /^[a-zA-Z]\w{5,17}$/,
				message: "以字母开头，长度在6~18之间，只能包含字母、数字和下划线",
			}],
			code: [{
				required: true,
				message: "图形验证码不能为空",
				trigger: "blur"
			}],
			smsCode: [{
				required: true,
				message: "短信验证码不能为空",
				trigger: "blur"
			}]
		};
        loadImg = {
            background: process.env.VUE_APP_IMG + 'login_bg@2x.png'
        }


		public created() {
			this.handleGetPicCode();
		}

		/**
		 * @params type = submit 最后提交的校验，默认短信校验
		 */
		public verifyForm(type: any): boolean {
			const rules = (this as any).rules;
			const {
				nick,
				code,
				smsCode,
				pwd
			} = (this as any).regForm;
			switch (true) {
				case rules.nick[0].pattern.test(nick) == false:
					uni.showToast({
						title: rules.nick[0].message,
						icon: 'none',
						duration: 2000
					});
					return false;
				case code == '':
					uni.showToast({
						title: rules.code[0].message,
						icon: 'none',
						duration: 2000
					});
					return false
				case type === 'submit' && smsCode == '':
					uni.showToast({
						title: rules.smsCode[0].message,
						icon: 'none',
						duration: 2000
					});
					return false
				case type === 'submit' && rules.pwd[0].pattern.test(pwd) == false:
					uni.showToast({
						title: rules.pwd[0].message,
						icon: 'none',
						duration: 2000
					});
					return false
				case type === 'submit' && this.checked == false:
					uni.showToast({
						title: '请先同意服务协议',
						icon: 'none'
					})
					return false
				default:
					return true
			}
		}

		/**
		 * 获取短信验证码
		 */
		private async getSmsCode < Promise > () {
			const {
				nick,
				code
			} = (this as any).regForm;
			const codeKey = this.codeKey;
			var verify: boolean = this.verifyForm('sms');
			if (!verify) return;
			const params: object = {
				type: "reg",
				phone: nick,
				code: code,
				code_key: codeKey
			};
			this.smsDisabled = true;
			try {
				const data = await (this as any).$http.getSmsCode(params);
				if (data.id == '1000') {
					this.timeDown()
				} else {
					this.handleGetPicCode()
					this.smsDisabled = false
				}
			} catch (err) {
				console.log(err + 'getSmsCode');
			}
		}

		/**
		 * 获取图形验证码
		 */
		private async handleGetPicCode < Promise > () {
			this.codeKey = randomStr();
			const params = {
				type: "reg",
				key: this.codeKey
			};
			try {
				this.pic = await (this as any).$http.getCode(params);
			} catch (err) {
				console.log(err + 'getCode');
			}
		}

		get active(){
			var {
				nick,
				pwd,
				code,
				smsCode
			} = (this as any).regForm;
			if(nick!='' && code!='' && smsCode!='' && pwd!='' ){
				return true
			}else{
				return false
			}
		}


		/**
		 * 倒计时
		 */
		public timeDown(): void {
			const timer = setInterval(() => {
				this.second--
				if (this.second === 0) {
					this.smsDisabled = false
					this.second = 60
					clearInterval(timer)
				}
			}, 1000)
		}

		/**
		 * 提交注册信息
		 */
		private async handleRegister() {
			const {
				nick,
				pwd,
				code,
				smsCode,
				userRegInviter
			} = (this as any).regForm;
			const params = {
				type: 1,
				nick: nick,
				pwd: pwd,
				sms_code: smsCode,
				code: code,
				code_key: this.codeKey,
				user_reg_inviter: SystemModule.invite || userRegInviter,
				fr: SystemModule.from
			};
			console.log(SystemModule.from)
			var verify: boolean = this.verifyForm('submit');
			if (!verify) return;
			this.btnLoading = true;
			try {
				const {
					data,
					id
				} = await UserModule.Register(params);
				if (id == 1000) {

					// const pathList = ['/pages/work/work', '/pages/index/index', '/pages/user/user'];
					// if(pathList.indexOf(SystemModule.redirect) != -1) {
					//     uni.switchTab({
					//         url: SystemModule.redirect
					//     })
					// } else {
					//     uni.redirectTo({
					//         url: SystemModule.redirect
					//     })
                    // }
                    await UserModule.GetUserInfo();
					uni.switchTab({
						url: '/pages/index/index'
					})
				}

			} catch (err) {
				console.log(err)
			}
			setTimeout(() => {
				this.btnLoading = false;
			}, 1000)
		}
		
		typeChange() {
			if ((this as any).type == "password") {
				(this as any).type = "text";
				(this as any).iconSrc = require("../../static/eyeOpen@2x.png");
			} else {
				(this as any).type = "password";
				(this as any).iconSrc = require("../../static/eyeClose@2x.png");
			}
		}
	}
</script>

<style lang="scss">
   .reg-wrapper {
        min-height: 100vh;
        background:rgba(255,255,255,1)!important;
   }
	uni-button[disabled].code-btn {
		background: none!important;
	}
	.margin-top-30{
		margin-top: 60upx;
	}
	.padding-0-15{
		padding: 0 30upx;
	}
	.reg-wrapper {
		height: 100%;
		
		// background: $uni-bg-color-white;
		.back{
			.slot-wrap{
				margin-left: 40upx;
				font-size:34upx;
				color:rgba(52,52,52,1);
			}
			/deep/ .u-border-bottom:after{
				border-bottom-width: 0;
			}
		}
		
		h3{
			font-size:48upx;
			font-weight:400;
			line-height:62upx;
			color:rgba(52,52,52,1);
			margin: 80upx 0 0 60upx;
		}
		.banner {
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;
		}
		.logo-pic {
			margin: 0 auto;
			margin-top: 60upx;
			margin-bottom: 100upx;
			width: 246upx;
			height: 66upx;
		}
	
		.form-box {
			width: calc(100vw - 40upx);
			padding-bottom: 44upx;
			margin: 0 auto;
			background: rgba(255, 255, 255, 1);
			border-radius: 20upx;
			z-index: 1;
			position: relative;
			.left-module{
				position: absolute;
				top: -20upx;
				left: 0;
				width: 50%;
				height:100upx;
				background: rgba(255, 255, 255, 1);
				border-radius:20upx 20upx 0px 0px;
				
				.flex{
					width: 100%;
					height: 80upx;
				}
				img{
					width: 40upx;
					height: 42upx;
					margin-right: 20upx;
				}
				text{
					font-size:32upx;
					color:rgba(0,0,0,1);
				}
			}
			.right-module{
				width: 50%;
				height: 80upx;
				background:rgba(106,59,254,1);
				border-radius:0px 20upx 0px 20upx;
				
				img{
					width: 46upx;
					height: 40upx;
					margin-right: 20upx;
				}
				text{
					font-size:32upx;
					color:rgba(255,255,255,1);
				}
			}
			.form{
				display: block;
				padding: 0 20upx;
			}
			.input-head {
				padding-bottom: 30upx;
	
				.input-title {
					font-size: $uni-font-size-base;
					color: #4c4c4c;
				}
	
				.icon-box {
					width: 60upx;
				}
			}
	
			.input-box {
				height: 88upx;
				background:rgba(245,247,254,1);
				border-radius:8upx;
				// border-bottom: 2upx solid #EEEEEE;
				// padding-bottom: 20upx;
				margin-bottom: 40upx;
				input{
					margin-left: 28upx;
				}
				/deep/ .input-placeholder {
					font-size: $uni-font-size-base;
				}
				
				.uni-input{
					outline: none;
					border: none;
					padding: 0;
					margin: 0;
					text-decoration: inherit;
					font-size: $uni-font-size-base;
					background: none;
				}
				
				.uni-input::-webkit-input-placeholder {
					color: #999;
				}
				.uni-input::-moz-placeholder {                     /* Mozilla Firefox 19+ */
					color: #999;
				}
				.uni-input:-moz-placeholder {                   /* Mozilla Firefox 4 to 18 */
					color: #999;
				}
				.uni-input:-ms-input-placeholder {          /* Internet Explorer 10-11 */
					color: #999;
				}
				
				.phone-icon {
					width: 30upx;
					height: 40upx;
					margin-right: 20upx;
					margin-left: 10upx;
				}
				
				.pic-icon {
					width: 36upx;
					height: 28upx;
					margin-right: 20upx;
					margin-left: 4upx;
				}
				
				.code-icon {
					width: 36upx;
					height: 38upx;
					margin-right: 20upx;
					margin-left: 4upx;
				}
				
				.pass-icon {
					width: 30upx;
					height: 35upx;
					margin-right: 20upx;
					margin-left: 10upx;
				}
				
				.eye-icon {
					width: 48upx;
					height: 48upx;
				}
			}
			
			.pic-code {
				width: 220upx;
				height: 88upx;
				border-radius:4px;
				margin-left: 20upx;
			}
			
			.code-btn {
				width: 228upx;
				height: 32upx;
				// background: linear-gradient(266deg, rgba(181, 6, 245, 1) 0%, rgba(78, 0, 255, 1) 100%);
				opacity: 1;
				border-radius: 0;
				font-size:24upx;
				color:rgba(51,51,51,1);
				line-height: 32upx;
				margin: 0;
				margin-left: 32upx;
				border-left: 1px solid rgba(204,204,204,1);
			}
	
			.submit-btn {
				border-radius: 46upx;
				background:rgba(98,78,255,0.24);
				box-shadow:0px 3px 6px rgba(98,78,255,0.24);
				// opacity:0.2;
				margin-top: 80upx;
				margin-bottom: 40upx;
				line-height: 92upx;
				color: $uni-text-color-inverse;
				&.active{
					background:rgba(98,78,255,1);
				}
			}
	
		}
	
		.link {
			padding-top: 30upx;
			padding-bottom: 64upx;
		}
		.tip{
			font-size:26upx;
			color:rgba(153,153,153,1);
			text-align: center;
		}
	
		.service {
			.deal {
				color: #624EFF;
			}
	
			/deep/uni-checkbox .uni-checkbox-input {
				width: 40upx;
				height: 40upx;
			}
	
			/deep/uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
				width: 40upx;
				height: 40upx;
			}
			
		}
		.first-boxshadow{
			width: calc(100% - 40upx);
			height: 20upx;
			background:rgba(243,248,255,1);
			opacity:0.4;
			border-radius:0 0 20upx 20upx;
			position: absolute;
			bottom: -20upx;
			left: 20upx;
		}
		.second-boxshadow{
			width: calc(100% - 80upx);
			height: 40upx;
			background:rgba(243,248,255,1);
			opacity:0.1;
			border-radius:0 0 20upx 20upx;
			position: absolute;
			bottom: -40upx;
			left: 40upx;
		}
	}
	
	
</style>
