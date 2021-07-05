<template>
	<view>
		<view class="flex_d_c main">
			<view class="">
				<image class="bg-img" src="/static/fjskdj.png" mode="widthFix"></image>
			</view>
			<view class="u-m-t-20 fs32 color_3 fw_5">
				<text selectable>加载失败，请刷新重试！</text>
			</view>
			<view class="fs32 fw_5 btn flex_center u-m-t-30" @click="loading">
				重新加载
			</view>
		</view>
	</view>
</template>

<script>
	// import {getCollectList} from '@/api/goods/index.js'
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			async loading(){
				uni.showLoading({
					title:"重新加载中！",
					mask:true,
				})
				
				let res = await  getCollectList()
				uni.hideLoading()
				uni.navigateBack({delta:1})
			}
		}
	}
</script>

<style lang="scss">
	.main{
		width: 100%;
		height: 100vh;
	}
	.bg-img{
		width: 370rpx;
	}
	.btn{
		width: 200rpx;
		height: 80rpx;
		background-color: #333333;
		color: #FAFAFA;
	}
</style>
