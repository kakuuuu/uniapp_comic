<template>
	<view class="registered">
		<view class="registered_form">
			<u-cell-group>
				<u-field v-model="username" label="用户名" placeholder="请填写用户名">
				</u-field>
				<u-field v-model="password" label="密码" placeholder="请填写密码" password="true">
				</u-field>
			</u-cell-group>
		</view>
		<view class="registered_button">
			<u-button shape="square" type="primary" :custom-style="{
						'font-size': '30rpx','height':'92rpx'
					}"
			 @click="userregistered">注册</u-button>
		</view>
	</view>
</template>

<script>
	import md5 from '@/md5.js'
	import {
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				username: '',
				password: '',
			};
		},
		methods: {
			...mapMutations(['login']),
			getapi() {
				var timestamp = Date.parse(new Date());
				var api_key = "abcde";
				return [timestamp, md5(api_key + timestamp)]; //返回api_key+时间戳md5加密 
			},
			async userregistered() {
				var key = await
				this.getapi();
				uni.request({
					url: 'http://www.liaowang.xyz/app/account/register',
					method: 'POST',
					data: {
						time: key[0],
						token: key[1],
						username: this.username,
						password: this.password
					},
					success: (res) => {
						console.log(res.data)
						if (res.data.success === 0) {
							uni.showToast({
								title: res.data.msg,
								duration: 2000
							})
							this.password = ''
						} else {
							
							uni.navigateTo({
								url: '../login/login'
							});
							uni.showToast({
								title: "注册成功",
								duration: 2000
							})
						}
					}
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.registered {
		margin-left: 70rpx;
		margin-right: 70rpx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;

		.registered_form {
			width: 100%;
		}

		.registered_button {
			margin-top: 40rpx;
			width: 100%;
		}
	}
</style>
