<template>
  <view class="loading-container flex flex-vertical flex-align-center flex-justify-center">
      <image 
        class="loading-pic"
        :style="imgStyle" 
        :src="iconUri"
      >
      </image>
      <view v-if="loadText" class="u-light-color">{{ loadText }}</view>
  </view>
</template>

<script lang="ts">
import { SystemModule } from '@/store/modules/system';
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    components:{
    }
})
export default class StLoading extends Vue {
    @Prop({default: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODBweCIgIGhlaWdodD0iODBweCIgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBjbGFzcz0ibGRzLXBhY21hbiI+CiAgICA8ZyBuZy1hdHRyLXN0eWxlPSJkaXNwbGF5Ont7Y29uZmlnLnNob3dCZWFufX0iIHN0eWxlPSJkaXNwbGF5OmJsb2NrIj4KICAgICAgPGNpcmNsZSBjeD0iNjYuMDUiIGN5PSI1MCIgcj0iNCIgbmctYXR0ci1maWxsPSJ7e2NvbmZpZy5jMn19IiBmaWxsPSIjYWJiZDgxIj4KICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJjeCIgY2FsY01vZGU9ImxpbmVhciIgdmFsdWVzPSI5NTszNSIga2V5VGltZXM9IjA7MSIgZHVyPSIwLjgiIGJlZ2luPSItMC41MzZzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPgogICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImZpbGwtb3BhY2l0eSIgY2FsY01vZGU9ImxpbmVhciIgdmFsdWVzPSIwOzE7MSIga2V5VGltZXM9IjA7MC4yOzEiIGR1cj0iMC44IiBiZWdpbj0iLTAuNTM2cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT4KICAgICAgPC9jaXJjbGU+CiAgICAgIDxjaXJjbGUgY3g9Ijg2LjQ1IiBjeT0iNTAiIHI9IjQiIG5nLWF0dHItZmlsbD0ie3tjb25maWcuYzJ9fSIgZmlsbD0iI2FiYmQ4MSI+CiAgICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iY3giIGNhbGNNb2RlPSJsaW5lYXIiIHZhbHVlcz0iOTU7MzUiIGtleVRpbWVzPSIwOzEiIGR1cj0iMC44IiBiZWdpbj0iLTAuMjY0cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT4KICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJmaWxsLW9wYWNpdHkiIGNhbGNNb2RlPSJsaW5lYXIiIHZhbHVlcz0iMDsxOzEiIGtleVRpbWVzPSIwOzAuMjsxIiBkdXI9IjAuOCIgYmVnaW49Ii0wLjI2NHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+CiAgICAgIDwvY2lyY2xlPgogICAgICA8Y2lyY2xlIGN4PSI0Ni4yNSIgY3k9IjUwIiByPSI0IiBuZy1hdHRyLWZpbGw9Int7Y29uZmlnLmMyfX0iIGZpbGw9IiNhYmJkODEiPgogICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN4IiBjYWxjTW9kZT0ibGluZWFyIiB2YWx1ZXM9Ijk1OzM1IiBrZXlUaW1lcz0iMDsxIiBkdXI9IjAuOCIgYmVnaW49IjBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPgogICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImZpbGwtb3BhY2l0eSIgY2FsY01vZGU9ImxpbmVhciIgdmFsdWVzPSIwOzE7MSIga2V5VGltZXM9IjA7MC4yOzEiIGR1cj0iMC44IiBiZWdpbj0iMHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+CiAgICAgIDwvY2lyY2xlPgogICAgPC9nPgogICAgPGcgbmctYXR0ci10cmFuc2Zvcm09InRyYW5zbGF0ZSh7e2NvbmZpZy5zaG93QmVhbk9mZnNldH19IDApIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTUgMCkiPgogICAgICA8cGF0aCBkPSJNNTAgNTBMMjAgNTBBMzAgMzAgMCAwIDAgODAgNTBaIiBuZy1hdHRyLWZpbGw9Int7Y29uZmlnLmMxfX0iIGZpbGw9IiNmOGIyNmEiIHRyYW5zZm9ybT0icm90YXRlKDE2Ljg3NSA1MCA1MCkiPgogICAgICAgIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiBjYWxjTW9kZT0ibGluZWFyIiB2YWx1ZXM9IjAgNTAgNTA7NDUgNTAgNTA7MCA1MCA1MCIga2V5VGltZXM9IjA7MC41OzEiIGR1cj0iMC44cyIgYmVnaW49IjBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlVHJhbnNmb3JtPgogICAgICA8L3BhdGg+CiAgICAgIDxwYXRoIGQ9Ik01MCA1MEwyMCA1MEEzMCAzMCAwIDAgMSA4MCA1MFoiIG5nLWF0dHItZmlsbD0ie3tjb25maWcuYzF9fSIgZmlsbD0iI2Y4YjI2YSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE2Ljg3NSA1MCA1MCkiPgogICAgICAgIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiBjYWxjTW9kZT0ibGluZWFyIiB2YWx1ZXM9IjAgNTAgNTA7LTQ1IDUwIDUwOzAgNTAgNTAiIGtleVRpbWVzPSIwOzAuNTsxIiBkdXI9IjAuOHMiIGJlZ2luPSIwcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZVRyYW5zZm9ybT4KICAgICAgPC9wYXRoPgogICAgPC9nPgogIDwvc3ZnPg=='}) iconUri!:string;
    @Prop({default: ''}) loadText!:string; // 加载的文本
    @Prop({default: null}) imgStyle!: object; // 图片的样式
    @Prop({default: null}) textStyle!: object; // 文本的样式
}
</script>

<style lang="scss" scoped>

.loading-container {
    width: 750rpx;
    min-height: 100vh;
    position: fixed;
    z-index: 999999;
    left: 0;
    top: 0;
    background: $uni-bg-color-white;
    .loading-pic {
       width: 180upx;
       height: 180upx; 
    }
    .loadText {
        color: #666666;
    }
}
</style>
