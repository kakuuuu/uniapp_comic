<template>
	<view>
		<view class="top_box">
			<view class="user_box" v-if="userInfo.hasLogin==false">
				<u-avatar class="avatar" src="http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg" size="100"></u-avatar>
				<view class="user_name" @click="showAS">
					点击登录
				</view>
			</view>
			<view class="user_box" v-if="userInfo.hasLogin==true">
				<u-avatar class="avatar" src="http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg" size="100"></u-avatar>
				<view class="user_name"  @click="showAS">
					{{userInfo.nick_name}}
				</view>
				<view>
					<u-icon name="edit-pen" size="22" @click="changenickname"></u-icon>
				</view>
			</view>
			<view class="vip_box">
				<view class="vip_tag">
					<u-icon name="bag"></u-icon>
					<text>
						okk币
					</text>
				</view>
				<view class="vip_tag">
					<u-icon name="integral"></u-icon>
					<text>
						会员中心
					</text>
				</view>
			</view>
		</view>
		<view class="bookshelf">
			<u-row gutter="16">
				<u-col span="12">
					<view class="title"><text>我的收藏</text></view>
				</u-col>
			</u-row>
			<view class="booklist_box">
				<view class="carton_box_3" v-for="(item,index) in favors" v-bind:key="item.id" @click="gotocomicdetails(item.book_id,item.user_id)">
					<image :src="item.book.cover_url" mode="aspectFill"></image>
					<view class="book_name">
						{{item.book.book_name}}
					</view>
				</view>
			</view>
			<u-empty text="你还没有收藏作品哦!" v-if="favors.length===0"></u-empty>
		</view>
	</view>
</template>

<script>
	import md5 from '@/md5.js'
	export default {
		data() {
			return {
				userInfo: {},
				favors: []
			};
		},
		onLoad: function() {
			this.getbookshelf();
			this.userInfo = this.$store.state;
		},
		methods: {
			getapi() {
				var timestamp = Date.parse(new Date());
				var api_key = "abcde";
				return [timestamp, md5(api_key + timestamp)];
				//返回api_key+时间戳md5加密
			},
			async getbookshelf() {
				var key = await this.getapi();
				uni.request({
					url: 'http://www.liaowang.xyz/app/users/bookshelf',
					data: {
						time: key[0],
						token: key[1],
						utoken: this.$store.state.utoken
					},
					success: (res) => {
						this.favors = res.data.favors;
						console.log(res.data);
					}
				});
			},
			changenickname(){
				uni.navigateTo({
					url:'../changenickname/changenickname'
				})
			},
			showAS(){
				uni.showActionSheet({
					itemList: ['切换用户'],
					success: function (res) {
						// console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						// this.gotologin();
						uni.navigateTo({
							url: '../login/login'
						})
					},
					fail: function (res) {
						console.log(res.errMsg);
					}
				});
			}
			,
			gotochapterdetail(id) {
				uni.navigateTo({
					url: '../chapterdetail/chapterdetail?id=' + id
				})
			},
			gotocomicdetails(id, uid) {
				uni.navigateTo({
					url: '../comicdetails/comicdetails?id=' + id + '&uid=' + uid
				})
			},
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
			// margin-top: 22rpx;
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

			view {
				margin-left: 42rpx;
				font-size: 28rpx;
				// font-weight: bold;
				display: flex;
				justify-content: center;
				align-items: center;

				text {
					margin-left: 14rpx;
				}
			}
		}
	}

	.bookshelf {
		margin-top: 100rpx;
		margin-left: 16rpx;
		margin-right: 16rpx;

		.title {
			text {
				font-size: 30rpx;
			}
		}
	}
	.booklist_box {
		display: flex;
		flex-wrap: wrap;
		justify-content: start;
	}
	
	.carton_box_3{
		margin-top: 25rpx;
		width: 32%;
		margin-left: 1%;
		image {
			width: 100%;
			height: 314rpx;
			border-radius: 5rpx;
		}
		
		.book_name {
			font-weight: bold;
			font-size: 28rpx;
			line-height: 30rpx;
			overflow: hidden;
			height: 60rpx;
		}
	}
</style>
