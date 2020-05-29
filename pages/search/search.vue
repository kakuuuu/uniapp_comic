<template>
	<view class="search">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="title_bar">
			<view @click="goback">
				<u-icon name="arrow-left" size="30rpx"></u-icon>
			</view>
			<view>
				搜索页
			</view>
		</view>
		<u-search placeholder="搜索作品名" v-model="keyword" show-action="true" action-text="取消" @custom="goback" @search="searchcomic"></u-search>
		<view class="carton_box" v-for="item in books" v-bind:key=item.id @click="gotocomicdetails(item.id,userInfo.uid)">
			<u-row gutter="36">
				<u-col span="3">
					<image :src="item.cover_url" mode="widthFix"></image>
				</u-col>
				<u-col span="9">
					<view class="comic_title">
						{{item.book_name}}
					</view>
					<view class="author_box">
						{{item.author_name}}
					</view>
					<view class="tag_box">
						<u-tag :text="item.tags" type="info" size="mini" mode="plain" show="false" bg-color="#f7f9fa" border-color="#cccccc"
						 color="#cccccc" />
					</view>
				</u-col>
			</u-row>
		</view>
		<u-empty v-if="books.length===0"></u-empty>
	</view>
</template>

<script>
	import md5 from '@/md5.js'
	export default {
		data() {
			return {
				keyword: '',
				books: [],
				userInfo: {}
			};
		},
		onLoad: function() {
			this.userInfo = this.$store.state;
		},
		methods: {
			getapi() {
				var timestamp = Date.parse(new Date());
				var api_key = this.api_key;
				return [timestamp, md5(api_key + timestamp)];
				//返回api_key+时间戳md5加密
			},
			async searchcomic() {
				var key = await this.getapi();
				uni.request({
					url: this.url_config + 'app/books/search',
					data: {
						time: key[0],
						token: key[1],
						keyword: this.keyword,
					},
					success: (res) => {
						this.books = res.data.books;
						console.log(res.data);
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

	.carton_box {
		margin-top: 32rpx;
		border-bottom: 3rpx solid #e6e6e6;
		padding-bottom: 28rpx;
		background-color: #ffffff;

		image {
			width: 100%;
			border-radius: 5rpx;
		}

		.book_name {
			margin-top: 45rpx;
			font-size: 26rpx;
			font-weight: bold;
			line-height: 26rpx;
			color: #181818;
			overflow: hidden;
			height: 52rpx;
		}

		.author_box {
			margin-top: 28rpx;
			font-size: 20rpx;
			line-height: 20rpx;
			color: #999999;
			overflow: hidden;
			height: 64rpx;
		}
	}
</style>
