<template>
	<view class="index">
		<view class="swiperNav" :style="{backgroundImage:'url('+ this.bg_url +')'}">
			<image src="https://s1.ax1x.com/2020/07/30/anTK1J.png"></image>
			<view class="item">
				<view @click="topSlide(index)" v-for="(item,index) in topList" :class="current==index?'active':''">
					{{item}}
				</view>
			</view>
			<image src="https://s1.ax1x.com/2020/07/30/anTMc9.png"></image>
		</view>
		<view class="player">
			<button @click="player">播放</button>
		</view>
		<swiper @change="swiperSlide" :current="current">
			<swiper-item>
				<scroll-view scroll-y="true">
					<index :nickname="nickname" :bg_url="userBgimg_url" :headIcon_url="userHeadIcon_url" @navtoSongs="navtoSongs($event)"
					 :mineList="mineList"></index>
				</scroll-view>
			</swiper-item>
			<swiper-item>2</swiper-item>
			<swiper-item>3</swiper-item>
			<swiper-item>4</swiper-item>
		</swiper>

	</view>
</template>

<script>
	// import swiper from "../../lib/swiper.min.js"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import index from "../../components/index/index.vue"
	const song = uni.createInnerAudioContext();
	export default {
		components: {
			uniIcons,
			index
		},
		data() {
			return {
				// https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg
				bg_url: "http://p1.music.126.net/2zSNIqTcpHL2jIvU6hG0EA==/109951162868128395.jpg",
				topList: ['我的', "发现", "云村", "视频"],
				current: 0,
				userBgimg_url: "",
				userHeadIcon_url: "",
				nickname: "",
				userId: "",
				iLikeList: {},
				mineList: [],
				playerFlag: true
			}
		},
		onLoad() {
			this.getLoginInfo();
			this.getUserPlaylist();
		},
		methods: {
			getLoginInfo() {
				// 获取缓存中用户登录信息
				var userData = uni.getStorageSync("loginInfo")
				// 获取用户头像
				this.userHeadIcon_url = userData.profile.avatarUrl
				//获取用户背景图
				this.userBgimg_url = userData.profile.backgroundUrl
				//获取用户昵称
				this.nickname = userData.profile.nickname
				//获取用户ID
				this.userId = userData.profile.userId
				uni.setStorageSync("nickname", this.nickname)
				uni.setStorageSync("userHeadIcon_url", this.userHeadIcon_url)
			},
			async getUserPlaylist() {
				//登陆后调用此接口 , 传入用户 id, 可以获取用户歌单
				const res = await this.$myRuquest({
					url: "/user/playlist",
					data: {
						"uid": this.userId
					},
				});
				//获得所有的歌单
				let bigList = res.data.playlist
				//第一个为 我喜欢 的歌单
				this.iLikeList = bigList[0];
				//去掉第一个，其他为我收藏的歌单
				res.data.playlist.shift();
				this.mineList = bigList
			},
			topSlide(index) {
				this.current = index
			},
			swiperSlide(e) {
				this.current = e.detail.current
			},
			player() {
				song.src =
					"http://m8.music.126.net/20200731112602/bae49781f6ee3a5e611aee0e7ed29ad9/ymusic/2736/565c/f2fc/eff895aff2b25cbfe769e5f4b9addb81.mp3 "
				if (this.playerFlag) {
					song.play()
				} else {
					song.pause()
					console.log(321)
				}
				this.playerFlag = !this.playerFlag
				console.log(this.playerFlag)
				song.onPlay(function() {
					console.log("播放功能被执行了")
				})
				song.onPause(function() {
					console.log("33333333333")
				})
			},
			async navtoSongs(index) {
				// 通过传入的index来获取歌单的ID
				let songListId = this.mineList[index].id
				// 通过传入的index来获取歌单的封面图片
				let CoverImg_url = this.mineList[index].coverImgUrl
				// 通过传入的index来获取歌单的名称
				let listName = this.mineList[index].name;
				// 通过传入的index来获取歌单的歌曲数量
				let playCount = this.mineList[index].playCount.toString();
				//将需要的数据存入缓存，方便歌单详情页面调用
				uni.setStorageSync("coverImgUrl", CoverImg_url);
				uni.setStorageSync("listName", listName);
				uni.setStorageSync("playCount", playCount);
				//调用获取歌单详情的接口
				const res = await this.$myRuquest({
					url: "/playlist/detail",
					data: {
						"id": songListId
					}
				})
				console.log(res.data.playlist)
				let songIds = [];
				let trackIds = res.data.playlist.trackIds
				//将 trackIds 的ID属性遍历并且存入 songIds数组中
				trackIds.forEach((value, index) => {
					songIds.push(value.id)
				})
				uni.setStorageSync("songIds", songIds)
				//将songIds数组转化为字符串作为参数，去调用获取歌曲详情的方法
				uni.showLoading({
					title:"加载中",
					mask:true,
					complete: () => {
						setTimeout(function () {
						    uni.hideLoading();
						}, 1500);
					}
				})
				this.getSongsDetail(songIds.toString());
			},
			async getSongsDetail(songIds) {
				//通过获取歌单详情结果里的 trackIds 得到所有歌曲的ID，通过ID调用获取歌曲详情的接口
				const res = await this.$myRuquest({
					url: "/song/detail?ids=" + songIds
				});
				console.log(res.data.songs);
				let songsDetail = res.data.songs;
				//将获取的歌曲详情里所需要的内容存入缓存
				uni.setStorageSync("songsDetail", songsDetail);
				uni.navigateTo({
					url:"../playerList/playerList"
				})
			}
		}
	}
</script>

<style lang="scss">
	.swiperNav {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100rpx;
		// border: 1px solid #4CD964;
		display: flex;
		z-index: 999;
		justify-content: space-between;
		align-items: center;
		image {
			width: 50rpx;
			height: 50rpx;
			margin: 0 30rpx;
		}
		opacity: 0.8;
		.item {
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 500rpx;
			color: #FFFFFF;
		}
	}

	.index {
		position: relative;

		swiper {
			width: 100%;
			height: 100vh;

			swiper-item {
				height: 100vh;

				scroll-view {
					height: 100vh;
				}
			}
		}

		.player {
			position: absolute;
			bottom: 0;
			z-index: 999;
			width: 100%;
			height: 120rpx;
			background-color: #2C8DFB;
		}
	}

	.active {
		color: red;
	}
</style>
