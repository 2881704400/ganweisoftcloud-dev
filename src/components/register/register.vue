<template>
	<div class="register">
		<navigation></navigation>
		<formVue></formVue>
		<footerVue></footerVue>
	</div>
</template>

<script>
	import navigation from '../home/navigation/navigation'
	import formVue from '../register/form/form'
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
			formVue,
			footerVue
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.register{
		height: 100%;
		width: 100%;
		background: #F7F7F8;
	}
</style>