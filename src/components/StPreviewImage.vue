<template>
  <div class="check-demo-wrap">
    <div class="demo_main  flex flex-justify-center flex-align-center">
      <image :src="src" class="demo_pic" :style="styles" @tap="previewImage(src)"></image>
      <view class="close_pic">
        <image :src="'close_demo.png '| serve-cdn"  @click="changeDialogStatus"></image>
      </view>
    </div>
  </div>
</template>
<script lang="ts">
import { $Toast, platform, isWechat } from "@/utils/util";
import permision from "@/utils/permission";
export default {
  name: "checkDemo",
  props: ["src", "styles"],  //样式图地址  缩略图的样式 
  data() {
    return {};
  },
  mounted() {
   
  },
  methods: {
    changeDialogStatus() {
      this.$emit("close", false);
    },
    /**
     * 预览图片
     */
    previewImage(link: any) {
        const urls = [link];
        uni.previewImage({
            urls: urls,
            longPressActions: {
                itemList: ["保存到相册"],
                success: (index) => {
                    this.handleDownloadPoster(urls[0]);
                },
            },
            success: () => {},
            fail: (err: any) => {
                console.log(err);
            },
        });
    },
    /**
     * 下载邀请海报
     */
    handleDownloadPoster(url: string) {
        
        //#ifdef APP-PLUS
        if (platform == "ios") {
            this.requestIosPermission("photoLibrary");
        } else if (platform == "android") {
            this.requestAndroidPermission("android.permission.WRITE_EXTERNAL_STORAGE");
        };
        //#endif

        //#ifndef H5 || APP-PLUS
            this.dowloadInteface();
        //#endif
    },
    /**
     * 下载接口
     */
    dowloadInteface () {
        const list = this.imgList;
        const task = uni.downloadFile({
            url: this.src, //仅为示例，并非真实的资源
            success: (res) => {
                if (res.statusCode === 200) {
                    const file = res.tempFilePath;
                    uni.saveImageToPhotosAlbum({
                        filePath: file,
                        success: function () {
                            $Toast({
                                message: "保存成功",
                            });
                            this.openPopup('close');
                        },
                        fail: (err) => {
                            $Toast({
                                message: "保存失败" + err,
                            });
                        }
                    });
                } else {
                    $Toast({
                        message: "服务器出错",
                    });
                }
            },
        });
        task.onProgressUpdate((res) => {
            //#ifndef APP-PLUS
            uni.showLoading({
                title: '下载中' + String(res.progress) + '%'
            });
            if(res.progress >= 100) {
                uni.hideLoading();
            }
            //#endif

            //#ifdef APP-PLUS
            var wait = plus.nativeUI.showWaiting();
            wait.setTitle('下载中' + res.progress + '%');
            if(res.progress >= 100) {
                plus.nativeUI.closeWaiting();
            }
            //#endif
        });
    },
      /**
     * 判断安卓是否获得相册权限
     */
    async requestAndroidPermission(permisionID) {
        var result = await permision.requestAndroidPermission(permisionID);
        var strStatus;
        if (result == 1) {
            strStatus = "已获得授权";
            this.dowloadInteface();
        } else if (result == 0) {
            uni.showModal({
                content: permisionID + strStatus + "是否去打开",
                showCancel: false,
                success: (res) => {
                    if (res.confirm) {
                        permision.gotoAppPermissionSetting();
                    }
                },
            });
        } else {
            (strStatus = "被永久拒绝权限"),
                uni.showModal({
                    content: permisionID + strStatus,
                    showCancel: false,
                });
        }
    },
    /**
     * 判断IOS是否获得相册权限
     */
    requestIosPermission(permisionID) {
        var result = permision.judgeIosPermission(permisionID);
        if (result != true) {
            permision.gotoAppPermissionSetting();
        } else {
            this.dowloadInteface();
        }
    }
  }
};
</script>
<style lang="scss" scoped>
.check-demo-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  //   opacity: 0.5;
  top: 0;
//   pointer-events: none;
  z-index: 999;
  .demo_main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-height: 90%;
    margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
    .demo_pic {
      width: 90%;
      height: 996upx;
    }
    .close_pic {
      display: flex;
      justify-content: center;
      image {
        margin-top: 40upx;
        width: 55upx;
        height: 55upx;
      }
    }
  }
}
</style>