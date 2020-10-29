<template>
  <view>
    <view class="flex flex-vertical flex-justify-center" @click="handleWechatLogin">
        <image class="item-pic" :src="'wechat_icon@2x.png' | serve-cdn"></image>
        <text class="item-title">微信</text>
    </view>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { SystemModule } from '@/store/modules/system';

@Component({})
export default class WechatLogin extends Vue {
    /**
     * 微信登录
     */
    handleWechatLogin () {
		//#ifdef MP-WEIXIN
        uni.redirectTo({
            url: '/pages/wechatPage/wechatPage'
        })
        //#endif
        
        //#ifdef H5
        var url = location.origin + '/pages/whitePage/whitePage';
        const invite = SystemModule.invite || '';
        const from = SystemModule.from || '';
        location.href = process.env.VUE_APP_API + `/wx?do=login&callback_url=${url}&user_reg_inviter=${invite}&fr=${from}`;
		//#endif
    }
}

</script>

<style lang="scss" scoped>
.item-pic {
    width: 48upx;
    height: 39upx;
    margin-top: 32upx;
}
.item-title {
    font-size: 24upx;
    line-height: 28upx;
    color: #7E7D7D;
    padding-top: 12upx;
}
</style>
