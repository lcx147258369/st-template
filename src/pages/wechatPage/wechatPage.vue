<template>
  <div>
      <view class="login-wrapper flex flex-justify-center flex-vertical">
          <image class="logo-pic" :src="'logo1@2x.png'| serve-cdn"></image>
      </view>
      <view>
          <!-- #ifndef MP-WEIXIN -->
          <button class="uni-bg-color-primary uni-btn-radius uni-btn-size-lg flex flex-align-center flex-justify-center"  @click="handleWechatLogin">
              <image class="item-pic" :src="'wechat_icon2@2x.png' | serve-cdn"></image>
              <text class="uni-font-size-lg">微信</text>
          </button>
          <!-- #endif -->
          <!-- #ifdef MP-WEIXIN -->
           <button class="uni-bg-color-primary uni-btn-radius uni-btn-size-lg flex flex-align-center flex-justify-center" lang="zh_CN" open-type="getUserInfo"  @getuserinfo="handleMpweixin">
              <image class="item-pic" :src="'wechat_icon2@2x.png' | serve-cdn"></image>
              <text class="uni-font-size-lg">微信</text>
          </button>
          <!-- #endif -->
      </view>
      <view class="text-center login-link">
          <view @tap="$redirect({url: '/pages/phoneLogin/phoneLogin', auth: false})">手机号登录</view>
      </view>
      <view class="service uni-font-size-sm flex flex-justify-center">
        <label class="flex flex-align-center">
            <text class="uni-font-size-sm">注册或登录代表您已同意</text>
            <view class="flex flex-align-center">
                <view class="uni-font-size-sm deal" @tap="$navigateTo({ url:'/pages/helpCenter/helpDetails?id_key=user_service_policy'})">《用户服务协议》</view>
                <text class="uni-font-size-sm">和</text>
                <view class="uni-font-size-sm deal" @tap="$navigateTo({ url:'/pages/helpCenter/helpDetails?id_key=privacy_policy'})">《隐私政策》</view>
            </view>
        </label>
     </view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WechatLogin from "@/components/WechatLogin.vue";
import { SystemModule } from '@/store/modules/system';
import { mpWeixinLogin } from '@/serve/api';
import { UserModule } from '../../store/modules/user';
   

   @Component({
       components: {
           WechatLogin
       }
   })
   export default class wechatPage extends Vue {
       /**
         * 微信登录
         */
        handleWechatLogin () {
            var url = location.origin + '/pages/whitePage/whitePage';
            const invite = SystemModule.invite || '';
            const from = SystemModule.from || '';
            location.href = process.env.VUE_APP_API + `/wx?do=login&callback_url=${url}&user_reg_inviter=${invite}&fr=${from}`;
        }

        handleMpweixin (e: any) {
            const userInfo = e.detail.userInfo;
            uni.login({
                success: (res: any) => {
                    let code = res.code;
                    UserModule.mpWeixinLogin({code: code, user_info: userInfo})
                    .then(res => {
                        const { id } = res;
                        if(res.id == 1000) {
                            UserModule.GetUserInfo()
                            .then(result => {
                                if(result.id == 1000) {
                                   uni.navigateBack({
                                       delta: 1
                                   })
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
                }
            })
        }
   }

</script>

<style lang="scss" scoped>
.logo-pic {
    margin: 0 auto;
    margin-top: 122upx;
    margin-bottom: 390upx;
    width: 326upx;
    height: 90upx;
}
.item-pic {
    width: 48upx;
    height: 39upx;
    margin-right: 16upx;
}
.login-link {
    color: $uni-text-color-disable;
    margin-top: 50upx;
    margin-bottom: 362upx;
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
</style>
