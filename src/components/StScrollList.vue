<template>
  <view class="box">
        <view class="head-box">
                <scroll-view
                    id="tabsScroll" 
                    class="scroll-view-list"
                    :scroll-y="false"
                    :scroll-x="true"
                    :scroll-left="scrollLeft" 
                    :show-scrollbar="false" 
                    :scroll-into-view="scrollInto"
                    scroll-with-animation 
                > <!-- :class="tabInd == item.id && 'active'" -->
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
                <view class="drop_btn" @tap="toggleDrop">
                    <image src="../static/dropdown.png"></image> 
                </view> 
                
        </view>
        <view class="drop_box" ref="dropbox" :class="{'show':dropshow && !close }" >
            <view class="drop_item" v-for="(item,index) in dropList" :key="index" @tap="tapDropItem(index)">
                <image :src="item.icon"></image>
                <text>{{item.label}}</text>
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
    @Prop({default: ''}) activeStyle!: string; // 选中状态
    @Prop({default:''}) dropList!:[]; // 下拉列表数据
    @Prop({default: null}) close!:boolean; // 下拉关闭

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

    @Watch ('close') getMaskStatue(val){
        if(val){
            this.dropshow = false;
        }
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
        this.dropshow=!this.dropshow
        this.$emit('showdrop',this.dropshow)
    }

    /**
     * 点击下拉菜单
     */
    tapDropItem(index){
       this.tabInd = Number(index);
        (this as any).$emit('change', this.tabInd);
        //this.scrollInto =  index-2>=0 ? 'tab'+(index-2):'tab'+index;
        this.scrollLeft = this.tabItemLeft[index].left - this.tabwidth / 2 + this.tabItemLeft[index].width / 2 - 20; 
        this.toggleDrop();
    }
}

</script>

<style lang="scss" scoped>

.box{
    display: flex;
    flex-direction: column;
    //height: 84rpx;
    z-index: 99999;
    .head-box{
        z-index: 99999;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
}
.scroll-view-list {
    background: $uni-bg-color-white;
    width: 90%;
    //flex: 1;
    box-sizing: border-box;
    //padding: 0 20upx;
    .tab-wrapper {
        white-space: nowrap;
    }
    .tab-item {
        display: inline-block;
        //margin-right: 36upx;
        //margin: 0 18upx;
        margin-right: 40rpx;
        &.margin-left{
            margin-left: 40rpx;
            border-left: none;
        }
        .title {
            font-size: 28upx;
            display: inline-block;
            // padding: 0upx 20upx;
            // border-radius: 26upx;
            text-align: center;
            line-height: 80upx;
			color: #666;
        }
        &.active > .title {
           // background:linear-gradient(136deg,rgba(255,54,111,1) 0%,rgba(238,122,98,1) 100%);
		   font-weight:bold;
           color:rgba(116,46,221,1);
		   border-bottom: 4upx solid rgba(116,46,221,1);
        }
        
    }
}
.drop_btn{
    background: #ffffff;
    display: block;
    width: 10%;
    padding:20rpx 20rpx 10rpx 12rpx;
    box-shadow: -4rpx 0rpx 8rpx rgba(153, 153, 153, 0.24);
    image{
        width: 50rpx;
        height: 50rpx;
    }
}
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
        image{
            width: 96rpx;
            height: 96rpx;
        }
        text{
            display: block;
            margin-top: 24rpx;
            font-size: 24rpx;
            line-height: 32rpx;
            color: #666666;
        }
    }
    height: 0;
    overflow: hidden;
    //margin-top: 34rpx;
    
    &.show{
        height: auto;
        padding-top: 34rpx;
    }
}
</style>
