<template>
  <view>
      <u-popup  v-model="popup" :closeable="false" mode="top" z-index="99">
			<view class="drop_box" ref="dropbox" :style="[boxStyle]">
                <view 
                    class="drop_item" 
                    v-for="item in dataList" 
                    :key="item.id" 
                    @tap="tapDropItem(item.id)"
                    :style="[itemStyle, item.id == tabInd && activeStyle]"
                >
                    <image v-if="item.icon" :src="item.icon"></image>
                    {{ item.title }}
                </view>
            </view>
	  </u-popup>
  </view>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class StPopupList extends Vue {
    @Prop({default: false}) show!: boolean; // 显示
    @Prop({default: 0}) tabInd!: number; // 选中的下标
    @Prop({default: null}) dataList!: []; // 数据
    @Prop({default: null}) boxStyle!: object; // 外层样式
    @Prop({default: null}) itemStyle!: object; // 选项样式
    @Prop({default: null}) activeStyle!: object; // 选项选中的样式

    popup = false;
    @Watch('show') getShow (val, old) {
        this.popup = val;
    }

    @Watch('popup') getPopup (val, old) {
         this.$emit('update:show', val);
    }


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
    padding: 20rpx;
    .drop_item{
        width: 23%;
        margin-bottom: 11px;
        padding: 8px 0 7px;
        background: #eee;
        font-size: 15px;
        line-height: 20px;
        color: #666;
        border-radius: 2px;
        text-align: center;
        margin-left: 6px;
        image {
            width: 96rpx;
            height: 96rpx;
        }
        text {
            display: block;
            // margin-top: 24rpx;
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
