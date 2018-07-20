<template>
	<div class="layout-content swiper-container2" @mouseenter="stopSwiper" @mouseleave="startSwiper">
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

<script>
	import Swiper from 'swiper';
	export default{
		data(){
			return{
				swiper:null
			}
		},mounted(){
			this.swiper=new Swiper ('.swiper-container2', {
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
				     clickable :true,
				    type:'bullets'
				 },

			    // paginationType : 'bullets',
			})

		},methods:{
			stopSwiper:function(){
				this.swiper.autoplay.stop();
			},
			startSwiper:function(){
				this.swiper.autoplay.start();
			}
		}
	}
	
</script>

<style lang="scss">
	.layout-content {
		/*min-height: 200px;*/
		height: auto;
		/*margin: 15px;*/
		overflow: hidden;
		background: #202a4e;
		clear: both;
		position: relative;
		.swiper-slide{
			height: auto;
			img{
				width: 100%;
				height: auto;
			}
		}
		.swiper-pagination-bullet{
			background: #eee;
			width: 16px;
			border-radius: 1px;
			height: 4px;
		}
	}
	@media screen and (min-width: 768px){
		.layout-content .swiper-button-next,.layout-content  .swiper-button-prev{
			width: 50px ;
			height: 50px;
			background-size: 50px 50px ;
		}
	}

</style>