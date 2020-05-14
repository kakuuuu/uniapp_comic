<template>
	<view class="login">
		<u-row gutter="16">
			<u-col span="12">
				<u-cell-group>
					<u-field v-model="username" label="用户名" placeholder="请填写用户名">
					</u-field>
					<u-field v-model="password" label="密码" placeholder="请填写密码" password="true">
					</u-field>
				</u-cell-group>
			</u-col>
			<u-col span="12">
				<u-button shape="square" :custom-style="{
							'background-color': '#fed23d',
							'font-size': '30rpx','color':'#000000','height':'92rpx'
						}"
				 @click="userlogin">登录</u-button>
			</u-col>
			<!-- <u-col span="12">
				<u-button shape="square" :custom-style="{
							'background-color': '#fed23d',
							'font-size': '30rpx'
						}"
				 @click="gethistory">获取</u-button>
			</u-col> -->
		</u-row>
	</view>
</template>

<script>
	import md5 from '@/md5.js'
	import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
				username: 'testuser',
				password: '123456',
				utoken:''
			};
		},
		methods: {
			...mapMutations(['login']),
			getapi() {
				var timestamp = Date.parse(new Date());
				var api_key = "abcde";
				return [timestamp, md5(api_key + timestamp)];
				//返回api_key+时间戳md5加密
			},
			async userlogin() {
				var key = await this.getapi();
				uni.request({
					url: 'http://www.liaowang.xyz/app/account/login',
					method: 'POST',
					data: {
						time: key[0],
						token: key[1],
						username: this.username,
						password: this.password
					},
					success: (res) => {
						// this.hotlist = res.data.hots;
						console.log(res.data)
						this.login(res.data.userInfo)
						this.utoken=res.data.userInfo.utoken
					}
				});
			}
		}
	}
</script>

<style lang="less">
	.login {
		margin-left: 70rpx;
		margin-right: 70rpx;
		display: flex;
		justify-content: center;
	}
</style>
