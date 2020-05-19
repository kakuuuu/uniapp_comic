<template>
	<view class="login">
		<view class="login_form">
			<u-cell-group>
				<u-field v-model="username" label="用户名" placeholder="请填写用户名">
				</u-field>
				<u-field v-model="password" label="密码" placeholder="请填写密码" password="true">
				</u-field>
			</u-cell-group>
		</view>
		<view class="login_button">
			<u-button shape="square" :custom-style="{
						'background-color': '#fed23d',
						'font-size': '30rpx','color':'#000000','height':'92rpx'
					}"
			 @click="userlogin">登录</u-button>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="login_button">
			<!-- <u-button type="success" :custom-style="{'height':'92rpx'}" @getuserinfo="wxGetUserInfo">微信授权</u-button> -->
			<button class="" open-type="getUserInfo" @getuserinfo="wxGetUserInfo" withCredentials="true">微信授权获取用户信息</button>
		</view>
		<view class="registered" @click="gotoregistered">
			注册账号
		</view>
		<!-- #endif -->

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
				utoken: ''
			};
		},
		methods: {
			...mapMutations(['login']),
			getapi() {
				var timestamp = Date.parse(new Date());
				var api_key = "abcde";
				return [timestamp, md5(api_key + timestamp)]; //返回api_key+时间戳md5加密 
			},
			async userlogin() {
				var key = await
				this.getapi();
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
						console.log(res.data)
						if (res.data.success === 0) {
							uni.showToast({
								title: res.data.msg,
								duration: 2000
							})
							this.password = ''
						} else {
							this.login(res.data.userInfo);
							this.utoken = res.data.userInfo.utoken;
							uni.showToast({
								title: "登录成功",
								duration: 2000
							})
							uni.reLaunch({
								url: '../discover/discover'
							});
						}
					}
				});
			},
			gotoregistered(){
				uni.navigateTo({
					url: '../registered/registered'
				})
			},
			wxGetUserInfo(res){
				uni.login({
						provider: 'weixin',
						success: function(loginRes) {
							console.log('-------获取code-------')
							console.log(loginRes.code);
							wx.request({
								url: 'https://xxxxx'+loginRes.code,
								success: function(info) {
									console.log('-------获取sessionKey、openid(unionid)-------')
									console.log(info);
								},
								fail: function(e) {
									console.log(e)
								}
							})
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
		flex-wrap: wrap;

		.login_form {
			width: 100%;
		}

		.login_button {
			margin-top: 40rpx;
			width: 100%;
		}
	}
	.registered{
		margin-top: 40rpx;
		width: 100%;
		font-size: 22rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		}
</style>
