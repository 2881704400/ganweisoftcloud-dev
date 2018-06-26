<template>
	<div class="register">
		<navigation></navigation>
		<headVue></headVue>
		<configure></configure>
		<footerVue></footerVue>
	</div>
</template>

<script>
	import navigation from '../home/navigation/navigation'
	import headVue from './head/head'
	import configure from '../server/configure/configure'
	import footerVue from '../footer/footer'
	
	export default {
		name: 'HelloWorld',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		},
		components: {
			navigation,
			headVue,
			configure,
			footerVue
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.register{
		height: 100%;
		width: 100%;
		background-color: #EEF0F4;
		position:relative;
	}
</style>