<template>
  <view class="container">
      <view class="content">
          <StUpload 
            :dataList="uploadList"
            :loadType="loadType"
            :params="{type: '1501'}"
            :postUrl="postUrl"
            @load-end="handleLoadEnd"
            @delete="handleDelete"
          >
            <template #footer v-if="btnShow">
                 底部内容
            </template>
          </StUpload>
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
import StUpload from "@/components/StUpload.vue";
import StSwitch from "@/components/StSwitch.vue";

@Component({
    components: {
        StUpload,
        StSwitch
    }
})
export default class stUploadPage extends Vue {
    dataList = [
        {
            title: '基础使用',
            confirmText: '上传视频',
            cancelText: '上传图片',
            activeClass: '',
            id: 0
        },
        {
            title: '底部按钮显示',
            confirmText: '是',
            cancelText: '否',
            activeClass: '',
            id: 1
        },

    ];

    uploadList = [];
    postUrl = '/system/?do=upload_pic';
    loadType = 'img';
    slotProps = null;
    btnShow = false;

     handleConfirm (index: number) {
        this.dataList[index].activeClass = 'active';
        switch(index) {
            case 0:
                
                this.postUrl = '/system/?do=upload_video';
                this.loadType = 'video';
                break;
            case 1:
                 this.btnShow = true;
                break;
        }
       
    }

    handleCancel (index: number) {
        this.dataList[index].activeClass = '';
        switch(index) {
            case 0:
                this.postUrl = '/system/?do=upload_pic';
                this.loadType = 'img';
                break;
            case 1:
                this.btnShow = false;
                break;
        }
    }

    handleLoadEnd (res: any) {
        if(this.loadType == 'img') {
            res.cover = res.upload_url;
            res.id = res.file_id;
        } else {
            res.cover = res.video_cover_url;
            res.id = res.file_id;
        }
        this.uploadList.push(res);
    }

    handleDelete (index: string) {
        console.log(index);
        const ind = this.uploadList.findIndex((item: any) => item.id == index);
        if(ind != -1) {
            this.uploadList.splice(ind, 1);
        }
    }
}

</script>

<style lang="scss" scoped>
.container {
    padding: 40rpx 40rpx;
}
</style>
