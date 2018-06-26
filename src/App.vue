<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app',
	};
</script>

<style>
	/*@import '../src/style/public.css';
@import '../src/fonts/iconfont.css';
@import '../src/style/transitionStyle.css';
@import '../src/style/scrollbarStyle.css';*/
	/*@import '../src/css/animate.min.css';*/
	/*@import '../src/style/common.scss';
@import '../src/style/mixin.scss';*/
	
	body,
	html {
		width: 100%;
		height: 100%;
	}
	
	#app {
		width: 100%;
		height: 100%;
	}
</style>