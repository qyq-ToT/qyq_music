import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
import { myRequset } from "util/request.js"

Vue.use(uView);
Vue.prototype.$myRuquest = myRequset

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()


// <div class="notice">
// 	<div class="notice_img">
// 		<u-image :src="defaultURL+'/upload/miniapp/sp/jiwuNotic.png'" mode="widthFix"></u-image>
// 	</div>
// 	<div class="laba">
// 		<u-image :src="defaultURL+'/upload/miniapp/sp/tongzhi.png'" mode=""></u-image>
// 	</div>
// 	<swiper class="notice_swiper" :autoplay="true" :interval="2000" :duration="2500" :circular="true">
// 		<swiper-item v-for="(item,index) in noticeList" :key="index">
// 			<text>{{item.title}}</text>
// 		</swiper-item>
// 	</swiper>
// </div>