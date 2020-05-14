<template>
	<view class="classification">
		<view class="tabs_box">
			<u-tabsleft :list="tags" :is-scroll="false" :current="tag_current" name="tag_name" @change="change_tag" font-size="26"
			 inactive-color="#666666" active-color="#333333" bold="false" show-bar="false"></u-tabsleft>
		</view>
		<view class="tabs_box">
			<u-tabsleft :list="arealist" :is-scroll="false" :current="area_current" name="area_name" @change="change_area"
			 font-size="26" inactive-color="#666666" active-color="#333333" bold="false"></u-tabsleft>
		</view>
		<view class="tabs_box">
			<u-tabsleft :list="endlist" :is-scroll="false" :current="end_current" @change="change_end" font-size="26"
			 inactive-color="#666666" active-color="#333333" old="false"></u-tabsleft>
		</view>
		<view class="booklist">
			<u-empty v-if="booklist.length===0"></u-empty>
			<view class="booklist_box">
				<view class="carton_box" v-for="(item,index) in booklist" v-bind:key="item.id" @click="gotocomicdetails(item.id,userInfo.uid)">
					<image :src="item.cover_url" mode="widthFix"></image>
					<view class="book_name">
						{{item.book_name}}
					</view>
				</view>
			</view>
		</view>
		<u-loadmore bg-color="rgb(255, 255, 255)" :status="loadStatus" @loadmore="getbooklist"></u-loadmore>
	</view>
</template>

<script>
	import md5 from '@/md5.js'
	export default {
		data() {
			return {
				tags: [],
				arealist: [],
				endlist: [{
					name: "全部",
					id: null
				}, {
					name: "连载中",
					id: 0
				}, {
					name: "已完结",
					id: 1
				}, ],
				booklist: [],
				userInfo: {},
				tag_current: 0,
				area_current: 0,
				end_current: 0,
				loadStatus: 'loadmore',
				startlem: 0,
				pageSize: 10,
			};
		},
		onLoad: async function() {
			await this.gettags();
			await this.getarealist();
			this.initbooklist()
			this.userInfo = this.$store.state;
		},
		onShow: function() {
			// this.getbooklist();
		},
		onReachBottom() {
			this.loadStatus = 'loading';
			// 模拟数据加载
			setTimeout(() => {
				this.getbooklist();
				this.loadStatus = 'loadmore';
			}, 1000)
		},
		methods: {
			getapi() {
				var timestamp = Date.parse(new Date());
				var api_key = "abcde";
				return [timestamp, md5(api_key + timestamp)];
				//返回api_key+时间戳md5加密
			},
			async gettags() {
				var key = await this.getapi();
				uni.request({
					url: 'http://www.liaowang.xyz/app/tags/getList',
					data: {
						time: key[0],
						token: key[1]
					},
					success: (res) => {
						this.tags = res.data.tags;
						this.tags.unshift({
							tag_name: "全部"
						});
						this.inittags();
						console.log(this.tags)
					}
				});
			},
			async getarealist() {
				var key = await this.getapi();
				uni.request({
					url: 'http://www.liaowang.xyz/app/tags/getAreaList',
					data: {
						time: key[0],
						token: key[1]
					},
					success: (res) => {
						this.arealist = res.data.areas;
						this.arealist.unshift({
							area_name: "全部",
							id: -1
						});
						console.log(this.arealist)
					}
				});
			},
			async getbooklist() {
				var key = await this.getapi();
				uni.request({
					url: 'http://www.liaowang.xyz/app/tags/getBookList',
					data: {
						time: key[0],
						token: key[1],
						area: this.arealist[this.area_current].id,
						tag: this.tags[this.tag_current].name,
						end: this.endlist[this.end_current].id,
						startItem: 0,
						pageSize: 20
					},
					success: (res) => {
						this.booklist = res.data.books;
						this.startlem = this.startlem + this.pageSize;
						console.log(res.data)
					}
				});
			},
			async initbooklist() {
				var key = await this.getapi();
				uni.request({
					url: 'http://www.liaowang.xyz/app/tags/getBookList',
					data: {
						time: key[0],
						token: key[1],
						area: -1,
						startlem: this.startlem,
						pageSize: this.pageSize
					},
					success: (res) => {
						this.booklist = res.data.books;
					}
				});
			},
			change_tag(index) {
				// if(index===0)
				this.tag_current = index;
				this.getbooklist();
			},
			change_area(index) {
				this.area_current = index;
				this.getbooklist();
			},
			change_end(index) {
				this.end_current = index;
				this.getbooklist();
			},
			gettname(i) {
				return this.tags[i].tag_name;
			},
			async inittags() {
				for (let i = 0; i < this.tags.length; i++) {
					if (i === 0) {
						this.tags[i].name = "";
					} else {
						this.tags[i].name = await this.gettname(i);
					}
				}
			},
			gotocomicdetails(id, uid) {
				uni.navigateTo({
					url: '../comicdetails/comicdetails?id=' + id + '&uid=' + uid
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.classification {
		margin-left: 16rpx;
		margin-right: 16rpx;
		background-color: #fafbfc;
	}

	.tabs_box {
		border-bottom: 3rpx solid #f3f3f3;
	}

	.booklist {
		width: 100%;
		margin-top: 40rpx;
	}
	.booklist_box{
		display: flex;
		flex-wrap:wrap;
		justify-content: start;
	}
	.carton_box {
		width: 32%;
		margin-left: 1%;
		image {
			width: 100%;
			border-radius: 5rpx;
		}

		.book_name {
			font-size: 28rpx;
			line-height: 32rpx;
			color: #181818;
			overflow: hidden;
			height: 64rpx;
		}
	}
</style>
