import Vue from 'vue'
import App from './App.vue'
import { $navigateTo, $redirect, $navigateBack, $switchTab, $reLunch, isNowPage,$showLoading, $hideLoading} from "./utils/util";
import uView from 'uview-ui';
import StLoading from '@/components/StLoading.vue';
import * as api from '@/serve/api';
import * as filter from '@/utils/filter';

Vue.config.productionTip = false

Vue.use(uView);
Vue.component('StLoading',StLoading);

Vue.prototype.$http = api;
Vue.prototype.$navigateTo = $navigateTo;
Vue.prototype.$redirect = $redirect;
Vue.prototype.$navigateBack = $navigateBack;
Vue.prototype.$switchTab = $switchTab;
Vue.prototype.$reLunch = $reLunch;
Vue.prototype.$showLoading = $showLoading;
Vue.prototype.$hideLoading = $hideLoading;

Object.keys(filter).forEach(key => Vue.filter(key, filter[key]))

new App().$mount()
