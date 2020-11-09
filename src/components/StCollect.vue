<template>
    <view>
        <view class="collect flex flex-vertical flex-justify-end flex-align-center flex1" @click="handleCollect">
            <image class="btn-icon" :style="size" :src="isCollect ? collectIcon:icon"></image>
            <text class="btn-title" v-if="title && collectTitle" :class="isCollect && 'font-bule'" :style="titleStyle">{{ isCollect ? title: collectTitle }}</text>
        </view>
     </view>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
    components: {

    }
})
export default class Collect extends Vue {
    @Prop({default: false}) isCollect!: boolean; // 数据
    @Prop({default: null}) titleStyle!:object; // 文本样式
    @Prop({default: require('../static/collect_icon2@2x.png')}) icon!: string; // 未收藏的图标
    @Prop({default: require('../static/collect_cur_icon2@2x.png')}) collectIcon: string; // 已收藏的图标
    @Prop({default: ''}) title!: string; // 未收藏文本
    @Prop({default: ''}) collectTitle!:string; // 收藏文本
    @Prop({default: '44rpx'}) size!:object; // icon大小
    
    /**
     * 收藏
     */
    handleCollect () {
        this.$emit('update:isCollect', Number(!this.isCollect));
    }
}

</script>

<style lang="scss" scoped>
.font-bule{
	color: #624EFF!important;
}

.collect {
    min-width: 200rpx;
}

.btn-icon {
    width: 44upx;
    height: 44upx;
    margin: 5rpx; 
}
.btn-title {
    font-size: 28upx;
    color: #666666;
}
</style>
