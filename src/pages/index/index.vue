<template>
  <view>
      <view v-for="item in list" :key="item.id">
          <u-cell-item 
            icon="setting-fill" 
            :title="item.title" 
            bg-color="#fff"
            @click="$navigateTo({url: item.route})"
          >
          </u-cell-item>
      </view>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class index extends Vue {
    list = [
        {
            icon: '',
            title: 'Dialog',
            route: '/pages/stDialogPage/stDialogPage',
            id: 0
        },
        {
            icon: '',
            title: 'Collect',
            route: '/pages/stCollectPage/stCollectPage',
            id: 1
        },
        {
            icon: '',
            title: 'ScrollList',
            route: '/pages/stScrollListPage/stScrollListPage',
            id: 2
        },
        {
            icon: '',
            title: 'PreviewImage',
            route: '/pages/stPreviewImagePage/stPreviewImagePage',
            id: 3
        },
        {
            icon: '',
            title: 'Loading',
            route: '/pages/stLoadingPage/stLoadingPage',
            id: 4
        }
    ]
}

</script>

<style lang="scss" scoped>
</style>
