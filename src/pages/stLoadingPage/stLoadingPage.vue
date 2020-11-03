<template>
 <view class="container">
      <view class="content">
          <StLoading
            v-show="show"
            :loadText="loadText"
            :imgStyle="imgStyle"
            @click.native="handleClose"
          >
          </StLoading>
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
import StLoading from "@/components/StLoading.vue";
import StSwitch from "@/components/StSwitch.vue";

@Component({
    components: {
        StLoading,
        StSwitch
    }
})
export default class stLoadingPage extends Vue {
     dataList = [
        {
            title: '基本使用',
            confirmText: '显示',
            cancelText: '隐藏',
            activeClass: '',
            id: 0
        },
        {
            title: '加载文本',
            confirmText: '是',
            cancelText: '否',
            activeClass: '',
            id: 1
        },
        {
            title: '图标大小',
            confirmText: '是',
            cancelText: '否',
            activeClass: '',
            id: 2
        }

    ];
    show = false;
    loadText = '';
    imgStyle = {};
    
    handleConfirm (index: number) {
        this.dataList[index].activeClass = 'active';
        switch(index) {
            case 0:
                this.show = true;
                break;
            case 1:
                this.loadText = '加载中...';
                this.show = true;
                break;
            case 2:
                this.imgStyle = {
                    width: '100rpx',
                    height: '100rpx'
                };
                this.show = true;
                break;
        }
       
    }

    handleCancel (index: number) {
        this.dataList[index].activeClass = '';
        switch(index) {
            case 0:
                this.show = false;
                break;
            case 1:
                this.show = true;
                this.loadText = '';
                break;
            case 2:
                this.imgStyle = {};
                this.show = true;
                break;
        }
    }

    handleClose () {
        this.show = !this.show;
        this.dataList[0].activeClass = '';
    }
}

</script>

<style lang="scss" scoped>
</style>
