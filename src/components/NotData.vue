<template>
  <view class="not-data flex flex-vertical flex-justify-center">
     <image :src="pic || require('../static/no_data_1@2x.png')" class="not-pic"></image>
     <text class="text-center">暂无数据</text>
  </view>
</template>

<script lang="ts">
   import { Component, Vue, Prop } from "vue-property-decorator";

   @Component({})
   export default class NotData extends Vue {
       @Prop({default: '暂无数据'}) title!:string;
       @Prop({default: ''}) pic!:string;
   }

</script>

<style lang="scss" scoped>
.not-data {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -70%);
    color: $uni-text-color-grey;
}
.not-pic {
    margin: 0 auto;
    transform: scale(0.5);
    transform-origin: center bottom;
}
</style>
