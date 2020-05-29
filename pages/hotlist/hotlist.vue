<template>
	<view class="hotlist">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="title_bar">
			<view @click="goback">
				<u-icon name="arrow-left" size="30rpx"></u-icon>
			</view>
			<view>
				排行榜
			</view>
		</view>
		<view class="top_box" :style="{background:'url('+hotlist[0].cover_url+') no-repeat', 'background-clip':'content-box','background-size':'cover'}">
			<view class="mask">
				<view class="hot_title">
					<text>热门榜</text>
				</view>
			</view>
		</view>
		<view class="carton_list">
			<view class="carton_box" v-for="(item,index) in hotlist" v-bind:key="item.id" @click="gotocomicdetails(item.id,userInfo.uid)">
				<u-row gutter="16">
					<u-col span="5">
						<image :src="item.cover_url" mode="widthFix"></image>
					</u-col>
					<u-col span="7">
						<view class="book_name">
							{{item.book_name}}
						</view>
						<view class="author_box">
							{{item.author_name}}
						</view>
						<view class="book_summary">
							{{item.summary}}
						</view>
						<view class="tag_box">
							<u-tag :text="item.tags" type="info" size="mini" mode="plain" show="false" bg-color="#f7f9fa" border-color="#cccccc"
							 color="#cccccc" />
						</view>
					</u-col>
				</u-row>
			</view>
		</view>
		<u-empty v-if="hotlist.length===0"></u-empty>
	</view>
</template>

<script>
	import md5 from '@/md5.js'
	export default {
		data() {
			return {
				hotlist: [],
				userInfo:{}
			};
		},
		onLoad: function() {
			this.getlist();
			this.userInfo = this.$store.state;
		},
		methods: {
			getapi() {
				var timestamp = Date.parse(new Date());
				var api_key = this.api_key;
				return [timestamp, md5(api_key + timestamp)];
				//返回api_key+时间戳md5加密
			},
			async getlist() {
				var key = await this.getapi();
				uni.request({
					url: this.url_config+'app/books/getHot',
					data: {
						time: key[0],
						token: key[1]
					},
					success: (res) => {
						this.hotlist = res.data.hots;
						console.log(this.hotlist)
					}
				});
			},
			gotocomicdetails(id, uid) {
				uni.navigateTo({
					url: '../comicdetails/comicdetails?id=' + id + '&uid=' + uid
				})
			},
			goback() {
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="less" scoped>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	
	.title_bar {
		height: 68rpx;
		font-size: 30rpx;
		width: 100%;
		display: flex;
		justify-content: start;
		align-items: center;
	
		view {
			margin-left: 22rpx;
		}
	}
	.top_box {
		width: 100%;
		height: 334rpx;

		image {
			width: 100%;
			height: 100%;
		}

		.mask {
			width: 100%;
			height: 100%;
			background: rgba(4e, 4f, 63, 0.3);
			// text-align: center
		}

		.hot_title {
			display: flex;
			justify-content: center;
			align-items: center;

			font-size: 40rpx;
			height: 100%;
			color: #ffffff;
			opacity: 1;
		}
	}

	.carton_list {
		margin-top: 28rpx;
		margin-left: 16rpx;
		margin-right: 16rpx;
	}

	.carton_box {
		border-bottom: 3rpx solid #e6e6e6;
		// background-color: #f7f9fa;

		image {
			width: 100%;
			border-radius: 5rpx;
		}


		.book_name {
			font-size: 36rpx;
			line-height: 40rpx;
			color: #181818;
			overflow: hidden;
			height: 80rpx;
		}

		.author_box {
			font-size: 32rpx;
			line-height: 32rpx;
			color: #999999;
			overflow: hidden;
			height: 64rpx;
		}

		.book_summary {
			font-size: 28rpx;
			line-height: 32rpx;
			color: #999999;
			overflow: hidden;
			height: 64rpx;
		}

		.tag_box {
			margin-top: 28rpx;
		}
	}
</style>
