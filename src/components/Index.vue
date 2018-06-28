<template>
	<div class="index">
		<headers></headers>
		<carousel></carousel>
		<card></card>
		<mod></mod>
		<imgbox></imgbox>
		<foSwiper></foSwiper>
		<example></example>
		<footers></footers>
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

	export default {
		name: 'index',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App'
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
			mod
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
	.index-header{
		width: 100%;
		height: 300px;
	}
</style>