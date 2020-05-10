<template>
	<view class="comicdetails">
		<view class="top_content">
			<image :src="book.cover_url" mode="aspectFill"></image>
		</view>
		<view class="tabs">
			<u-tabs class="u_tabs" :list="list" :is-scroll="false" :current="current" @change="change" font-size="30" inactive-color="#666666" active-color="#f5a623" bar-width="200" bold="false"></u-tabs>
		</view>
		<view v-if="current===0" class="">0</view>
		<view v-if="current===1" class="">1</view>
	</view>
</template>

<script>
	import md5 from '@/md5.js'
	export default {
		data() {
			return {
				id: null,
				uid: null,
				book: {},
				list: [{
					name: '详情'
				}, {
					name: '选集'
				}],
				current: 0
			};
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.id = option.id;
			this.uid = option.uid;
			this.getcomicdetails()

		},
		methods: {
			getapi() {
				var timestamp = Date.parse(new Date());
				var api_key = "abcde";
				return [timestamp, md5(api_key + timestamp)];
				//返回api_key+时间戳md5加密
			},
			async getcomicdetails() {
				var key = await this.getapi();
				uni.request({
					url: 'http://www.liaowang.xyz/app/books/detail',
					data: {
						time: key[0],
						token: key[1],
						id: this.id,
						uid: this.uid
					},
					header: {
						'custom-header': 'hello' //自定义请求头信息
					},
					success: (res) => {
						this.book = res.data.book;
						console.log(this.book);
					}
				});
			},
			change(index) {
				this.current = index;
				console.log(this.current);
			}
		}
	}
</script>

<style lang="less" scoped>
	.top_content {
		width: 100%;

		image {
			width: 100%;
		}
	}
	.tabs{
		.u_tabs{
			border-bottom: 2rpx #e6e6e6 solid;
		}
	}
</style>
