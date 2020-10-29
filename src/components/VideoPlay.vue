<template>
    <view class="video-play">
        <image
            id="work-video"
            class="media-play"
            :src="cover | protocal"
        ></image>
        <view class="paly-cover">
            <image :src="'play_icon.png' | serve-cdn" class="start-icon" @tap="handleExitScreen"></image>
        </view>
    </view>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({

})
export default class VideoPlay extends Vue {
        @Prop({default: ''}) src!: string; // 链接
        @Prop({default: ''}) cover!:string; 
        @Prop({default: ''}) duration!:string;

        /**
         *  控制视频播放
         */
        handleExitScreen () {
            console.log(this.cover);
            (this as any).$navigateTo({
                url: `/pages/videoPage/videoPage?link=${this.src}&cover=${this.cover}&duration=${this.duration}`
            })
        }
}
</script>

<style lang="scss" scoped>
.video-play {
     position: relative;
}
.media-play {
     width: 120upx;
     height: 120upx;
}
.start-icon {
    width: 28upx;
    height: 28upx;
}
.paly-cover {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    background-color: rgba(1,1,1,.5);
    z-index: 1;
}

</style>
