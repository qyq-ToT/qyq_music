const BASE_URL = "http://music.eleuu.com";
// const BASE_URL = "http://localhost:3000";
// const BASE_URL = "http://musicapi.leanapp.cn"

export const myRequset = (options)=>{
	return new Promise((resovle,reject)=>{
		uni.request({
			url:BASE_URL+options.url,
			method:options.method || 'GET',
			data:options.data || {},
			success: (res)=>{
				resovle(res);
			},
			fail: (err) => {
				uni.showToast({
					title:"请求接口失败"
				})
				// uni.navigateTo({
				// 	url: '/pages/404/404'
				// })
				reject(res)
			}
		})
	})
}