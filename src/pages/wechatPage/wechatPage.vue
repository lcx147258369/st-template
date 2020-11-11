<template>
  <div>
      <WechatLogin></WechatLogin>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WechatLogin from "@/components/WechatLogin.vue";
   
   @Component({
       components: {
           WechatLogin
       }
   })
   export default class wechatPage extends Vue {
     
   }

</script>

<style lang="scss" scoped>
.logo-pic {
    margin: 0 auto;
    margin-top: 122rpx;
    margin-bottom: 390rpx;
    width: 326rpx;
    height: 90rpx;
}
.item-pic {
    width: 48rpx;
    height: 39rpx;
    margin-right: 16rpx;
}
.login-link {
    color: $uni-text-color-disable;
    margin-top: 50rpx;
    margin-bottom: 362rpx;
}
.service {
    margin-bottom: 52rpx;
    .deal {
        color: #624EFF;
    }

    /deep/uni-checkbox .uni-checkbox-input {
        width: 40rpx;
        height: 40rpx;
    }

    /deep/uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
        width: 40rpx;
        height: 40rpx;
    }
}
</style>
