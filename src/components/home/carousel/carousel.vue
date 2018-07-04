<template>
	<div class="layout-content swiper-container2">
		<div class="swiper-wrapper">
			<div class="swiper-slide">
				<img src="../../../assets/home/banner0.png" />
			</div>
			<div class="swiper-slide">
				<img src="../../../assets/home/banner1.png" />
			</div>
			<div class="swiper-slide">
				<img src="../../../assets/home/banner2.png" />
			</div>
			<div class="swiper-slide">
				<img src="../../../assets/home/banner3.png" />
			</div>

		</div>
		<div class="swiper-pagination"></div>
		<div class="swiper-button-prev swiper-button-white"></div>
		<div class="swiper-button-next swiper-button-white"></div>
		
	</div>

</template>

<script scope>
	import Swiper from 'swiper';
	export default{
		data(){
			return{
			}
		},mounted(){
			new Swiper ('.swiper-container2', {
				loop:true,
				speed:300,
				autoplay : {
				    delay:5000
				 },
			    navigation:{
			   		nextEl: '.swiper-button-next',
    				prevEl: '.swiper-button-prev',
			    },
			    pagination: {
				    el: '.swiper-pagination',
				    type:'bullets'
				 },
			    // paginationType : 'bullets',
			})

		}
	}
	
</script>

<style >
	.layout-content {
		/*min-height: 200px;*/
		height: auto;
		/*margin: 15px;*/
		overflow: hidden;
		background: #202a4e;
		clear: both;
		position: relative;
	}
	.layout-content .swiper-slide{
		height: auto;
	}
	.swiper-pagination-bullet{
		background: #eee;
		width: 16px;
		border-radius: 1px;
		height: 4px;
	}
	.layout-content .swiper-slide img{
		width: 100%;
		height: auto;
	}
	
</style>