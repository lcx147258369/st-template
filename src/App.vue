<script lang="ts">
import Vue from "vue";
import { UserModule } from "@/store/modules/user";
import { SystemModule } from "@/store/modules/system";

export default Vue.extend({
    mpType: "app",
    onShow() {
        console.log("App show");
    },

    onHide() {
        console.log("App Hide");
    },

    onLaunch () {
        //  uni.onNetworkStatusChange((res)=>{
        //     SystemModule.SET_NETWORKTYPE(res.isConnected);
        //  })
    }
});
</script>

<style lang="scss">
@import "uview-ui/index.scss";
</style>
