<template>
    <view class="btn-group flex flex-align-center">
         <view class="left flex flex-justify-around">
             <!-- #ifndef APP-PLUS -->
             <button class="share flex flex-vertical flex-justify-end flex-align-center flex1" @click="handleShare" open-type="share">
                 <image class="btn-icon" src="../static/share_icon@2x.png"></image>
                 <text class="btn-title">分享</text>
             </button>
             <!-- #endif -->
             <view class="collect flex flex-vertical flex-justify-end flex-align-center flex1" v-if="dataList" @click="handleCollect">
                 <image class="btn-icon" v-if="isCollect" src="../static/collect_cur_icon2@2x.png"></image>
                 <image class="btn-icon" v-else src="../static/collect_icon2@2x.png"></image>
                 <text class="btn-title font-bule" v-if="isCollect">已收藏</text>
				<text class="btn-title" v-else>收藏</text>
             </view>
         </view>
        <uniPopup ref="share" class="submit-popup" type="top">
            <view>
                <view class="text-right">
                    <image :src="'share_line@2x.png' | serve-cdn" class="share-line"></image>
                </view>
                <view class="share-info flex flex-justify-center flex-align-center">
                    点击上方按钮，选择分享好友或分享朋友圈<image :src="'share_friend@2x.png'| serve-cdn"></image>，即可
                </view>
            </view>
        </uniPopup>

        <uniPopup type="bottom" ref="popup">
            <uniPopupShare @select="popupSelect" :dataList="List"></uniPopupShare>
        </uniPopup>
        <view  class="right" >
             <slot></slot>
        </view>
     </view>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import uniPopupShare from "@/components/uni-popup/uni-popup-share.vue";
import { isWechat, $Toast } from "@/utils/util";
import { SystemModule } from '@/store/modules/system';
import { UserModule } from '@/store/modules/user';
// #ifdef H5
var wx = require('jweixin-module');  
// #endif
@Component({
    components: {
        uniPopup,
        uniPopupShare
    }
})
export default class FooterBtnGroup extends Vue {
    @Prop({default: ''}) dataList!: any; //数据
    private isCollect = 0;
    public List = [
        {
            text: '微信',
            icon: '/static/share_friend@3x.png',
            name: 'wx'
        },
        {
            text: '朋友圈',
            icon: '/static/share_circle@3x.png',
            name: 'wx'
        }
    ];


    @Watch('dataList') getDataList (val: any, old: any) {
        if(val) {
            const { is_collect } = (this as any).dataList;
            this.isCollect = is_collect;
			// #ifdef H5
            if(isWechat()) {
                this.getWechatConfig();
            }
			// #endif
        }
    }
    /**
     * 控制按钮的点击事件
     */
    private handleClick () {
        this.$emit('btnClick', true);
    }

    /**
     * 收藏
     */
    async handleCollect () {
        // #ifdef APP-PLUS
        if(UserModule.visitor){
            uni.redirectTo({
                url:'/pages/pwdLogin/pwdLogin'
            })
            return;
        }
        // #endif
        try {
            const { product_id } = (this as any).dataList;
            const params = {
                product_id,
                is_collect: Number(!this.isCollect)
            }
            const { data, id } = await (this as any).$http.setCollectTask(params);
            if(id == 1000) {
                this.isCollect = Number(!this.isCollect);
            }
        }
        catch(err) {
            console.log(err)
        }
    }
    /**
     * 获取微信config
     */
    async getWechatConfig () {
        try {
            const { title, pic, product_id } = (this as any).dataList;
            const { platform } = uni.getSystemInfoSync();
            const path = (this as any).$route.fullPath;
            const link = location.origin + path;
            var url;
            if(platform == 'ios') {
                url = SystemModule.shareUrl;
            } else {
				
                url = location.href;
            }
            const { data } = await (this as any).$http.wechatConfig({
                request_url: url,
                debug: 0
            });

            wx.config(data.config);
            wx.ready(() => {
                wx.updateAppMessageShareData({ 
                    title: title, // 分享标题
                    desc: '分享一个任务给你，一起领取吧~', // 分享描述
                    link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: pic, // 分享图标
                    success: function () {
                        
                    },
                    fail: (err: any) => {
                    }
                    
                });
                wx.updateTimelineShareData({
                    title: title, // 分享标题
                    desc: '分享一个任务给你，一起领取吧~', // 分享描述
                    link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: pic, // 分享图标
                    success: function () {
                        
                    },
                    fail: (err: any) => {
                    }
                }) 
            })
        }
        catch(err) {
            console.log(err);
        }
    }
    


    /**
     * 分享弹窗
     */
    handleShare () {
		//#ifdef H5
       (this as any).$refs['share'].open();
        //#endif

        //#ifdef APP-PLUS
        if(UserModule.visitor){
            uni.redirectTo({
                url:'/pages/pwdLogin/pwdLogin'
            })
            return;
        }
       (this as any).$refs['popup'].open();
        //#endif
     }

     
    /**
     * 底部下载图片
     */
    popupSelect(e: any) {
        const {item, index} = e;
        if(index == 2) {
            // // this.handleDownloadPoster();
            // setTimeout(() => {
            //      (this as any).$refs['popup'].close();
            // }, 2000);
        } else {
            $Toast({
                message: '该功能正在开发中'
            })
        }
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
