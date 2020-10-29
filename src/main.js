import Vue from 'vue'
import App from './App'
import "babel-polyfill";
Vue.config.productionTip = false

// if (process.env.NODE_ENV === 'development' && defaultSettings.vconsole) {
  const VConsole = require('vconsole')
  // eslint-disable-next-line
  const my_console = new VConsole()
// }
var vConsole = new VConsole(option)


App.mpType = 'app';
const app = new Vue({
    ...App
})

app.$mount()
