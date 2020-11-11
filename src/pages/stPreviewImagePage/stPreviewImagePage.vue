<template>
    <view class="container">
      <view class="content flex flex-justify-center">
          <StPreviewImage
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604377918271&di=2917a1d8527b288c33d9b212e03a34d0&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F64%2F52%2F01300000407527124482522224765.jpg"
              @close="handleClose"
              :styles="styles"
          >
          </StPreviewImage>
      </view>
      <view class="list">
          <view class="caption"></view>
          <view class="list-item">
              <view class="item-switch" v-for="item in dataList" :key="item.id">
                  <StSwitch 
                    :confirmText="item.confirmText" 
                    :cancelText="item.cancelText"
                    :activeClass="item.activeClass" 
                    @confirm="handleConfirm(item.id)"
                    @cancel="handleCancel(item.id)"
                    :title="item.title"
                  >
                  </StSwitch>
              </view>
          </view>
      </view>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import StSwitch from "@/components/StSwitch.vue";
import StPreviewImage from "@/components/StPreviewImage.vue";

@Component({
    components: {
        StSwitch,
        StPreviewImage
    }
})
export default class stPreviewImagePage extends Vue {
    dataList = [
        {
            title: '自定义图片大小',
            confirmText: '是',
            cancelText: '否',
            activeClass: '',
            id: 0
        }
    ];
    show = false;
    styles = {};

    handleConfirm (index: number) {
        this.dataList[index].activeClass = 'active';
        switch(index) {
            case 0:
                this.styles = {
                    width: '100rpx',
                    height: '100rpx'
                };
                break;
        }
       
    }

    handleCancel (index: number) {
      
        this.dataList[index].activeClass = '';
        switch(index) {
            case 0:
                this.styles = {};
                break;
        }
    }

    handleClose () {
        this.dataList[0].activeClass = '';
        this.show = !this.show;
    }
}

</script>

<style lang="scss" scoped>
.container {
    padding: 40rpx 40rpx;
}
</style>
