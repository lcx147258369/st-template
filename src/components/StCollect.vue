<template>
    <view>
        <view class="collect flex flex-vertical flex-justify-end flex-align-center flex1" @click="handleCollect">
            <image class="btn-icon"  :src="isCollect ? icon : collectIcon"></image>
            <text class="btn-title" v-if="isTitle" :class="isCollect && 'font-bule'" :style="titleStyle">{{ isCollect ? '取消': '收藏' }}</text>
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
    @Prop({default: false}) isCollect!: boolean; //数据
    @Prop({default: null}) titleStyle!:object;
    @Prop({default: require('../static/collect_cur_icon2@2x.png')}) icon!: string;
    @Prop({default: require('../static/collect_icon2@2x.png')}) collectIcon: string;
    @Prop({default: ''}) isTitle!: boolean;
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
