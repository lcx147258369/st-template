<template>
    <view class="popup-menu">
        <view class="menu-wrapper flex flex-justify-start flex-wrap">
            <view 
                class="menu-item flex flex-justify-center flex-align-center"
                v-for="item in dataList"
                :key="item.id"
                @click="handleChangeType(item.id, item.title)"
            >
                <text :class="item.id == typeId && 'active'">{{item.title}}</text>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";


@Component({
    components: {
        
    }
})
export default class StPopupMenu extends Vue {
    @Prop({default: ''}) dataList!: []; // 菜单列表
    @Prop({default: ''}) tabIndex!: any; // 当前选择
    private typeId = this.tabIndex;
    private handleChangeType(id: any, title: any) {
        this.typeId = id;
        this.$emit('on-type', {id, title});
    }
}
</script>

<style lang="scss" scoped>
.menu-wrapper {
    background: $uni-bg-color-white;
    padding: 20upx 20upx 0 20upx; 
    .menu-item {
        width: 25%;
        box-sizing: border-box;
        padding-bottom: 20upx;
        &>text {
            font-size: 24upx;
            background: rgba(227,227,227,1);
            display: inline-block;
            width: 124upx;
            height: 52upx;
            border-radius: 26upx;
            text-align: center;
            line-height: 52upx;
        }
        &>text.active {
           background:linear-gradient(136deg,rgba(255,54,111,1) 0%,rgba(238,122,98,1) 100%);
           color: $uni-text-color-inverse;
        }
    }
}
</style>
