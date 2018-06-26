<style scoped>
	.login {
		width: 100%;
		height: 100%;
	}
</style>

<template>
	<div class="login">
		<navigation></navigation>
		<loginForm></loginForm>
		<footerVue></footerVue>
	</div>
</template>

<script>
	import navigation from '../home/navigation/navigation'
	import loginForm from './loginForm/loginForm'
	import footerVue from '../footer/footer'

	export default {
		name: 'login',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		},
		components: {
			navigation,
			footerVue,
			loginForm
		}
	}
</script>