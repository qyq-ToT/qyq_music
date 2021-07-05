<template>
	<view class="index">
		<view class="userinfo" :style="{backgroundImage:'url('+ this.bg_url +')'}">
			<view class="head">
				<view class="content">
					<image :src="headIcon_url"></image>
					<view class="nickname">{{nickname}}</view>
				</view>
				<view class="navtoVip">
					<text>开通黑胶VIP</text>
					<uni-icons class="icon" type="arrowright" color="#FFFFFF" size="16"></uni-icons>
				</view>

			</view>
			<view class="navList">
				<view v-for="(item,index) in navList" class="item">
					<image :src="item.icon_url"></image>
					<view>{{item.text}}</view>
				</view>
			</view>
		</view>
		<view class="mineContent">
			<view class="title">
				<view>我的音乐</view>
				<view class="icon">
					<image src="https://s1.ax1x.com/2020/07/30/an1Ioj.png"></image>
					<uni-icons class="icon" type="arrowright" color="#cccccc" size="26"></uni-icons>
				</view>
			</view>
			<swiper display-multiple-items=3>
				<swiper-item class="item">
					<image src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg"></image>
				</swiper-item>
				<swiper-item class="item">
					<image src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg"></image>

				</swiper-item>
				<swiper-item class="item">
					<image src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg"></image>

				</swiper-item>
				<swiper-item class="item">
					<image src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg"></image>

				</swiper-item>
				<swiper-item class="item">
					<image src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg"></image>

				</swiper-item>
			</swiper>
			<view class="historyPlayer">
				<view class="title">
					<view>最近播放</view>
					<view>
						<text>更多</text>
						<uni-icons class="icon" type="arrowright" color="#cccccc" size="26"></uni-icons>
					</view>
				</view>
				<view class="hisPlayerList">
					<view class="item">
						<view class="playerImg">
							<image></image>
							<image src="https://s1.ax1x.com/2020/07/30/anfWct.png" class="icon_play"></image>
						</view>
						<view class="playerInfo">
							全部以播放歌曲 300首
						</view>
					</view>
					<view class="item">
						<view class="playerImg">
							<image></image>
						</view>
						<view class="playerInfo">
							全部以播放歌曲 300首
						</view>
					</view>
				</view>
			</view>
			<view class="playerListContent">
				<view class="playerListTabbar">
					<view class="item_row">
						<view @click="changeTab(index)" v-for="(item,index) in playListTabbar" class="item">
							<text :class="index == tabCurrent?'active':''">{{item.text}}</text>
							<text>{{item.supText}}</text>
						</view>
					</view>
					<image src="https://s1.ax1x.com/2020/07/30/anTup4.png"></image>
				</view>
				<view class="showListRow">
					<view class="cjList">
						<view v-for="(item,index) in mineList" @click="navtoSongs(index)" class="item">
							<view class="left">
								<image :src="item.coverImgUrl"></image>
							</view>
							<view class="right">
								<view class="listName">{{item.name}}</view>
								<view class="listInfo">
									<image src="https://s1.ax1x.com/2020/07/30/aKK48x.png" style="width: 35rpx;height: 35rpx;"></image>
									<view>{{item.trackCount}}首</view>
								</view>
							</view>
						</view>
						<view class="item">
							<view class="left">
								<image src="https://s1.ax1x.com/2020/07/30/aKl6r8.png"></image>
							</view>
							<view class="right">
								<view class="listName">创建歌单</view>
							</view>
						</view>
					</view>
					<view v-show="false" class="scList">
						<view class="item">
							<view class="left">
								<image></image>
							</view>
							<view class="right">
								<view class="listName"></view>
								<view class="listInfo">
									<image></image>
									<view></view>
								</view>
							</view>
						</view>
					</view>
					<view v-show="false" class="gdzs">
						暂时不做
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import swiper from "../../lib/swiper.min.js"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {
			uniIcons
		},
		props: ['headIcon_url', "bg_url", "nickname", "mineList"],
		data() {
			return {
				navList: [{
						id: 1,
						icon_url: "https://s1.ax1x.com/2020/07/30/anuvcD.png",
						text: "本地音乐"
					},
					{
						id: 2,
						icon_url: "https://s1.ax1x.com/2020/07/30/anuqtx.png",
						text: "下载管理"
					},
					{
						id: 3,
						icon_url: "https://s1.ax1x.com/2020/07/30/anuj1O.png",
						text: "我的电台"
					},
					{
						id: 4,
						icon_url: "https://s1.ax1x.com/2020/07/30/anuLh6.png",
						text: "我的收藏"
					},
					{
						id: 5,
						icon_url: "https://s1.ax1x.com/2020/07/30/anuX9K.png",
						text: "关注新歌"
					},
				],
				playListTabbar: [{
						id: 1,
						text: "创建歌单",
						supText: "7"
					},
					{
						id: 2,
						text: "收藏歌单",
						supText: "1"
					},
					{
						id: 3,
						text: "歌单助手",
						supText: "bete"
					}
				],
				tabCurrent: 0
			}
		},
		methods: {
			changeTab(index) {
				this.tabCurrent = index
			},
			navtoSongs(index) {
				console.log("-------------")
				this.$emit('navtoSongs', index);
			}
		}
	}
</script>

<style lang="scss">
	page {
		font-family: "华文楷体";
	}

	.index {
		width: 100%;

		.userinfo {
			position: relative;
			width: 100%;
			height: 660rpx;
			background-image: no-repeat;
			background-position: center 0;
			background-size: cover;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.head {
				// border: 1px solid #007AFF;
				width: 90%;
				height: 240rpx;
				display: flex;
				flex-direction: row;
				text-align: center;
				justify-content: space-between;

				.content {
					display: flex;
					justify-content: center;
					align-items: center;

					image {
						width: 160rpx;
						height: 160rpx;
						border-radius: 50%;
					}

					view {
						margin-left: 60rpx;
						text-align: center;
						color: #FFFFFF;
						font-size: 43rpx;
						font-weight: 600;
					}
				}

				.navtoVip {
					display: flex;
					align-items: center;
					font-size: 22rpx;
					color: #F4F4F4;
					margin-top: 20rpx;
				}
			}

			.navList {
				// border: 1px solid #4CD964;
				width: 90%;
				height: 200rxp;
				display: flex;
				justify-content: space-between;

				.item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					color: #FFFFFF;

					image {
						width: 1.6rem;
						height: 1.6rem;
					}

					view {
						margin: 20rpx 0;
						font-size: 26rpx;
					}
				}

				.item:active {
					color: #ccc;
				}
			}
		}

		.mineContent {
			position: absolute;
			top: 550rpx;
			width: 100%;
			background: #FFFFFF;
			border-radius: 45rpx 45rpx 0 0;
			// border: 1rpx solid red;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-bottom: 120rpx;

			.title {
				display: flex;
				width: 95%;
				justify-content: space-between;
				align-items: center;
				height: 80rpx;

				view {
					display: flex;
					align-items: center;
					font-size: 38rpx;

					image {
						width: 50rpx;
						height: 50rpx;
					}
				}
			}

			swiper {
				height: 320rpx;
				width: 100%;
				margin: 20rpx 0;
				display: flex;

				.item {
					height: 100%;
					width: 240rpx !important;
					display: flex;
					justify-content: center;
					align-items: center;
					margin: 0 10rpx;

					image {
						width: 90%;
						height: 90%;
						border-radius: 15rpx;
					}
				}
			}

			.historyPlayer {
				height: 240rpx;
				width: 95%;
				display: flex;
				flex-direction: column;

				.title {
					display: flex;
					width: 100%;
					justify-content: space-between;
					align-items: center;
					height: 80rpx;

					view {
						display: flex;
						align-items: center;
						font-size: 38rpx;

						image {
							width: 50rpx;
							height: 50rpx;
						}
					}
				}

				.hisPlayerList {
					width: 100%;
					margin: 10rpx 0;
					display: flex;
					justify-content: space-between;

					.item {
						width: 48%;
						height: 105rpx;
						display: flex;

						.playerImg {
							height: 100%;
							width: 140rpx;
							border: 1rpx solid gold;
							position: relative;

							image {
								width: 100%;
								height: 100%;
							}

							.icon_play {
								position: absolute;
								top: 0;
								bottom: 0;
								left: 0;
								right: 0;
								margin: auto;
								width: 50rpx;
								height: 50rpx;
							}
						}

						.playerInfo {
							margin-left: 5rpx;
							width: 220rpx;
							height: 100%;
							border: 1rpx solid green;
							font-size: 24rpx;
							text-align: center;
						}
					}
				}
			}

			.playerListContent {
				width: 98%;

				.playerListTabbar {
					// border: 1rpx solid blue;
					height: 72rpx;
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.item_row {
						display: flex;
						height: 100%;
						// border: 1rpx solid yellow;
						width: 80%;
						flex-direction: row;
						justify-content: space-around;
						align-items: center;

						.item {
							text {
								color: #A9A9A9;
								font-weight: 500;
								font-size: 30rpx;
							}

							text:nth-child(2) {
								font-size: 12rpx;
								margin-left: 5rpx;
							}

							.active {
								color: #000000;
							}
						}

						view {
							font-size: 32rpx;
						}
					}

					image {
						width: 36rpx;
						height: 36rpx;
					}
				}

				.showListRow {
					width: 100%;
					display: flex;
					justify-content: center;

					.cjList {
						display: flex;
						flex-wrap: wrap;
						width: 95%;
						
						.item {
							width: 49%;
							display: flex;
							justify-content: space-evenly;
							margin-bottom: 10rpx;
							.left {

								image {
									width: 120rpx;
									height: 120rpx;
									border-radius: 10rpx;
								}
							}

							.right {
								flex: 1;
								height: 100%;
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								.listName {
									font-size: 26rpx;
									color: #444444;
									display: flex;
									justify-content: flex-start;
									align-items: center;
									margin-left: 15rpx;
									overflow: hidden;
								}

								.listInfo {
									display: flex;
									align-items: center;
									font-size: 26rpx;
									color: #3B4144;

									image {
										padding: 0 15rpx;
									}
								}
							}
						}

						.item:nth-child(2) {}
					}

					.scList {}

					.gdzs {}
				}
			}
		}

	}
</style>
