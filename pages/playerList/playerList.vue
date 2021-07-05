<template>
	<view class="songList" style="height: 100vh;">
		<scroll-view style="height: 100vh;" scroll-y="true">
			<view class="navigation">
				<view class="left">
					<image @click="navBack" src="https://s1.ax1x.com/2020/07/31/aQT4ER.png"></image>
					<view>歌 单</view>
				</view>
				<view class="right">
					<image src="https://s1.ax1x.com/2020/07/30/anTMc9.png"></image>
					<image src="https://s1.ax1x.com/2020/07/31/aQvyCj.png"></image>
				</view>
			</view>
			<view class="head">
				<view class="top">
					<view class="top_left">
						<image :src="coverImgUrl"></image>
						<view class="tlIcon">
							<image src="https://s1.ax1x.com/2020/07/31/al1ME8.png"></image>
							<view>{{playCount}}</view>
						</view>
					</view>
					<view class="top_right">
						<view class="tt">{{listName}}</view>
						<view class="cc">
							<image :src="userHeadIcon_url"></image>
							<view>{{nickname}}</view>
							<uni-icons class="icon" type="arrowright" color="#9BAFCC" size="16"></uni-icons>
						</view>
						<view class="bb">
							<view>编辑信息</view>
							<uni-icons class="icon" type="arrowright" color="#9BAFCC" size="16"></uni-icons>
						</view>
					</view>
				</view>
				<view class="bottom">
					<view class="item" v-for="(item,index) in headNavList">
						<image :src="item.icon_url"></image>
						<view>{{item.title}}</view>
					</view>
				</view>
			</view>
			<view class="content">
				<view v-for="(item,index) in songsDetail" class="content_item" @click="navtoMusicPlayer(index)">
					<view style="margin-left: 1rem;font-size: 34rpx;">{{index+1}}</view>
					<view class="item_row">
						<view class="top">{{item.name}} {{item.alia[0]}}</view>
						<view class="bottom">{{item.ar[0].name}}-{{item.al.name}}</view>
					</view>
					<image src="https://z3.ax1x.com/2021/07/02/Rcu654.png"></image>
					<!-- 定位的视频播放按钮 -->
					<view v-if="false" class="mv">
						<image></image>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				coverImgUrl: "",
				listName: "",
				nickname: "",
				userHeadIcon_url: "",
				playCount: "",
				headNavList: [{
						id: 1,
						icon_url: "https://s1.ax1x.com/2020/07/31/alBkee.png",
						title: "评论"
					},
					{
						id: 2,
						icon_url: "https://s1.ax1x.com/2020/07/31/alBiLD.png",
						title: "分享"
					},
					{
						id: 3,
						icon_url: "https://s1.ax1x.com/2020/07/31/alBPsO.png",
						title: "下载"
					},
					{
						id: 4,
						icon_url: "https://s1.ax1x.com/2020/07/31/alBCQK.png",
						title: "多选"
					}
				],
				songIds: [],
				trackIdNames: [],
				songsDetail: [],
			};
		},
		onShow() {
			console.log("页面加载")
			this.updata();
			
		},
		methods: {
			updata(){
				setTimeout(()=>{
					let coverImgUrl = uni.getStorageSync("coverImgUrl");
					let listName = uni.getStorageSync("listName");
					let nickname = uni.getStorageSync("nickname");
					let userHeadIcon_url = uni.getStorageSync("userHeadIcon_url");
					let playCount = uni.getStorageSync("playCount");
					let songIds = uni.getStorageSync("songIds");
					let songsDetail = uni.getStorageSync("songsDetail");
					
					
					// uni.request({
					// 	url: "http://www.huashengshu.top:3000/song/detail?ids=" + songIds.toString(),
					// 	// url:"http://musicapi.leanapp.cn/song/detail/ids"+"31654479,5137277",
					// 	// 这个在线的不行，无法获取完整的，最上面的是别人的服务器，实在不行换localhost
					// 	success: (res) => {
					// 		console.log(res.data.songs)
					// 		this.songsDetail = res.data.songs
					// 	}
					// })
					
					this.coverImgUrl = coverImgUrl;
					this.listName = listName;
					this.nickname = nickname
					this.userHeadIcon_url = userHeadIcon_url;
					this.playCount = playCount;
					this.songsDetail = songsDetail;
					console.log("刷新")
				},500)
			},
			navBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			navtoMusicPlayer(index){
				uni.navigateTo({
					url:"../musicPlayer/musicPlayer?index="+index
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		font-family: "小篆";
	}

	.songList {
		.navigation {
			position: fixed;
			z-index: 999;
			top: 0;
			// border: 1rpx solid red;
			width: 100%;
			// height: 120rpx;
			padding: 20rpx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #1F538A;
			.left {
				// border: 1rpx solid rosybrown;
				// width: 240rpx;
				height: 100%;
				display: flex;
				align-items: center;
				color: #ffffff;
				font-weight: 600;

				image {
					width: 1.5rem;
					height: 1.5rem;
					padding: 0 20rpx;
				}

				view {
					margin-left: 20rpx;
				}
			}

			.right {
				// border: 1rpx solid black;
				height: 100%;
				display: flex;
				justify-content: space-around;
				align-items: center;

				image:nth-child(1) {
					width: 1.5rem;
					height: 1.5rem;
				}

				image {
					width: 1.5rem;
					height: 1.5rem;
					padding: 0 20rpx
				}
			}
		}

		.head {
			position: relative;
			background: linear-gradient(to bottom, #1F538A 0%, #102541 100%);
			width: 100%;
			// height: 810rpx;
			padding-bottom: 80rpx;
			display: flex;
			align-items: center;
			flex-direction: column;

			.top {
				// border: 1rpx solid violet;
				width: 92%;
				margin-top: 4rem;
				padding: 20rpx 0;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.top_left {
					width: 9rem;
					height: 8rem;
					border: 1rpx solid darkkhaki;
					position: relative;

					image {
						width: 100%;
						height: 100%;
					}

					.tlIcon {
						position: absolute;
						top: 0;
						right: 8rpx;
						width: 100rpx;
						height: 50rpx;
						color: #FFFFFF;
						font-size: 30rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;

						image {
							width: 26rpx;
							height: 25rpx;
						}
					}
				}

				.top_right {
					width: 55%;
					height: 100%;
					// border: 1rpx solid darkkhaki;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: flex-start;

					.tt {
						width: 90%;
						line-height: 60rpx;
						font-size: 42rpx;
						color: #FFFFFF;
						font-size: 30rpx;
						overflow: hidden;
						word-break: keep-all;
						white-space: nowrap;
						text-overflow: ellipsis;
					}

					.cc {
						padding: 15rpx 0;
						display: flex;
						width: 84%;
						justify-content: space-between;
						align-items: center;
						font-size: 36rpx;
						color: #9BAFCC;

						image {
							width: 60rpx;
							height: 60rpx;
							border-radius: 50%;
						}
					}

					.bb {
						display: flex;
						width: 44%;
						justify-content: space-between;
						align-items: center;
						font-size: 30rpx;
						color: #9BAFCC;
					}
				}
			}

			.bottom {
				// border: 1rpx solid #007AFF;
				width: 100%;
				padding: 30rpx 0;
				display: flex;

				.item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					height: 100%;
					width: 280rpx;
					color: #9BAFCC;
					font-size: 30rpx;

					image {
						width: 1.6rem;
						height: 1.6rem;
						padding: 12rpx 0;
					}
				}
			}
		}

		.content {
			// border: 1rpx solid green;
			background: #FFFFFF;
			position: absolute;
			top: 20rem;
			height: auto;
			width: 100%;
			border-radius: 66rpx 66rpx 0 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			color: #888888;
			padding-bottom: 20rpx;
			.content_item {
				// border: 1rpx solid blue;
				// height: 110rpx;
				width: 96%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.item_row {
					// border: 1rpx solid gold;
					display: flex;
					width: 74%;
					height: 100%;
					padding: 15rpx 0;
					align-items: center;
					flex-direction: column;
					border-bottom: 1rpx solid #d7d7d7;
					.top {
						width: 100%;
						color: #000000;
						font-size: 34rpx;
						font-weight: 500;
						overflow: hidden;
						word-break: keep-all;
						white-space: nowrap;
						text-overflow: ellipsis;
						margin-bottom: 5rpx;
					}

					.bottom {
						width: 100%;
						font-size: 26rpx;
						overflow: hidden;
						word-break: keep-all;
						white-space: nowrap;
						text-overflow: ellipsis;
						margin-top: 5rpx;
					}
				}
			}

			image {
				width: 1.5rem;
				height: 1.5rem;
			}

			.mv {
				image {}
			}
		}
	}
</style>
