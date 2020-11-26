<template>
	<view class="login-wrapper">
		<u-navbar :is-back="false"  class="back">
			<view class="slot-wrap" @tap="$reLunch({url: '/pages/lunch/lunch'})">
				取消
			</view>
		</u-navbar>
		<h3>登录即可开启创意变现</h3>
		<view class="form-box">
			<form class="form">
				<view class="margin-top-30">
					<view class="input-box flex flex-align-center">
						<input 
                            type="number" 
                            maxlength="11" 
                            v-model="Form.nick" 
                            placeholder="请输入手机号" 
                            class="flex-1"
                            :adjust-position="true"
                        />
					</view>
				</view>
				<view class="flex">
					<view class="input-box flex flex-justify-between flex-align-center flex-1">
						<input 
                            type="text" 
                            maxlength="6" 
                            placeholder="请输入图形验证码" 
                            class="flex flex-1" 
                            v-model="Form.code"
                            :adjust-position="true"
                        />
					</view>
					<image class="pic-code" :src="pic" @click="handleGetPicCode"></image>
				</view>
				<view class="flex">
					<view class="input-box flex flex-justify-between flex-align-center flex-1">
						<input 
                            type="number" 
                            maxlength="6" 
                            class="flex flex-1" 
                            placeholder="请输入验证码" 
                            v-model="Form.smsCode"
                            :adjust-position="true"
                        />
						<button class="code-btn" :disabled="smsDisabled" @click="getSmsCode">
							{{ smsDisabled ? second + '秒' : '获取验证码'}}
						</button>
					</view>
					
				</view>
				<view @tap="$redirect({url: '/pages/pwdLogin/pwdLogin', auth: false})" class="margin-top-negative-8 font-bule">
					<text>密码登录</text>
				</view>
				<button class="submit-btn" :class="{'active':active}" :loading="btnLoading" @click="handleSubmit">确定登录</button>
				<view @tap="$redirect({url: '/pages/register/register', auth: false})" class="tip">没有账号?立即注册</view>
				<!-- #ifdef APP-PLUS -->
				<view @tap="setVisitor" class="visitor_mode" v-if="platform=='ios'">
					<image class="icon" src="../../static/visitor_icon.png"></image>
					<text>去看看</text>
					<image class="arrow" src="../../static/double_arrow_right@2x.png"></image>
				</view>
				<!-- #endif -->
			</form>
            <!-- #ifndef APP-PLUS -->
			<view class="other">
				<view class="line text-center">
					<text class="uni-font-size-base uni-text-color-grey">第三方账号登录</text>
				</view>
				<view class="flex flex-justify-center">
					<view class="item">
						<WechatLogin></WechatLogin>
					</view>
				</view>
			</view>
            <!-- #endif -->
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
	import WechatLogin from "@/components/WechatLogin.vue";
	import {
		SystemModule
	} from '@/store/modules/system';

	@Component({
		components: {
			WechatLogin
		}
	})
	export default class phoneLogin extends uniSuper {
		private Form: object = {
			nick: "",
			code: "",
			smsCode: ""
		};
		private btnLoading = false;
		// private btnDisabled = false;
		private smsDisabled = false;
		private codeKey = randomStr();
		private pic = '';
		private second = 60;
		private rules: object = {
			nick: [{
				pattern: /^1[3456789]\d{9}$/,
				message: "手机号格式不正确",
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
		platform = ''

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
				smsCode
			} = (this as any).Form;
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
				default:
					return true
			}
		}

		get active(){
			if((this as any).Form.nick !='' && (this as any).Form.smsCode != '' && (this as any).Form.code != ''){
				return true;
			}else{
				return false;
			}
		}

		/**
		 * 设置游客模式
		 */
		public setVisitor(){
			UserModule.SET_VISITOR(true);
			var view = plus.nativeObj.View.getViewById('hidetab');
			if(!view){
				(this as any).$creatView(); 
			}
			uni.switchTab({
				url:'/pages/index/index'
			})
		}

		/**
		 * 获取短信验证码
		 */
		private async getSmsCode < Promise > () {
			const {
				nick,
				code
			} = (this as any).Form;
            const codeKey = this.codeKey;
			var verify: boolean = this.verifyForm('sms');
			if (!verify) return;
			const params: object = {
				type: "login",
				phone: nick,
				code: code,
				code_key: codeKey
            };
			this.smsDisabled = true;
			try {
				const data = await (this as any).$http.getSmsCode(params);
				if (data.id == '1000') {
					this.timeDown();
				} else {
					this.handleGetPicCode()
					this.smsDisabled = false
				}
			} catch (err) {
				console.log(err);
			}
		}

		/**
		 * 获取图形验证码
		 */
		private async handleGetPicCode < Promise > () {
            this.codeKey = randomStr();
			const params = {
				type: "login",
				key: this.codeKey
			};
			try {
				this.pic = await (this as any).$http.getCode(params);
			} catch (err) {
				console.log(err);
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
		 * 提交登录信息
		 */
		private async handleSubmit() {
			const {
				nick,
				code,
				smsCode
			} = (this as any).Form;
			const params = {
				type: 1,
				nick: nick,
				sms_code: smsCode,
				code: code,
				code_key: this.codeKey
			};
			var verify: boolean = this.verifyForm('submit');
			if (!verify) return;
			this.btnLoading = true;
			try {
				const {
					data,
					id
				} = await UserModule.mobileLogin(params);
				setTimeout(() => this.btnLoading = false, 1000);
				if (id != '1000') {
					return;
				}
				UserModule.GetUserInfo();
				const pathList = ['/pages/work/work', '/pages/index/index', '/pages/user/user'];
				if (pathList.indexOf(SystemModule.redirect) != -1) {
					uni.switchTab({
						url: SystemModule.redirect
					})
				} else {
					uni.redirectTo({
						url: SystemModule.redirect
					})
				}
			} catch (err) {
				console.log(err)
			}

		}

		onLoad(){
			let {platform} = uni.getSystemInfoSync();
			this.platform = platform;
		}
	}
</script>

<style lang="scss" scoped>
.login-wrapper {
    min-height: 100vh;
    background:rgba(255,255,255,1)!important;
}
uni-button[disabled].code-btn {
	background: none!important;
}
.margin-top-30{
    margin-top: 60upx;
}
.margin-top-negative-8{
	margin-top: -16upx;
}
.font-bule{
	color:rgba(117,138,185,1);
}
.login-wrapper {
    width: 100%;
    height: 100%;
	.visitor_mode{
		margin-top: 40rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		.icon{
			width: 30rpx;
			height: 30rpx;
		}
		text{
			font-size: 26rpx;
			height: 34rpx;
			color: #999999;
			margin: 0 6rpx 0 12rpx;
		}
		.arrow{
			width: 12rpx;
			height: 13rpx;
		}
	}
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
            right: 0;
            width: 50%;
            height:100upx;
            background: rgba(255, 255, 255, 1);
            border-radius:20upx 20upx 0px 0px;
            
            .flex{
                width: 100%;
                height: 80upx;
            }
            img{
                width: 34upx;
                height: 44upx;
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
            border-radius: 20upx 0px 20upx 0px;
            
            img{
                width: 36upx;
                height: 42upx;
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
    
            .pass-icon {
                width: 31upx;
                height: 36upx;
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
    
            /deep/ .uni-input-input {
                font-size: $uni-font-size-base;
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
        
        .pic-code {
            width: 220upx;
            height: 88upx;
            border-radius:4px;
            margin-left: 20upx;
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
        padding-bottom: 30upx;
    }
	
	.tip{
		font-size:26upx;
		color:rgba(153,153,153,1);
		text-align: center;
	}
    
    .service {
        margin-bottom: 52upx;
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
    
    .other {
		width: calc(100vw - 80upx);
		margin-top: 160upx;
		margin-left: 20upx;
        .line {
            width: 100%;
            position: relative;
			text{
				color: #9FA7BD;
				font-size: 24upx;
			}
            &::before {
                content: "";
                display: inline-block;
                height: 2upx;
                width: 232upx;
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(204, 204, 204, 1);
            }
    
            &::after {
                content: "";
                display: inline-block;
                height: 2upx;
                width: 232upx;
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(204, 204, 204, 1);
            }
        }
    
        .item-pic {
            width: 48upx;
            height: 39upx;
            margin-top: 32upx;
        }
    
        .item-title {
            font-size: 24upx;
            line-height: 28upx;
            color: rgba(126, 125, 125, 1);
            padding-top: 12upx;
        }
    }
}

	
</style>
