<template>
    <view class="container">
      <view class="content">
          <StReviewState
            :stateText="stateText"
            :type="type"
            :hintText="hintText"
          >
          </StReviewState>
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
import StReviewState from "@/components/StReviewState.vue";
import StSwitch from "@/components/StSwitch.vue";

@Component({
    components: {
        StReviewState,
        StSwitch
    }
})
export default class stReviewStatePage extends Vue {
    dataList = [
        {
            title: '显示提示信息',
            confirmText: '是',
            cancelText: '否',
            activeClass: '',
            id: 0
        },
        {
            title: '多状态',
            confirmText: '是',
            cancelText: '否',
            activeClass: '',
            id: 1
        },
        {
            title: '状态描述修改',
            confirmText: '是',
            cancelText: '否',
            activeClass: '',
            id: 2
        }
    ];

    hintText = '';
    type = 'error';
    stateText = '订单审核失败';
    handleConfirm (index: number) {

        this.dataList[index].activeClass = 'active';
        switch (index) {
            case 0:
                this.hintText = '请重新提交';
                break;
            case 1:
                this.type = 'success';
                break;
            case 2:
                this.stateText = '这是自定义的状态描述';
                break;
        }
      
    }
    handleCancel (index: number) {
        this.dataList[index].activeClass = '';
        switch (index) {
            case 0:
                this.hintText = '';
                break;
            case 1:
                this.type = 'error';
                break;
            case 2:
                this.stateText = '订单审核失败';
                break;

        }
    }
}

</script>

<style lang="scss" scoped>
</style>
