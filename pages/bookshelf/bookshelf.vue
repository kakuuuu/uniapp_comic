<template>
	<view class="bookshelf">
		<view class="top_box">
			<view class="user_box" @click="gotologin">
				<u-avatar class="avatar" src="http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg" size="100"></u-avatar>
				<view class="user_name">
					测试用户1
				</view>
			</view>
			<view class="vip_box">
				<view>
					okk币
				</view>
				<view>
					会员中心
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import md5 from '@/md5.js'
	export default {
		data() {
			return {

			};
		},
		onLoad: function() {
			this.gethistory();
		},
		onShow:function(){
			this.gethistory();
		},
		methods: {
			getapi() {
				var timestamp = Date.parse(new Date());
				var api_key = "abcde";
				return [timestamp, md5(api_key + timestamp)];
				//返回api_key+时间戳md5加密
			},
			async gethistory() {
				var key = await this.getapi();
				uni.request({
					url: 'http://www.liaowang.xyz/app/users/history',
					data: {
						time: key[0],
						token: key[1],
						pid:2
					},
					success: (res) => {
						// this.hotlist = res.data.hots;
						console.log(res.data)
					}
				});
			},
			gotocomicdetails(id, uid) {
				uni.navigateTo({
					url: '../comicdetails/comicdetails?id=' + id + '&uid=' + uid
				})
			}
			,
			gotologin() {
				uni.navigateTo({
					url: '../login/login'
				})
			}
		}
		
	}
</script>

<style lang="less" scoped>
	.top_box {
		background-color: #ffdd30;
		height: 210rpx;
		width: 100%;
		position: relative;

		.user_box {
			margin-left: 22rpx;
			margin-right: 22rpx;
			margin-top: 22rpx;
			height: 110rpx;
			display: flex;
			justify-content: start;
			align-items: center;
			font-size: 44rpx;

			.avatar {
				height: 100%;
				width: 100;
			}

			.user_name {
				margin-left: 28rpx;
			}
		}

		.vip_box {
			border-radius: 12rpx;
			margin-left: 28rpx;
			margin-right: 28rpx;
			height: 110rpx;
			background-color: #fff;
			box-shadow: 0px 5rpx 3rpx #f9f9f9;
			display: flex;
			justify-content: start;
			align-items: center;
			transform: translate(0, 50%);
		}
	}
</style>
