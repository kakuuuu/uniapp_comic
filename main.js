import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import uView from "uview-ui";

Vue.use(uView);

Vue.config.productionTip = false
Vue.prototype.$store=store
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
