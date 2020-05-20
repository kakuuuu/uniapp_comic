<template>
	<view class="discover">
		<view class="top-content">
			<view class="status_bar">
				<!-- 这里是状态栏 -->
			</view>
			<view class="search_bar" @click="gotosearch">
				<u-search placeholder="搜索作品名" :clearabled="true" :show-action="false" bg-color="#f7f9fa" disabled="false"></u-search>
			</view>
			<view class="swiper">
				<u-swiper :list="swiper_list" name="pic_name" mode="rect" @click="clickswiper"></u-swiper>
			</view>
			<view class="button_view">
				<u-row gutter="16">
					<u-col span="6">
						<u-button @click="gotoclassification">
							<u-icon name="grid"></u-icon>漫画分类<u-icon name="arrow-right"></u-icon>
						</u-button>
					</u-col>
					<u-col span="6">
						<u-button @click="gotohot">
							<u-icon name="bookmark"></u-icon>热门排行<u-icon name="arrow-right"></u-icon>
						</u-button>
					</u-col>
				</u-row>
			</view>
		</view>
		<view class="mid-content">
			<view>
				<u-row gutter="16">
					<u-col span="12">
						<view class="title"><text>经典必看</text></view>
					</u-col>
				</u-row>
			</view>
			<view class="booklist_box">
				<view class="carton_box_3" v-for="(item,index) in classiclist" v-bind:key="item.id" @click="gotocomicdetails(item.id,userInfo.uid)">
					<image :src="item.cover_url" mode="aspectFill" lazy-load=true></image>
					<view class="book_name">
						{{item.book_name}}
					</view>
				</view>
			</view>
			<view class="button_view">
				<u-row gutter="16">
					<u-col span="6">
						<u-button @click="gotoclassic">查看更多</u-button>
					</u-col>
					<u-col span="6">
						<u-button @click="changeclassiclist">换一换</u-button>
					</u-col>
				</u-row>
			</view>
			<view>
				<u-row gutter="16">
					<u-col span="12">
						<view class="title"><text>今日更新</text></view>
					</u-col>
				</u-row>
			</view>
			<view class="booklist_box">
				<view class="carton_box_2" v-for="(item,index) in newlist" v-bind:key="item.id" @click="gotocomicdetails(item.id,userInfo.uid)">
					<image :src="item.cover_url" mode="aspectFill" lazy-load=true></image>
					<view class="book_name">
						{{item.book_name}}
					</view>
				</view>
			</view>
			<view class="button_view">
				<u-row gutter="16">
					<u-col span="6">
						<u-button @click="gotoupdate">查看更多</u-button>
					</u-col>
					<u-col span="6">
						<u-button @click="changenewlist">换一换</u-button>
					</u-col>
				</u-row>
			</view>
		</view>
	</view>
</template>

<script>
	import md5 from '@/md5.js'
	export default {
		data() {
			return {
				swiper_list: [],
				truelist: [],
				newlist: [],
				classiclist: [],
				userInfo: {}
			};
		},
		onLoad: function() {
			this.getlist();
			this.getbanners();
			this.userInfo = this.$store.state;
		},
		methods: {
			getapi() {
				var timestamp = Date.parse(new Date());
				var api_key = "abcde";
				return [timestamp, md5(api_key + timestamp)];
				//返回api_key+时间戳md5加密
			},
			async getlist() {
				var key = await this.getapi();
				uni.request({
					url: 'http://www.liaowang.xyz/app/books/getNewest',
					data: {
						time: key[0],
						token: key[1]
					},
					success: (res) => {
						this.truelist = res.data.newest;
						this.newlist = this.truelist.sort(function() {
							return .5 - Math.random();
						}).slice(0, 4);
						this.classiclist = this.truelist.sort(function() {
							return .5 - Math.random();
						}).slice(0, 6);
					}
				});
			},
			async getbanners() {
				var key = await this.getapi();
				uni.request({
					url: 'http://www.liaowang.xyz/app/tags/getBanners',
					data: {
						time: key[0],
						token: key[1],
						num: 3
					},
					success: (res) => {
						this.swiper_list = res.data.banners;
						console.log(res.data)
					}
				});
			},
			changenewlist() {
				this.newlist = this.truelist.sort(function() {
					return .5 - Math.random();
				}).slice(0, 4);
			},
			changeclassiclist() {
				this.classiclist = this.truelist.sort(function() {
					return .5 - Math.random();
				}).slice(0, 6);
			},
			gotoupdate() {
				uni.navigateTo({
					url: '../updatelist/updatelist'
				})
			},
			gotoclassic() {
				uni.navigateTo({
					url: '../classiclist/classiclist'
				})
			},
			gotohot() {
				uni.navigateTo({
					url: '../hotlist/hotlist'
				})
			},
			gotoclassification() {
				uni.navigateTo({
					url: '../classification/classification'
				})
			},
			gotocomicdetails(id, uid) {
				uni.navigateTo({
					url: '../comicdetails/comicdetails?id=' + id + '&uid=' + uid
				})
			},
			gotosearch() {
				uni.navigateTo({
					url: '../search/search'
				})
			},
			clickswiper(index) {
				console.log(index);
				this.gotocomicdetails(this.swiper_list[index].book_id, this.userInfo.uid)
			}

		}
	}
</script>

<style lang="less" scoped>
	.discover {
		margin-left: 16rpx;
		margin-right: 16rpx;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.search_bar {
		width: 100%;
		margin-top: 4rpx;
	}

	.button_view {
		margin-top: 44rpx;
		margin-right: 1rpx;
	}

	.swiper {
		margin-top: 28rpx;
	}

	.mid-content {
		.title {
			margin-top: 64rpx;

			text {
				font-size: 42rpx;
			}
		}
	}

	.booklist_box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.carton_box_2 {
		margin-top: 25rpx;
		width: 49%;

		image {
			width: 100%;
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

	.carton_box_3 {
		margin-top: 25rpx;
		width: 32%;

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
