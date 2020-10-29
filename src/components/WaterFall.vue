<!-- 
 * 瀑布流布局
 * 默认两列布局，列间距为 "12px"
 * 
 * @作者：陈万照
 * @公司：山东标梵互动信息技术有限公司
 * @官网：http://biaofun.com/
 * @微信：C207668802
 * @QQ：207668802
 * @邮箱：cwz@biaofun.com || 207668802@qq.com
 * @版本：v1.0.0
 * 
 * props:
 *   list: 列表数据？Array类型；
 *   count: 列数，Number类型，默认为：2；
 *   gap: 列间距，String类型，默认为："12px"；
 * 
 * emit事件：
 *   tapItem(item, index): 数据 item 的点击事件。
 *     item: 数据对象，Object类型；
 *     index: 数据下标，Number类型；
 -->
<template>
	<view class="waterfall" id="waterfall" :style="{ 'column-count': count, 'column-gap': gap }">
		<view class="item flex flex-vertical" v-for="(item, index) in list" :key="index" :style="{ 'margin-bottom': gap }" @tap="onTapItem(item, index)">
			<image class="image" :src="item.img" mode="widthFix" :lazy-load="true"></image>
			<text class="title">{{item.title}}</text>
			<text class="content">{{item.content}}</text>
		</view>
	</view>
</template>

<script>
export default {
	/**
	 * 数据
	 */
	props: {
		// 列表数据
		list: {
			type: Array
		},

		// 列数
		count: {
			type: Number,
			default: 2
		},

		// 列间距
		gap: {
			type: String,
			default: '10px'
		}
	},

	/**
	 * 方法
	 */
	methods: {
		/**
		 * item 点击事件
		 * @param {Object} item 数据对象
		 * @param {Number} index 数据下标
		 */
		onTapItem(item, index) {
			this.$emit('tapItem', item, index);
		}
	}
};
</script>

<style lang="scss" scoped>
.waterfall {
	width: 100%;
	margin: 0 auto;
	column-width: auto;
}

.item {
	break-inside: avoid;
	overflow: hidden;
	border-radius: 4upx;
	background: #ffffff;
	
}

.image {
	width: 120upx;
	height: 120upx;
	margin: 20upx auto;
}

.title {
	text-align: center;
	font-weight: 500;
	color: #050505;
	font-size: 28upx;
}
.content{
	width: 308upx;
	margin: 20upx auto 40upx;
	font-size:26upx;
	line-height:36upx;
	color:rgba(102,102,102,1);
}
</style>
