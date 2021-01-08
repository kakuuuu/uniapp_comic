import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import uView from "uview-ui";
import config from "config.js"

Vue.use(uView);

Vue.config.productionTip = false
Vue.prototype.url_config=config.url_config
Vue.prototype.api_key=config.api_key
Vue.prototype.$store=store
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
