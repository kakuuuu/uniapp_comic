<template>
	<view class="comicdetails">
		<view class="top_content">
			<image :src="book.cover_url" mode="aspectFill"></image>
		</view>
		<view class="tabs">
			<u-tabs class="u_tabs" :list="list" :is-scroll="false" :current="current" @change="change" font-size="30"
			 inactive-color="#666666" active-color="#f5a623" bar-width="200" bold="false"></u-tabs>
		</view>
		<view v-if="current===0" class="details">
			<view class="detailstop">
				<view class="title">
					<text>作品简介</text>
				</view>
				<view class="introduction">
					<text>{{book.summary}}</text>
				</view>
				<view class="author">
					<text>作者：{{book.author_name}}</text>
				</view>
			</view>
			<view class="detailsbottom">
				<view class="title">
					<text>精彩漫评</text>
					<text class="cnumber">({{comments.length}})</text>
				</view>
				<view class="comment" v-for="item in comments" v-bind:key="item.id">
					<u-row gutter="16">
						<u-col span="2">
							<u-avatar></u-avatar>
						</u-col>
						<u-col span="10">
							<view class="nick_name">{{item.user.nick_name}}</view>
							<view class="comment_content">
								{{item.content}}
							</view>
						</u-col>
					</u-row>

				</view>
			</view>

		</view>
		<view v-if="current===1" class="chapter_list">
			<view class="chapter" v-for="item in chapters" v-bind:key=item.id @click="gotochapterdetail(item.id)">
				<u-row gutter="36">
					<u-col span="5">
						<image :src="book.cover_url" mode="aspectFill"></image>
					</u-col>
					<u-col span="7">
						<view class="chapter_title">
							{{item.chapter_name}}
						</view>
						<view class="update_time">
							{{item.update_time|dateFormat}}
						</view>
					</u-col>
				</u-row>
			</view>
		</view>
		<view class="bottom_nav">
			<u-row gutter="0">
				<u-col span="8">
					<view class="chapter_first">
						{{chapters[0].chapter_name}}
					</view>
				</u-col>
				<u-col span="4">
					<view class="start_button" @click="gotochapterdetail(chapters[0].id)">
						开始阅读
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
				id: null,
				uid: null,
				book: {},
				comments: [],
				chapters: [],
				list: [{
					name: '详情'
				}, {
					name: '选集'
				}],
				current: 0

			};
		},
		onLoad: async function(option) { //option为object类型，会序列化上个页面传递的参数
			this.id = option.id;
			this.uid = option.uid;
			this.getcomicdetails();
			this.getcomments();
			this.getchapters();
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
					success: (res) => {
						this.book = res.data.book;
						console.log(this.book);
					}
				});
			},
			async getcomments() {
				var key = await this.getapi();
				uni.request({
					url: 'http://www.liaowang.xyz/app/books/getComments',
					data: {
						time: key[0],
						token: key[1],
						book_id: this.id
					},
					success: (res) => {
						this.comments = res.data.comments;
						console.log(res.data);
					}
				});
			},
			async getchapters() {
				var key = await this.getapi();
				uni.request({
					url: 'http://www.liaowang.xyz/app/chapters/getList',
					data: {
						time: key[0],
						token: key[1],
						book_id: this.id
					},
					success: (res) => {
						this.chapters = res.data.chapters;
						console.log(res.data);
					}
				});
			},
			gotochapterdetail(id){
				uni.navigateTo({
				    url: '../chapterdetail/chapterdetail?id='+id
				})
			},
			change(index) {
				this.current = index;
			}
		},
		filters: {
			dateFormat(value) {
				const dt = new Date(value)
				const y = dt.getFullYear()
				const m = (dt.getMonth() + 1 + '').padStart(2, '0')
				const d = (dt.getDate() + '').padStart(2, '0')

				const hh = (dt.getHours() + '').padStart(2, '0')
				const mm = (dt.getMinutes() + '').padStart(2, '0')
				const ss = (dt.getSeconds() + '').padStart(2, '0')

				return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
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

	.tabs {
		.u_tabs {
			border-bottom: 2rpx #e6e6e6 solid;
		}
	}

	.details {
		padding-left: 30rpx;
		padding-right: 30rpx;
		font-weight: bold;
		.introduction {
			font-size: 26rpx;
		}
		
		.author {
			font-size: 26rpx;
			margin-bottom: 28rpx;
		}
		
		view {
			margin-top: 28rpx;
		}
		.detailstop {
			border-bottom: 7rpx soild #f7f9fa;
		}
		.title {
			font-size: 30rpx;
		
			.cnumber {
				font-size: 21rpx;
				color: #999999;
				margin-left: 12rpx;
			}
		}
		
		

		.detailsbottom {
			background-color: #ffffff;
			border-top: 7rpx soild #A0CFFF;
			.comment {
				font-size: 26rpx;
				border-bottom: 2rpx #e6e6e6 soild;

				.nick_name {
					margin-top: 8rpx;
					color: #666666;
				}

				.comment_content {
					margin-top: 28rpx;
					color: #555555;
				}
			}
		}

		
	}

	.chapter_list {
		padding-left: 30rpx;
		padding-right: 30rpx;
		font-weight: bold;
		.chapter {
			margin-top: 30rpx;

			image {
				height: 140rpx;
				width: 100%;
			}

			.chapter_title {
				font-size: 29rpx;
			}

			.update_time {
				margin-top: 82rpx;
				font-size: 17rpx;
				font-weight: normal;
				color: #9d9d9d;
			}
		}
	}

	.bottom_nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 97rpx;

		.chapter_first {
			height: 97rpx;
			line-height: 97rpx;
			text-align: start;
			background-color: #f7f9fa;
			color: #666666;
			font-size: 28rpx;
			border-top: #e6e6e6 soild 2rpx;
			padding-left: 30rpx;
		}

		.start_button {
			height: 97rpx;
			font-weight: bold;
			line-height: 97rpx;
			text-align: center;
			background-color: #fde23d;
			font-size: 30rpx;
		}
	}
</style>
