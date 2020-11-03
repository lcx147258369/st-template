<template>
  <view class="container">
      <view class="content">
          <StCollect 
            :isCollect="isCollect" 
            iconSize="35" 
            @collect="handleCollect"
            :isTitle="isTitle"
          >
          </StCollect>
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
import StCollect from "@/components/StCollect.vue";


@Component({
    components: {
        StSwitch,
        StCollect
    }
})
export default class stCollectPage extends Vue {
    dataList = [
        {
            title: '基础使用',
            confirmText: '收藏',
            cancelText: '取消',
            activeClass: '',
            id: 0
        },
        {
            title: '文本显示',
            confirmText: '是',
            cancelText: '否',
            activeClass: '',
            id: 1
        },

    ];
    isCollect = false;
    isTitle = false;
    

    handleConfirm (index: number) {
        this.dataList[index].activeClass = 'active';
        switch(index) {
            case 0:
                this.isCollect = true;
                break;
            case 1:
                this.isTitle = true;
                this.isCollect = true;
                break;
        }
       
    }

    handleCancel (index: number) {
        this.isCollect = false;
        this.dataList[index].activeClass = '';
        switch(index) {
            case 0:
                this.isCollect = false;
                break;
            case 1:
                this.isTitle = false;
                this.isCollect = true;
                break;
        }
    }

    handleCollect (val: any) {
        this.isCollect = val;
        if(val) {
            this.dataList[0].activeClass = 'active';
        } else {
            this.dataList[0].activeClass = '';
        }
        
    }


}

</script>

<style lang="scss" scoped>
.container {
    padding: 40rpx 40rpx;
}
</style>
