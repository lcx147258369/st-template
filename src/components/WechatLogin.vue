<template>
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
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { UserModule } from '@/store/modules/user';
import { SystemModule } from '@/store/modules/system';
import { mpWeixinLogin } from '@/serve/api';

@Component({})
export default class WechatLogin extends Vue {
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
.item-pic {
    width: 48upx;
    height: 39upx;
    margin-right: 16upx;
}
</style>
