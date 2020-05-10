<template>
	<view class="upadelist">
		<u-empty v-if="classiclist.length===0"></u-empty>
		<view class="carton_box" v-for="(item,index) in classiclist" v-bind:key="item.id">
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
			
			
		</view>
	</view>
</template>

<script>
	import md5 from '@/md5.js'
	export default {
		data() {
			return {
				classiclist: [],
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
					url: 'http://www.liaowang.xyz/app/books/getEnds',
					data: {
						time: key[0],
						token: key[1]
					},
					header: {
						'custom-header': 'hello' //自定义请求头信息
					},
					success: (res) => {
						this.classiclist = res.data.newest;
						console.log(this.classiclist)
					}
				});
			}
		},
		onLoad: function() {
			this.getlist()
		}
	}
</script>

<style lang="less" scoped>
	.carton_box {
		border-bottom: 3rpx solid #e6e6e6;
		background-color: #f7f9fa;
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
		.author_box{
			font-size: 32rpx;
			line-height: 32rpx;
			color: #999999;
			overflow: hidden;
			height: 64rpx;
		}
	}
</style>
