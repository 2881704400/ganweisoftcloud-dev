<template>
	<div class="layout">
		<!--<loadding></loadding>-->
		<navigation></navigation>
		<carousel></carousel>
		<card></card>
		<imgbox></imgbox>
		<steps></steps>
		<footerVue></footerVue>
	</div>
</template>

<script>
	import navigation from './navigation/navigation'
	import carousel from './carousel/carousel'
	import card from './card/card'
	import imgbox from './box/box'
	import footer from './footer/footer'
	import steps from './steps/steps'
	import footerVue from '../footer/footer'
	import loadding from '../loading'
	
	export default {
		name: 'home',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		},
		components:{
			navigation,
			carousel,
			card,
			imgbox,
			footer,
			steps,
			footerVue,
			loadding
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.layout {
		/*border: 1px solid #f00;*/
		width: 100%;
		display: inline-block;
	}
	
	
</style>