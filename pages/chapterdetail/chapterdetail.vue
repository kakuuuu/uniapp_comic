<template>
	<view class="chapterdetail">
		<view class="photo" v-for="item in chapter.photos" v-bind:key=item.id>
			<image :src="item.img_url" mode="widthFix" lazy-load="true">
			</image>
		</view>
		<view class="bottom_nav">
			<view>
				<u-button :disabled="chapter.prev?false:true" @click="gotochapterdetail(chapter.prev)"><u-icon name="arrow-left"></u-icon>上一篇</u-button>
			</view>
			<view>
				<u-button :disabled="chapter.next?false:true" @click="gotochapterdetail(chapter.next)">下一篇<u-icon name="arrow-right"></u-icon></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import md5 from '@/md5.js'
	export default {
		data() {
			return {
				id: null,
				chapter: null,
			};
		},
		onLoad: async function(option) { //option为object类型，会序列化上个页面传递的参数
			this.id = option.id;
			this.getchapterdetail()
		},
		methods: {
			getapi() {
				var timestamp = Date.parse(new Date());
				var api_key = "abcde";
				return [timestamp, md5(api_key + timestamp)];
				//返回api_key+时间戳md5加密
			},
			async getchapterdetail() {
				var key = await this.getapi();
				uni.request({
					url: 'http://www.liaowang.xyz/app/chapters/detail',
					data: {
						time: key[0],
						token: key[1],
						id: this.id,
					},
					success: (res) => {
						this.chapter = res.data.chapter;
						console.log(res.data);
					}
				});
			},
			gotochapterdetail(id){
				uni.redirectTo({
				    url: '../chapterdetail/chapterdetail?id='+id
				})
			},
		}
	}
</script>

<style lang="less">
	.photo {
		image {
			width: 100%;
		}
	}
	.bottom_nav{
		padding: 28rpx;
		display: flex;
		justify-content: space-between;
		view{
			width: 48%;
		}
	}
</style>
