<template>
	<div class="index">
		<headers :isShowbgColor="isShowBg"></headers>
		<carousel></carousel>
		<card></card>

		<mod></mod>
		<imgbox></imgbox>
		<foSwiper></foSwiper>
		<example></example>

		<sightimg></sightimg>
		<footers></footers>
		<div id="myspot" class="sightspot" v-show="isShowSpot" @click="goAnchor('#sightspotId')" title="回到顶部">
			<img src="../assets/img/up.png" alt="backTop">
		</div>
	</div>
</template>

<script>
	//引入头部组件
	import headers from '@/components/header'
	//引入尾部组件
	import footers from '@/components/footer'
	import carousel from '@/components/home/carousel/carousel'
	import card from '@/components/home/card/card'
	import mod from '@/components/home/mod/mod'
	import imgbox from '@/components/home/box/box'
	import foSwiper from '@/components/home/swiper/footerSwipers'
	import example from '@/components/home/example/example'
	import sightimg from '@/components/sightimg/sightimg'

	export default {
		name: 'index',
		data() {
			return {
				//是否显示纯黑色背景
				isShowBg: false,
				isShowSpot: false
			}
		},
		components: {
			headers,
			footers,
			carousel,
			card,
			imgbox,
			foSwiper,
			example,
			mod,
			sightimg
		},
		mounted() {
			window.addEventListener('scroll', this.handleScroll)
		},
		methods: {
			//监听页面滚动事件
			handleScroll() {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				if(scrollTop>500){
					this.isShowSpot=true;
				}else{
					this.isShowSpot=false;
				}
			},
			//锚点跳转
			goAnchor(selector) {
				$('html,body').animate({
					scrollTop: 0
				}, 400);
			}
		}
	}
</script>

<style scoped>
	.index {
		position: relative;
		height: 100%;
		width: 100%;
		background-color: #fff;
	}
	
	.index-header {
		width: 100%;
		height: 300px;
	}
	
	.sightspot {
		width: 45px;
		height: 45px;
		border-radius: 50%;
		background-color: white;
		border: 1px solid #1AB394;
		position: fixed;
		bottom: 5%;
		right: 5px;
		z-index: 100;
		cursor: pointer;
	}
	
	.sightspot img {
		width: 18px;
		display: block;
		margin: 12px auto;
	}
</style>