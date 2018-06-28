<template>
	<div class="index">
		<headers></headers>
		<carousel></carousel>
		<card></card>
		<imgbox></imgbox>
		<steps></steps>
		<footers></footers>
	</div>
</template>

<script>
	//引入头部组件
	import headers from '@/components/header'
	//引入尾部组件
	import footers from '@/components/footer'
	import navigation from './home/navigation/navigation'
	import carousel from './home/carousel/carousel'
	import card from './home/card/card'
	import imgbox from './home/box/box'
	import footer from './footer/footer'
	import steps from './home/steps/steps'

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
			navigation,
			carousel,
			card,
			imgbox,
			footer,
			steps
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