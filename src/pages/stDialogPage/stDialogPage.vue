<template>
  <view class="container">
      <view class="content">

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
      <view v-if="show">
          <StDialog
            title="弹窗噢"
            @close="handleClose"
            @confirm="handleClose"
            :isCancel="isCancel"
            :cancelTitle="cancelText"
            :confirmTitle="confirmText"
            :confirmPlain="confirmPlain"
            :cancelPlain="cancelPlain"
          >
            <view slot="content">
                这里是要显示的内容噢？看到了就确认一下
            </view>
          </StDialog>
      </view>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import StSwitch from "@/components/StSwitch.vue";
import StDialog from "@/components/StDialog.vue";

@Component({
    components: {
        StSwitch,
        StDialog
    }
})
export default class stDialogPage extends Vue {
    dataList = [
        {
            title: '基础使用',
            confirmText: '显示',
            cancelText: '隐藏',
            activeClass: '',
            id: 0
        },
        {
            title: '取消按钮',
            confirmText: '是',
            cancelText: '否',
            activeClass: '',
            id: 1
        },
        {
            title: '自定义按钮',
            confirmText: '是',
            cancelText: '否',
            activeClass: '',
            id: 2
        }
    ];
    show = false;
    isCancel = true;
    cancelText = '取消';
    confirmText = '确定';
    activeClass = '';    
    listIndex = 0;


    handleConfirm (index: number) {
        this.show = true;
        this.dataList[index].activeClass = 'active';
        switch (index) {
            case 1:
                this.isCancel = true;
                break;
            case 2:
                this.confirmText = '自定义确定';
                this.cancelText = '自定义取消';
                break;
        }
      
    }
    handleCancel (index: number) {
        this.dataList[index].activeClass = '';
        switch (index) {
            case 0:
                this.show = false;
                break;
            case 1:
                this.isCancel = false;
                this.show = true;
                break;
            case 2:
                this.show = true;
                this.confirmText = '确定';
                this.cancelText = '取消';
                break;

        }
    }

    handleClose () {
        this.show = false;
        this.dataList[this.listIndex].activeClass = '';
    }


}

</script>

<style lang="scss" scoped>
.container {
    padding: 40rpx 40rpx;
}
</style>
