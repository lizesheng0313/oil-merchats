
import 'mpvue-weui/src/style/weui.css';
import './assets/scss/base.scss'
import './assets/font/iconfont.css';
import Vue from 'vue'
import App from './App'
import store from './store'
import MpvueRouterPatch from 'mpvue-router-patch'
Vue.use(MpvueRouterPatch)

Vue.prototype.$store = store;

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    App
})
app.$mount()
