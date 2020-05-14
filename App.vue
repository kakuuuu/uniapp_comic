<script>
	import {mapMutations} from 'vuex'
	export default {
		onLaunch: function() {
			let userInfo=uni.getStorage({
				key:'userInfo',
				success: (res) => {
					this.login(res.data);
					console.log(res.data);
				}
			})
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			...mapMutations(['login'])
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>