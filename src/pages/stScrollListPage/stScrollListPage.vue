<template>
   <view class="container">
      <view class="content">
          <StScrollList
            :tabList="scrollList"
            :index="scrollIndex"
            :rightIcon="rightIcon"
            @icon-click="handleDrop"
          >
          </StScrollList>
          <StPopupList
            :dataList="dropList"
            :show.sync="dropShow"
            :tabInd="scrollIndex"
            @change="handleDropChange"
            :boxStyle="{paddingTop: '140rpx'}"
            :activeStyle="{background: 'blue', color: '#ffffff'}"
          >
          </StPopupList>
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
import StScrollList from "@/components/StScrollList.vue";
import StPopupList from "@/components/StPopupList.vue";

@Component({
    components: {
        StSwitch,
        StScrollList,
        StPopupList
    }
})
export default class stScrollListPage extends Vue {
    dataList = [
        {
            title: '指定默认选定',
            confirmText: '是',
            cancelText: '否',
            activeClass: '',
            id: 0
        },
        {
            title: '下拉菜单',
            confirmText: '是',
            cancelText: '否',
            activeClass: '',
            id: 1
        },

    ];

    scrollList = [
        {
            title: '待审订单',
            id: 0
        },
        {
            title: '待发货',
            id: 1
        },
        {
            title: '订单被拒',
            id: 2
        },
        {
            title: '待交作业',
            id: 3
        },
        {
            title: '作业待审核',
            id: 4
        }
    ];

    

    scrollIndex = 0;
    rightIcon = '';
    dropList =  [
        {
            title: '待审订单',
            id: 0
        },
        {
            title: '待发货',
            id: 1
        },
        {
            title: '订单被拒',
            id: 2
        },
        {
            title: '待交作业',
            id: 3
        },
        {
            title: '作业待审核',
            id: 4
        }
    ];
    dropShow = false;
    

    handleConfirm (index: number) {
        this.dataList[index].activeClass = 'active';
        switch(index) {
            case 0:
                this.scrollIndex = 1;
                break;
            case 1:
                this.rightIcon = require('../../static/dropdown.png');
                break;
        }
       
    }

    handleCancel (index: number) {
        this.dataList[index].activeClass = '';
        switch(index) {
            case 0:
                this.scrollIndex = 0;
                break;
            case 1:
                this.rightIcon = '';
                break;
        }
    }

    /**
     * 控制下拉菜单
     */
    handleDrop () {
        this.dropShow = !this.dropShow;
    }

    handleDropChange (index: number) {
        this.scrollIndex = index;
    }
}

</script>

<style lang="scss" scoped>
.container {
    padding: 80rpx 40rpx;
}
</style>
