<template>
	<view class="nickname">
		<view class="nickname_form">
			<u-cell-group>
				<u-field v-model="nickname" label="昵称" placeholder="请填写用户名">
				</u-field>
			</u-cell-group>
		</view>
		<view class="nickname_button">
			<u-button shape="square" :custom-style="{
						'background-color': '#fed23d',
						'font-size': '30rpx','color':'#000000','height':'92rpx'
					}"
			 @click="changenickname">修改</u-button>
		</view>
	</view>
</template>

<script>
	import md5 from '@/md5.js'
	export default {
		data() {
			return {
				nickname: '',
				userInfo: {}
			};
		},
		onLoad:function(){
			this.userInfo = this.$store.state;
		}
		,
		methods: {
			getapi() {
				var timestamp = Date.parse(new Date());
				var api_key = "abcde";
				return [timestamp, md5(api_key + timestamp)]; //返回api_key+时间戳md5加密 
			},
			async changenickname() {
				var key = await this.getapi();
				uni.request({
					url: 'http://www.liaowang.xyz/app/users/updateUserinfo',
					method: 'POST',
					data: {
						time: key[0],
						token: key[1],
						utoken: this.$store.state.utoken,
						nickname: this.nickname
					},
					success: (res) => {
						console.log(res.data)
						if (res.data.success === 1) {
							uni.showToast({
								title: res.data.msg,
								duration: 2000
							})
							if(res.data.msg==="修改成功"){
								uni.navigateTo({
									url: '../login/login'
								});
								uni.showToast({
									title: "修改成功",
									duration: 2000
								})
							}
							else{
								this.nickname=''
							}
						} 
					}
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.nickname {
		margin-left: 70rpx;
		margin-right: 70rpx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;

		.registered_form {
			width: 100%;
		}

		.nickname_button {
			margin-top: 40rpx;
			width: 100%;
		}
	}
</style>
