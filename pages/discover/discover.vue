<template>
	<view class="discover">
		<view class="top-content">
			<u-search placeholder="搜索作品名" :clearabled="true" :show-action="false" bg-color="#f7f9fa"></u-search>
			<u-swiper :list="swiper_list" mode="rect"></u-swiper>
			<u-row gutter="16">
				<view class="button_view">
					<u-col span="6">
						<u-button>
							<u-icon name="grid"></u-icon>漫画分类<u-icon name="arrow-right"></u-icon>
						</u-button>
					</u-col>
					<u-col span="6">
						<u-button>
							<u-icon name="bookmark"></u-icon>热门排行<u-icon name="arrow-right"></u-icon>
						</u-button>
					</u-col>
				</view>
			</u-row>
		</view>
		<view class="mid-content">
			<u-row gutter="16">
				<u-col span="12">
					<view class="title"><text>经典必看</text></view>
				</u-col>
				<u-col span="4" v-for="(item,index) in classiclist" v-bind:key="item.id">
					<view class="carton_box" @click="gotocomicdetails(item.id,2)">
						<image :src="item.cover_url" mode="widthFix"></image>
						<view class="book_name">
							{{item.book_name}}
						</view>
					</view>
				</u-col>
			</u-row>
			<u-row gutter="16">
				<view class="button_view">
					<u-col span="6">
						<u-button @click="gotoclassic">查看更多</u-button>
					</u-col>
					<u-col span="6">
						<u-button @click="changeclassiclist">换一换</u-button>
					</u-col>
				</view>
			</u-row>
			<u-row gutter="16">
				<u-col span="12">
					<view class="title"><text>今日更新</text></view>
				</u-col>
				<u-col span="6" v-for="(item,index) in newlist" v-bind:key="item.id">
					<view class="carton_box" @click="gotocomicdetails(item.id,2)">
						<image :src="item.cover_url" mode="widthFix"></image>
						<view class="book_name">
							{{item.book_name}}
						</view>
					</view>
				</u-col>
			</u-row>
			<u-row gutter="16">
				<view class="button_view">
					<u-col span="6">
						<u-button @click="gotoupdate">查看更多</u-button>
					</u-col>
					<u-col span="6">
						<u-button @click="changenewlist">换一换</u-button>
					</u-col>
				</view>
			</u-row>
		</view>
	</view>
</template>

<script>
	import md5 from '@/md5.js'
	export default {
		data() {
			return {
				swiper_list: [{
						image: 'https://hbimg.huabanimg.com/551df779fe9e2a06d12d3abb289793391e8c3a2929b7b-EUhxjx_fw658/format/webp'
					},
					{
						image: 'https://hbimg.huabanimg.com/a446bc258926bebed3c98daecfb54365a88e622a1dba8f-QFhbKV_fw658/format/webp'
					},
					{
						image: 'https://hbimg.huabanimg.com/260be1f68cac56497f7a14272d32a1a2af584eb81c6e5-96Z8bZ_fw658/format/webp'
					}
				],
				truelist: [],
				newlist: [],
				classiclist: []
			};
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
					url: 'http://www.liaowang.xyz/app/books/getNewest', //仅为示例，并非真实接口地址。
					data: {
						time: key[0],
						token: key[1]
					},
					header: {
						'custom-header': 'hello' //自定义请求头信息
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
			changenewlist() {
				this.newlist = this.truelist.sort(function() {
					return .5 - Math.random();
				}).slice(0, 4);
			},
			changeclassiclist(){
				this.classiclist = this.truelist.sort(function() {
					return .5 - Math.random();
				}).slice(0, 6);
			},
			gotoupdate(){
				
				uni.navigateTo({
				    url: '../updatelist/updatelist'
				})
			},
			gotoclassic(){
				uni.navigateTo({
				    url: '../classiclist/classiclist'
				})
			},
			gotocomicdetails(id,uid){
				uni.navigateTo({
				    url: '../comicdetails/comicdetails?id='+id+'&uid='+uid
				})
			}

		},
		onLoad: function() {
			this.getlist()
		}
	}
</script>

<style lang="less" scoped>
	.discover {
		margin-left: 24rpx;
		margin-right: 24rpx;
	}

	.button_view {
		margin-top: 64rpx;
	}

	.mid-content {
		.title {
			margin-top: 64rpx;

			text {
				font-size: 42rpx;
			}
		}
	}

	.carton_box {

		// width: 33.3%;
		// height: 400rpx;
		margin-top: 32rpx;

		image {
			width: 100%;
		}

		.book_name {
			font-size: 40rpx;
			line-height: 40rpx;
			overflow: hidden;
			height: 80rpx;
		}
	}
</style>
