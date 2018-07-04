<template>
	<div class="layout-content">
		<Carousel v-model="value1" :autoplay="setting.autoplay" :autoplay-speed="setting.autoplaySpeed" :dots="setting.dots" :radius-dot="setting.radiusDot" :trigger="setting.trigger" :arrow="setting.arrow">
			<CarouselItem>
				<div class="demo-carousel"><img src="../../../assets/home/banner1.png" /></div>
			</CarouselItem>
			<CarouselItem>
				<div class="demo-carousel"><img src="../../../assets/home/banner2.png" /></div>
			</CarouselItem>
			<CarouselItem>
				<div class="demo-carousel"><img src="../../../assets/home/banner3.png" /></div>
			</CarouselItem>
			<CarouselItem>
				<div class="demo-carousel"><img src="../../../assets/home/banner0.png" /></div>
			</CarouselItem>
		</Carousel>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				value1: 0,
				setting: {
					autoplay: true,
					autoplaySpeed: 5000,
					// dots:false,
					radiusDot: false,
					trigger: 'hover',
					arrow: 'always',
					loop:true
				}
			}
		}
	}
</script>

<style >
	.layout-content {
		min-height: 200px;
		/*margin: 15px;*/
		overflow: hidden;
		background: #202a4e;

	}
	.demo-carousel img{
		width: 100%;
		height: auto;
	}
	.ivu-icon-chevron-right,.ivu-icon-chevron-left {
		font-size: 25px;
	}
</style>