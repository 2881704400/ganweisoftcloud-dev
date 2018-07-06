<template>
	<div class="sightimg" :hover="updateBgColor()">
		<a href="#">
			<img src="../../assets/img/qq.png">
		</a>
		<p>咨询我们</p>
	</div>
</template>

<script>
	export default {
		name: 'footers',
		data() {
			return {
				activeBtn: false
			}
		},
		methods: {
			updateBgColor(){
				this.activeBtn=true;
			}
		}
	}
</script>

<style lang="scss" src="@/assets/styles/sass/sightimg.scss"></style>