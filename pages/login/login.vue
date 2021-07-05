<template>
	<view class="login">
		<view class="lgIcon">
			<image src="https://s1.ax1x.com/2020/07/29/aZTAK0.png"></image>
		</view>
		<view class="inputRow">
			<view class="titT">天 猫 提 供 验 证 服 务</view>
			<input v-model="phone" type="number" placeholder="输入手机号" />
			<input v-model="pwd" type="password" placeholder="密码" />
			<button @click="login()">立 即 登 录</button>
		</view>
		<view class="iconList">
			<view class="item">
				<!-- <image></image> -->
			</view>
		</view>
		<view class="infoB">
			<evan-checkbox class="radio" label="pink" v-model="checked">
				<text>同意</text>
			</evan-checkbox>
			<view>《用户协议》《隐私政策》《天翼账号服务协议》</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: "",
				pwd: "",
				checked: true
			};
		},
		methods: {
			async navtoIndex() {
				const res = await this.$myRuquest({
					url: "/login/cellphone",
					data: {
						"phone": this.phone,
						"password": this.pwd
					}
				});
				console.log(res,"登陆");
				if(res.data.code==200){
					uni.showToast({
						title:'登陆成功',
						icon:"success",
						success: () => {
							uni.setStorageSync("loginInfo", res.data);
							uni.navigateTo({
								url: "../index/index"
							})
						}
					})
				}else{
					uni.showToast({
						title:res.data.msg,
						icon:"none"
					})
				}
				
			},
			login(){
				let myreg= /^[1][3,4,5,7,8,9][0-9]{9}$/;
				if(this.phone==""){
					uni.showToast({
						title:"请输入手机号码",
						icon:"none"
					})
				}else if(!myreg.test(this.phone)){
					uni.showToast({
						title:"请填写正确的手机号码",
						icon:"none"
					})
				}else if(this.pwd==""){
					uni.showToast({
						title:"密码不能为空",
						icon:"none"
					})
				}else{
					this.navtoIndex()
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #DC2C1D;
	}

	.login {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		height: 100vh;

		.lgIcon {
			width: 6rem;
			height: 6rem;
			background: #F12923;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 70%;
				height: 70%;
			}
		}

		.inputRow {
			width: 80%;
			height: 580rpx;
			// border: 3rpx solid #007AFF;
			display: flex;
			flex-direction: column;
			align-items: center;

			.titT {
				width: 50%;
				font-size: 26rpx;
				color: #FFFFFF;
				text-align: center;
				font-weight: 200;
			}

			input {
				border: 1rpx solid #FFFFFF;
				width: 100%;
				height: 4rem;
				border-radius: 60rpx;
				margin: 20rpx 0;
				text-indent: 2em;
				color: #FFFFFF;
				font-size: 42rpx;
			}

			button {
				border: 1rpx solid #FFFFFF;
				width: 100%;
				height: 4rem;
				line-height: 4rem;
				border-radius: 60rpx;
				margin: 20rpx 0;
				text-align: center;
				color: #E0807D;
				font-size: 42rpx;
				font-weight: 600;
			}
		}

		.iconList {
			// border: 2px solid #4CD964;
			width: 80%;
			height: 120rpx;
		}

		.infoB {
			// border: 2px solid #4CD964;
			width: 90%;
			// height: 90rpx;
			color: #FFFFFF;
			font-size: 24rpx;
			display: flex;
			flex-wrap: wrap;
			// flex-direction: column;
			.radio{
				width: 20%;
				color: #FFFFFF;
			}
		}
	}
</style>
