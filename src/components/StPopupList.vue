<template>
  <view>
      <u-popup v-model="show" :closeable="false" mode="top" z-index="99">
			<view class="drop_box" ref="dropbox" :style="boxStyle">
                <view class="drop_item" v-for="item in dataList" :key="item.id" @tap="tapDropItem(item.id)">
                    <image v-if="item.icon" :src="item.icon"></image>
                    <text>{{ item.title }}</text>
                </view>
            </view>
	  </u-popup>
  </view>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class StPopupList extends Vue {
    scrollLeft = 0;


    @Prop({default: false}) show!: boolean; // 显示
    @Prop({default: 0}) tabInd!: number;
    @Prop({default: null}) dataList!: []; // 数据
    @Prop({default: null}) boxStyle!: object; // 外层样式
    @Prop({default: null}) itemStyle!: object; // 选项样式
    @Prop({default: null}) activeStyle!: object; // 选项选中的样式

     /**
     * 点击下拉菜单
     */
    tapDropItem(index){
        (this as any).$emit('change', index);
        // this.toggleDrop();
    }

     /**
     * 显示下拉菜单
     */
    toggleDrop(){
        // this.$emit('')
    }
}

</script>

<style lang="scss" scoped>
.drop_box{
    background: #ffffff;
    z-index: 99999;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .drop_item{
        width: 20%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 40rpx;
        image {
            width: 96rpx;
            height: 96rpx;
        }
        text {
            display: block;
            margin-top: 24rpx;
            font-size: 24rpx;
            line-height: 32rpx;
            color: #666666;
        }
    }
    overflow: hidden;
    &.show{
        height: auto;
        padding-top: 34rpx;
    }
}
</style>
