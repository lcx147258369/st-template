import Vue from 'vue'
import App from './App.vue'
import { $navigateTo, $redirect, $navigateBack, stampTransTime, $switchTab, $reLunch, isNowPage,$showLoading, $hideLoading} from "./utils/util";
import './reset.css';
import uView from 'uview-ui';
import NetError from '@/components/NetError.vue';
import StLoading from '@/components/StLoading.vue'
import { UserModule } from './store/modules/user';

Vue.use(uView);
Vue.component('NetError',NetError);
Vue.component('StLoading',StLoading);


Vue.prototype.$navigateTo = $navigateTo;
Vue.prototype.$redirect = $redirect;
Vue.prototype.$navigateBack = $navigateBack;
Vue.prototype.$switchTab = $switchTab;
Vue.prototype.$reLunch = $reLunch;
Vue.prototype.$showLoading = $showLoading;
Vue.prototype.$hideLoading = $hideLoading;

Vue.filter("protocal", (value: any)  => {
    if(value) { 
        const str = value.split('//');
        if(str[0] == '' || str[0] == 'http:') {
            return 'https://' + str[1];
        } else if(str[0] == 'https') {
            return value;
        }
    }
    return value;
})
Vue.filter("serve-cdn", (value: any)  => {
    return process.env.VUE_APP_IMG + value;
})

Vue.filter("tampTransTime", stampTransTime);

Vue.prototype.$assets = process.env.VUE_APP_IMG;
Vue.config.productionTip = false
Vue.prototype.$http = api;


new App().$mount()
