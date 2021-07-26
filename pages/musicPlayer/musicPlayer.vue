<template>
	<view class="musicPlayRow">
		<view class="navHead">
			<view class="left">
				<image @click="navBack()" src="https://s1.ax1x.com/2020/07/31/aQT4ER.png"></image>
				<view class="titi">
					<view class="top">
						<div>VIP</div>
						<div class="text">{{songName}}</div>
					</view>
					<view class="bottom">
						<div class="text">{{singer}}</div>
						<image src="https://t1.picb.cc/uploads/2020/09/16/tPxWO8.png"></image>
					</view>
				</view>
			</view>
			<view class="right">
				<image src="https://t1.picb.cc/uploads/2020/09/16/tPxO6R.png"></image>
			</view>
		</view> 
		<!-- :class="playFlag?'xuanzhuan':''" :class="dhFlag?'':'pause'" -->
		<view class="content" :class="{pause:!playFlag}">
			<u-image width="100%" height="100%" border-radius="50%" :src="pic_url"></u-image>
		</view>
		<view class="footer">
			<view class="top">

				<image src="https://t1.picb.cc/uploads/2020/09/15/tPBE4F.png"></image>
				<image src="https://t1.picb.cc/uploads/2020/09/15/tPBsFM.png"></image>
				<image src="https://t1.picb.cc/uploads/2020/09/15/tPBxhs.png"></image>
				<image src="https://t1.picb.cc/uploads/2020/09/15/tPBFKN.png"></image>
				<image src="https://t1.picb.cc/uploads/2020/09/15/tPBSJj.png"></image>
			</view>

			<!-- 
			//暂停
			https://t1.picb.cc/uploads/2020/09/15/tPBRle.png
			//列表循环
			https://t1.picb.cc/uploads/2020/09/15/tPBSJj.png
			//单曲循环
			https://t1.picb.cc/uploads/2020/09/15/tPBFKN.png
			//随机播放
			https://t1.picb.cc/uploads/2020/09/15/tPBTL7.png -->
			<slider style="width: 95vw;" activeColor="#F29100" block-size="14" :value="playDuration/duration*100" @change="sliderChange" step="1" />
			<!-- <u-line-progress style="width: 94% !important;" :height="8" :show-percent="false" inactive-color="#ffffff" 
			class="line" active-color="#05ffe8" :percent="playDuration/duration*100"></u-line-progress> -->
			<view class="center">
				<span>{{playDuration | timerGsh}}</span> <span>{{duration | timerGsh}}</span>
			</view>
			<view class="bottom">

				<image src="https://t1.picb.cc/uploads/2020/09/15/tPBUAT.png"></image>
				<image @click="lastSong()" src="https://z3.ax1x.com/2021/07/02/RcGy9O.png"></image>
				<image class="pfzt" v-show="!playFlag" @click="pauseSong()" :src="playSrc"></image>
				<image class="pfzt" v-show="playFlag" @click="pauseSong()" :src="ztSrc"></image>
				<image @click="nextSong()" src="https://z3.ax1x.com/2021/07/02/RcGdBR.png"></image>
				<image src="https://z3.ax1x.com/2021/07/02/RcGRud.png"></image>

			</view>
		</view>
	</view>
</template>

<script>
	const innerAudioContext = uni.createInnerAudioContext();
	export default {
		
		data() {
			return {
				songsDetail: [],
				// 歌曲地址
				song_url: "",
				songName: "",
				pic_url: "",
				singer: "",
				playSrc:"https://z3.ax1x.com/2021/07/02/RcG78S.png",
				ztSrc:"https://z3.ax1x.com/2021/07/02/RcJnPK.png",
				//当前歌曲于数组的索引
				songIndex:0,
				//当前音乐播放状态
				playFlag:false,
				//当前音乐时长
				duration:"00:00",
				//播放时长
				playDuration:0,
				timer:null
			}
		},
		onLoad(option) {
			console.log(option.index);
			this.songIndex = option.index;
			this.getAllList()
			let thisSongID = this.songsDetail[this.songIndex].id;
			this.getSongUrl(thisSongID);
			this.getSongInfo(thisSongID);
		},
		filters:{
			timerGsh:function(val){
				let duration = Math.round(val)
				let minute = 0
				let second = 0
				// console.log(duration,"音频时长")
				let timer = null
				while(duration>60){
					minute++,
					duration = duration - 60
				}
				if(minute<10){
					minute = "0"+minute
				}
				second = duration
				if(second<10){
					second = "0"+second
				}
				timer = minute + ":" + second
				return timer
			}
		},
		methods: {
			navBack() {
				uni.navigateBack({
					delta: 1
				})
				innerAudioContext.destroy();
			},
			getAllList() {
				let songsDetail = uni.getStorageSync("songsDetail");
				this.songsDetail = songsDetail;
			},
			async getSongUrl(id) {
				//通过获取歌曲id调用获取歌曲url的接口
				console.log(id)
				// let url_id = this.thisSong.id
				const res = await this.$myRuquest({
					url: "/song/url?id=" + id
				});
				console.log(res.data.data[0].url)
				let song_url = res.data.data[0].url
				this.song_url = song_url
				this.playerMusic(song_url);
			},
			async getSongInfo(id) {
				//通过获取歌曲id调用获取歌曲url的接口
				console.log(id)
				// http://www.huashengshu.top:3000/song/detail?ids=347230
				const res = await this.$myRuquest({
					url: "/song/detail?ids=" + id
				});
				console.log(res.data.songs[0])
				let songName = res.data.songs[0].name
				let pic_url = res.data.songs[0].al.picUrl
				let singer = res.data.songs[0].ar[0].name
				this.songName = songName;
				this.pic_url = pic_url;
				this.singer = singer;
			},
			playerMusic(song_url) {
				
				innerAudioContext.autoplay = true;
				innerAudioContext.src = song_url;
				innerAudioContext.onCanplay(()=>{
					this.duration = innerAudioContext.duration
				})
				innerAudioContext.onPlay(() => {
					console.log('开始播放');
					this.playFlag = true
					this.playCount()
				});
				innerAudioContext.onEnded(()=>{
					this.nextSong();
				})
				innerAudioContext.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
				});
				innerAudioContext.play()
				
			},
			//音乐暂停方法
			pauseSong(){
				console.log(this.playFlag,"进入方法时的FLAG")
				if(this.playFlag){
					innerAudioContext.pause();
					this.playPause()
				}else{
					innerAudioContext.play();
					console.log("继续播放")
				}
				this.playFlag = !this.playFlag;
				this.dhFlag  = this.playFlag
				console.log(this.playFlag)
			},
			// 播放上一首音乐
			lastSong(){
				this.playPause()
				this.playDuration = 0
				console.log("上一首");
				console.log(this.songIndex,"当前歌单数组索引");
				if(this.songIndex == 0){
					this.songIndex = this.songsDetail.length-1;
				}else{
					this.songIndex = parseInt(this.songIndex) - 1;
				}
				let thisSongID = this.songsDetail[this.songIndex].id;
				this.getSongUrl(thisSongID);
				this.getSongInfo(thisSongID);
			},
			// 播放下一首音乐
			nextSong(){
				this.playPause()
				this.playDuration = 0
				console.log("下一首");
				
				if(this.songIndex == this.songsDetail.length-1){
					this.songIndex = 0;
				}else{
					this.songIndex = parseInt(this.songIndex) + 1;
				}
				console.log(this.songIndex,"当前歌单数组索引");
				let thisSongID = this.songsDetail[this.songIndex].id;
				this.getSongUrl(thisSongID);
				this.getSongInfo(thisSongID);
			},
			//音乐播放计算
			playCount(){
				this.timer = setInterval(()=>{
					this.playDuration++
				},1000)
			},
			//音乐播放计算暂停
			playPause(){
				clearInterval(this.timer)
				this.timer = null
			},
			//进度条滑动
			sliderChange(e){
				let bfb = e.detail.value*0.01
				this.playDuration = this.duration * bfb
				console.log(this.playDuration,'移到到的秒数')
				innerAudioContext.currentTime = this.playDuration
			}
		}
	}
</script>

<style lang="scss">
	*{
		font-family: "思源黑体";
	}
	.musicPlayRow {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		background: url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-358d30ce3efa9beec0ef51e9aa65fdc6_hd.gif&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627809488&t=84edab1efc028a9c0b6399941bbebea2');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		// filter: (2px);
		.navHead {
			display: flex;
			// border: 1px solid #007AFF;
			width: 100%;
			height: 7%;
			padding: 10rpx 0;
			align-items: center;
			justify-content: space-between;

			.left {
				width: 40%;
				height: 100%;
				display: flex;
				align-items: center;
				margin: 15px;
				// border: 1px solid #3F536E;

				image {
					width: 1.5rem;
					height: 1.5rem;
				}

				.titi {
					width: 60%;
					height: 100%;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					justify-content: space-between;

					.top {
						display: flex;
						// width: calc(100vh*0.5);
						align-items: center;
						color: #FFFFFF;
						font-size: 19px;
						image {
							width: 1.5rem;
							height: 1.5rem;
						}
						.text{
							overflow: hidden;
							word-break: keep-all;
							white-space: nowrap;
							text-overflow: ellipsis ;
						}
						div:nth-child(1) {
							font-size: 12px;
							border: 1px solid #FFFFFF;
							border-radius: 2px;
							padding: 0 5px;
							margin: 0 10px;
							font-weight: 500;
							display: flex;
							justify-content: center;
							align-items: center;
						}
					}

					.bottom {
						display: flex;
						color: #EBEBEB;
						font-size: 12px;
						display: flex;
						align-items: center;
						margin-left: 10px;
						.text{
							overflow: hidden;
							word-break: keep-all;
							white-space: nowrap;
							text-overflow: ellipsis ;
						}
						image {
							width: 12px;
							height: 12px;
							margin: 0 5px;
						}

					}
				}
			}

			.right {
				width: 26px;
				height: 26px;
				margin: 0 10px;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.content {
			margin-bottom: 120px;
			// border: 1px solid gold;
			width: 260px;
			height: 260px;
			border-radius: 50%;
			box-shadow: 0 0 8rpx 6rpx #f6f6f6;
			-webkit-animation-fill-mode:forwards;
			animation: xuanzhuan 20s linear infinite;
			image {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
		.pause{
		    -webkit-animation-play-state: paused;
		}
		.footer {
			border: 1px solid #999999;
			width: 100%;
			height: 24%;
			border-radius: 20rpx 20rpx 0 0;
			box-shadow: 0 -4rpx 8rpx 0rpx #CCCCCC;
			background: url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201608%2F05%2F20160805114457_fdTSA.thumb.700_0.gif&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627810560&t=5837fac1873e781733c483625817ab33');
			// background-size: 100% 100%;
			background-repeat: no-repeat;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			.top {
				// border: 1px solid #DD524D;
				width: 95%;
				height: 35%;
				display: flex;
				align-items: center;
				justify-content: space-around;

				image {
					width: 22px;
					height: 22px;
				}

				image:nth-child(2) {
					width: 27px;
					height: 27px;
				}

				image:nth-child(3) {
					width: 28px;
					height: 28px;
				}
			}

			.center {
				// border: 1px solid #DD524D;
				width: 95%;
				height: 15%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #FFFFFF;
				font-size: 26rpx;
			}

			.bottom {
				// border: 1px solid #DD524D;
				margin-bottom: 10rpx;
				width: 95%;
				height: 30%;
				border-radius: 10rpx;
				display: flex;
				align-items: center;
				justify-content: space-around;
				
				image {
					width: 2rem;
					height: 2rem;
				}

				.pfzt {
					width: 3rem;
					height: 3rem;
				}
			}
		}

		image {
			width: 15px;
			height: 15px;
		}
	}
	@keyframes xuanzhuan{
		0% {
		    transform: rotateZ(0deg);
		}
		100% {
		    transform: rotateZ(360deg);
		}
	}
	.uni-slider-handle{
		width: 14px !important;
		height: 14px !important;
		margin-top: -7px !important;
		margin-left: -7px !important;
	}
</style>
