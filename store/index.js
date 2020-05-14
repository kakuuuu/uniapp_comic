//引入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({//全局变量定义
    state: {
        forcedLogin: false,//是否需要强制登录
        hasLogin: false,
        username: '',
		nick_name:'',
        uid:'',
        utoken:'',
		mobile:'',
		balance:'',
        vip_expire_time:'',
    },
    mutations: {
        login(state, user) {
            state.username = user.username || '';
            state.hasLogin = true;
            state.uid = user.uid || '';
            state.utoken = user.utoken || '';
            state.mobile = user.mobile || '';
			state.nick_name = user.nick_name || '';
			state.balance = user.balance || '';
			state.vip_expire_time = user.vip_expire_time || '';
			uni.setStorage({
				key:'userInfo',
				data:user
			})
        },
        logout(state) {
           state.username = "13";
           state.hasLogin = false;
           state.uid = '';
           state.utoken = '';
           state.mobile = '';
		   state.nick_name = '';
		   state.balance = '';
		   state.vip_expire_time = '';
		   uni.removeStorage({
		   	key:'userInfo'
		   })
        }
    }
})
export default store