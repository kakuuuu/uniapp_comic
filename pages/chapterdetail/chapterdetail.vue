<template>
	<view class="chapterdetail">
		<view class="swiper" v-if="show_swiper===true">
			<u-swiper :list="chapter.photos" mode="number" height="1200" name="img_url" autoplay="false" img-mode="aspectFit" @click="show=true"></u-swiper>
		</view>
		<view v-if="show_swiper===false" class="photo" v-for="item in chapter.photos" v-bind:key=item.id @click="show=true">
			<image :src="item.img_url" mode="widthFix" lazy-load=true>
			</image>
		</view>
		<view class="bottom_nav">
			<view>
				<u-button :disabled="chapter.prev?false:true" @click="gotochapterdetail(chapter.prev)">
					<u-icon name="arrow-left"></u-icon>上一篇
				</u-button>
			</view>
			<view>
				<u-button :disabled="chapter.next?false:true" @click="gotochapterdetail(chapter.next)">下一篇<u-icon name="arrow-right"></u-icon>
				</u-button>
			</view>
		</view>
		<u-popup v-model="show" length="84">
			<view class="popup">
				<view class="btn_group">
					<view>
						<u-icon name="list" color="#f7f9fa" size="42" @click="changeshowswiper(!show_swiper)"></u-icon>
					</view>
					<view>
						<u-icon name="arrow-up" size="42" color="#f7f9fa" @click="gotochapterdetail(chapter.prev)"></u-icon>
					</view>
					<view>
						<u-icon name="arrow-down" size="42" color="#f7f9fa" @click="gotochapterdetail(chapter.next)"></u-icon>
					</view>			
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import md5 from '@/md5.js'
	import {
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				id: null,
				chapter: null,
				show_swiper: false,
				show:false
			};
		},
		onLoad: async function(option) { //option为object类型，会序列化上个页面传递的参数
			this.id = option.id;
			this.show_swiper=this.$store.state.show_swiper;
			this.getchapterdetail()
		},
		methods: {
			...mapMutations(['change_showswiper']),
			getapi() {
				var timestamp = Date.parse(new Date());
				var api_key = this.api_key;
				return [timestamp, md5(api_key + timestamp)];
				//返回api_key+时间戳md5加密
			},
			async getchapterdetail() {
				var key = await this.getapi();
				uni.request({
					url: this.url_config+'app/chapters/detail',
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
			gotochapterdetail(id) {
				uni.redirectTo({
					url: '../chapterdetail/chapterdetail?id=' + id
				})
			},
			changeshowswiper(isshow){
				this.show_swiper=isshow;
				this.change_showswiper(isshow);
			}
		}
	}
</script>

<style lang="less">
	.swiper {
		height: 100%;
	}

	.photo {
		image {
			width: 100%;
		}
	}

	.bottom_nav {
		padding: 28rpx;
		display: flex;
		justify-content: space-between;

		view {
			width: 48%;
		}
	}
	.popup{
		height: 100%;
		background-color: #333333;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.btn_group{
		view{
			margin-bottom: 32rpx;
		}
	}
</style>
