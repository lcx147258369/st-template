<script lang="ts">
import Vue from "vue";
import { UserModule } from "@/store/modules/user";

export default Vue.extend({
    mpType: "app",
    onShow() {
        console.log("App show");
    },

    onHide() {
        console.log("App Hide");
    },
});
</script>

<style lang="scss">
@import "./reset.css";
</style>
