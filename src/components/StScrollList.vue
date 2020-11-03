<template>
  <view class="box">
        <view class="head-box flex flex-align-center uni-white-bg">
                <scroll-view
                    id="tabsScroll" 
                    class="scroll-view-list"
                    :scroll-y="false"
                    :scroll-x="true"
                    :scroll-left="scrollLeft" 
                    :show-scrollbar="false" 
                    :scroll-into-view="scrollInto"
                    scroll-with-animation 
                > 
                    <view class="tab-wrapper flex flex-align-center">
                        <view v-for="(item,index) in tabList" :key="item.id" class="flex flex-align-center" :id="'tab'+index" @tap="handleChange(item.id,$event)">
                            <view
                                class="tab-item uni-font-size-sm"
                                :class="[{'active':tabInd == item.id},{'margin-left':item.id == 0}]"
                            >
                                <text class="title">{{ item.title }}</text>
                            </view>
                        </view>
                    </view>
                </scroll-view>
                <view class="drop_btn" @tap="toggleDrop" v-if="rightIcon">
                    <image :src="rightIcon"></image> 
                </view> 
        </view>
  </view>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({

})
export default class StScrollList extends Vue {
    tabInd = 0;
	scrollLeft = 0;
    tabwidth = 0;
    dropshow = false;
    scrollInto = '';
    tabItemLeft = [];
    @Prop({default: ''}) tabList!: []; // 数据
    @Prop({default: ''}) index!: number; // 下标
    @Prop({default: ''}) activeStyle!: string; // 选中状态样式
    @Prop({default: require('../static/dropdown.png')}) rightIcon!:string; // 右侧的图标


    @Watch('index') getTabInd (val: any) {
       this.tabInd = Number(this.index);
    }
	mounted(){
		this.getElInfo('tabsScroll').then(res=>{
            this.tabwidth = (res as any).width
        })
        
        //获取tab的偏移以及宽度
        setTimeout(()=>{
            this.getAllItemOffset();
        },200)
    }

    @Watch ('index') getIndex(val){
        //计算tab移动距离
        this.scrollLeft = this.tabItemLeft[val].left - this.tabwidth / 2 + this.tabItemLeft[val].width / 2 - 20; 
    }


    /**
     * 获取tabitem的便宜以及宽度
     */
    getAllItemOffset(){
        var that = this;
        this.tabList.forEach((element,index) => {
            this.getElInfo('tab'+index).then(data=>{
                 that.tabItemLeft.push({
                    left:(data as any).left,//scroll-view 子元素组件距离左边栏的距离
                    width:(data as any).width//scroll-view 子元素组件宽度
                })
            })
        });
    }
	
    handleChange(id: any,event) {
        this.tabInd = Number(id);
        (this as any).$emit('change', this.tabInd);
		let el_id = 'tab'+id
		this.getElInfo(el_id).then(res=>{
			let el_width = (res as any).width;
			let el_offsetLeft = event.target.offsetLeft;
			this.scrollLeft = el_offsetLeft + (el_width/2 - this.tabwidth/2);
		})
    }
	
	
	getElInfo(el_id) { //得到元素的信息
		return new Promise((res, rej) => {
			uni.createSelectorQuery().select('#' + el_id).fields({
				 size: true,
				 scrollOffset: true,
				 rect: true
			}, (data) => {
					res(data);
			}).exec();
		});
    }
    
    /**
     * 显示下拉菜单
     */
    toggleDrop(){
        this.$emit('iconClick', true);
        this.dropshow=!this.dropshow;
    }

}

</script>

<style lang="scss" scoped>
.head-box {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 99;
}
.scroll-view-list {
    background: $uni-bg-color-white;
    flex: 1;
    min-width: 90%;
    box-sizing: border-box;
    .tab-wrapper {
        white-space: nowrap;
    }
    .tab-item {
        display: inline-block;
        margin-right: 40rpx;
        &.margin-left{
            margin-left: 40rpx;
            border-left: none;
        }
        .title {
            font-size: 28upx;
            display: inline-block;
            text-align: center;
            line-height: 80upx;
			color: #666;
        }
        &.active > .title {
		   font-weight:bold;
           color:rgba(116,46,221,1);
		   border-bottom: 4upx solid rgba(116,46,221,1);
        }
        
    }
}
.drop_btn{
    background: #ffffff;
    display: inline-block;
    width: 10%;
    padding:20rpx 20rpx 10rpx 12rpx;
    box-shadow: -4rpx 0rpx 8rpx rgba(153, 153, 153, 0.24);
    image {
        width: 50rpx;
        height: 50rpx;
    }
}

</style>
