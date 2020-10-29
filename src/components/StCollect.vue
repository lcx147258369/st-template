<template>
    <view>
        <view class="collect flex flex-vertical flex-justify-end flex-align-center flex1" @click="handleCollect">
            <view v-if="isCollect">
                <image class="btn-icon"  src="../static/collect_cur_icon2@2x.png"></image>
                <text class="btn-title font-bule" v-if="isCollect">已收藏</text>
            </view>
            <view v-else>
                 <image class="btn-icon"  src="../static/collect_icon2@2x.png"></image>
                 <text class="btn-title">收藏</text>
            </view>
        </view>
     </view>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

// #endif
@Component({
    components: {

    }
})
export default class Collect extends Vue {
    @Prop({default: ''}) isCollect!: any; //数据
    /**
     * 收藏
     */
    handleCollect () {
        this.$emit('collect', Number(!this.isCollect));
    }
    

}

</script>

<style lang="scss" scoped>
.font-bule{
	color: #624EFF!important;
}
.btn-group {
	width: 100%;
	height: 154upx;
	background: $uni-bg-color-white;
    position: fixed;



    
    bottom: 0;
    left: 0;
    z-index: 99;
    box-sizing: border-box;
    box-shadow:0px -4px 6px rgba(102,102,102,0.1);
    .left {
        width: 270upx;
        
        background: $uni-bg-color-white;
        .btn-icon {
            width: 44upx;
            height: 44upx; 
        }
        .btn-title {
            margin-top: 16upx;
            font-size: 28upx;
            color: #666666;
        }
    }
    .right {
        width:500upx;
        height:92upx;
        line-height: 92upx;
        border-radius: 12upx;
        color: $uni-text-color-inverse;
		font-size:32upx;
    }

}

.share-line {
    width: 202upx;
    height: 223upx;
    margin-top: 20upx;
    margin-right: 96upx;
}
.share-info {
    width: 670upx;
    height: 72upx;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 12upx;
    image {
        width: 28upx;
        height: 28upx;
    }
}
.flex1{
	flex:1;
}
</style>
