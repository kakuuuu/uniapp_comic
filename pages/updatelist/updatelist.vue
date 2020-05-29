<template>
	<view class="updatelist">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="title_bar">
			<view @click="goback">
				<u-icon name="arrow-left" size="30rpx"></u-icon>
			</view>
			<view>
				今日更新
			</view>
		</view>
		<u-empty v-if="upadelist.length"></u-empty>
		<!-- <view class="carton_box" v-for="(item,index) in updatelist" v-bind:key="item.id">
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
					<view class="tag_box">
						<u-tag :text="item.tags" type="info" size="mini" mode="plain" show="false" bg-color="#f7f9fa" border-color="#cccccc" color="#cccccc"/>
					</view>
				</u-col>
			</u-row>
		</view> -->
		<view class="carton_box" v-for="(item,index) in updatelist" v-bind:key="item.id">
			<view class="img_wrap">
				<image :src="item.cover_url" mode="widthFix"></image>
			</view>
			<view class="book_box">
				<view class="book_name">
					{{item.book_name}}
				</view>
				<view class="author_box">
					{{item.author_name}}
				</view>
				<view class="tag_box">
					<u-tag :text="item.tags" type="info" size="mini" mode="plain" show="false" bg-color="#f7f9fa" border-color="#cccccc"
					 color="#cccccc" />
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
				updatelist: [],
			};
		},
		onLoad: function() {
			this.getlist()
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
					url: this.url_config + 'app/books/getNewest',
					data: {
						time: key[0],
						token: key[1]
					},
					success: (res) => {
						this.updatelist = res.data.newest;
						console.log(this.updatelist)
					}
				});
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

	.carton_box {
		border-bottom: 3rpx solid #e6e6e6;
		background-color: #f7f9fa;
		display: flex;
		justify-content: space-between;

		.img_wrap {
			width: 42%;
		}

		.book_box {
			width: 56%;
		}

		image {
			width: 100%;
		}

		.book_name {
			font-size: 40rpx;
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
	}
</style>
