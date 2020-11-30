<template>
  <view>
      <view v-if="loadType == 'video'">
            <view v-if="dataList.length > 0" class="flex flex-1 flex-wrap">
                <view 
                     v-for="item in dataList"
                    :key="item.id"
                     class="upload-box"
                >
                    <image 
                        class="upload-pic" 
                        :src="item.cover"
                        :style="coverStyle"
                    >
                    </image>
                    
                    <u-icon class="play-circle" name="play-circle"  @click.self="handleTarget(item.id)" color="#ffffff" size="48"></u-icon>
                    <u-icon class="close-icon" name="close" v-if="!item.status || item.status == 2" color="#ffffff" size="10" @click="handleDelete(item.id)"></u-icon>
                </view>
            </view>
            <image v-if="dataList.length <= loadLeng" src="../static/upload_video@3x.png"  :style="coverStyle" class="upload-pic"  @tap="handleUploadVideo"></image>
      </view>

       <view v-if="loadType == 'img'">
            <view 
                class="flex flex-align-start flex-wrap"   
            >   
                <view 
                    v-for="item in dataList"
                    :key="item.id"
                    class="upload-box"
                >
                     <image 
                        class="upload-pic" 
                        :src="item.cover"
                        :style="coverStyle"
                        @tap="handleTarget(item.id)"
                    >
                    </image>
                    <u-icon class="close-icon" name="close" v-if="!item.status || item.status == 2" color="#ffffff" size="10" @tap="handleDelete(item.id)"></u-icon>
                    <view v-if="$slots.footer">
                        <slot name="footer"></slot>
                    </view>
                </view>
                <view class="upload-box" v-if="disabled == false && dataList.length <= loadLeng">
                    <image src="../static/upload_pic@3x.png" class="upload-pic"   :style="coverStyle"  @tap="handleUploadPic"></image>
                </view>  
            </view>
      </view>
      
  </view>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { platform } from "@/utils/util";
import { protocal } from "@/utils/filter";
import service from "@/serve/request";

@Component({})
export default class StUpload extends Vue {
    @Prop({default: 1}) loadLeng!: number;  // 上传的数量
    @Prop({default: 'img'}) loadType!:string; // 上传类型
    @Prop({default: 1}) maximum!:number;    // 最大选择数
    @Prop({default: [], required: true}) dataList!: []; // 展示上传的图片
    @Prop({default: null}) params!: object; // 额外参数
    @Prop({default: false}) disabled!: boolean; // 禁用上传
    @Prop({default: false}) isErrorText!: boolean; // 是否显示失败的原因 
    @Prop({default: '', required: true}) postUrl: string; // 上传的地址
    @Prop({default: ''}) coverStyle!: object; // cover样式
    @Prop({default: ''}) loadIcon!: string; // 上传的图标
    /**
     * 点击播放按钮或者图片
     */
    handleTarget (index: number) {
        this.$emit('click-cover', index);
    }


    handleDelete (index: any) {
        this.$emit('delete', index);
    }

    handleClickBtn (index: any) {
        (this as any).$emit('click-btn', index);
    }

    /**
     * 上传测评视频
     */
    private handleUploadVideo () {
        //#ifndef H5 || APP-PLUS
        this.chooseVideo();
        //#endif
        
        //#ifdef H5
        if(platform == 'ios') {
            this.createNativeInput();
            const input: any = document.querySelector("#file");
            input.click();
        } else {
            this.chooseVideo();
        }
        //#endif

        //#ifdef APP-PLUS
            const maximum = this.maximum - this.dataList.length; 
            plus.gallery.pick(this.GalleryMultiplePickSuccessCallback , (error: any) => plus.nativeUI.alert(error.message) , {filter:"video", maximum: maximum, multiple: true});
        //#endif
    }

    /**
     * 读取视频文件
     */

    private chooseVideo () {
         uni.chooseVideo({
            success: (chooseImageRes: any) => {
                const files: any = chooseImageRes.tempFilePath;
                this.postUploadVideo(files);
            }
        });
    }

    /**
     * APP多选
     */
    GalleryMultiplePickSuccessCallback (e: any) {
        const files = e.files;        
        (async () => {
            try {
                for(const file of files) {
                    const respones = await this.postUploadVideo(file);
                }
            }
            catch(err) {
                console.log(err);
            }
        })();
    }


    /**
     * 上传video
     * 
     */
    async postUploadVideo (file: any) {
        try {
            const {
                data,
                id
            } = await (this as any).$http.uploadVideo(this.postUrl, {
                file: file,
                params: this.params
            });
            if (id == "1000") {
                this.$emit('load-end', data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * 创建原生input框
     */
    createNativeInput() {
        let input = document.createElement("input");
        input.style.display = "none";
        input.setAttribute("id", "file");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "application/x-zip-compressed");
        input.onchange = this.handleCompress;
        document.body.appendChild(input);
    }

     /**
     * ios提交压缩包视频
     */
    handleCompress(e: any) {
        var file = e.target.files[0];
        let sliceSize = file.size;
        let sliceBuffer = [];
        while(sliceSize > 1024*1024) {
            const blobPart = file.slice(sliceBuffer.length * 1024 * 1024, (sliceBuffer.length + 1) * 1024 * 1024);
            sliceBuffer.push(
                blobPart
            );
            sliceSize -= (1024 * 1024);
        }


        if (file.size > 1024 * 1024 * 100) {
            return uni.showToast({
                title: "可上传视频最大为100MB"
            });
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e: any) => {
            let path = e.currentTarget.result;
            console.log(path);
            this.postUploadVideo(path);
        }
       
    }

     /**
     * 上传测评图片
     */
    private handleUploadPic () {
        uni.chooseImage({
            count: this.maximum - this.dataList.length,
            success: (chooseImageRes: any) => {
                const files: any = chooseImageRes.tempFilePaths;
                for(let file of files) {
                    this.postUploadVideo(file);
                }
            }
        });
    }
}

</script>

<style lang="scss" scoped>


 .upload-pic {
        width: 160upx;
        height: 160upx;
    }
.upload-box {
    position: relative;
    margin-right: 20upx;
    padding-bottom: 10upx;
    .close-icon {
        position: absolute;
        z-index: 99;
        right: -20upx;
        top: -10upx;
        background: red;
        border-radius: 50%;
        padding: 8upx;
    }
    .play-circle {
        position: absolute;
        z-index: 9;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    &:nth-child(4n) {
        margin-right: 0;
    }
    .error-btn, .error-text {
        font-size: $uni-font-size-base;
        color: $uni-color-error;
        background: #FFEDED;
        border: 2upx solid #FF0A0A;
        padding: 4upx 10upx;
        border-radius: 4upx;
        margin-top: 20upx;
    }
}

</style>
