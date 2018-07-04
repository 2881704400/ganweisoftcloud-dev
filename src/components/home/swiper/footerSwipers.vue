<template>
	<div class="footerSwiper">
		<p >共性平台+应用子集发展模式</p>
		<p class="subTit">结合行业用户,快速拓展安防、交通、环保、物流、电网等行业领域</p>
		<div class="swiper-container">
		    <div class="swiper-wrapper">
		        <div class="swiper-slide">
		        	<a href="#">
		        		<img class="itemBg" src="../../../assets/product/funeng-zhihui.jpg" alt="">
		        		<div class="mask">
		        			<div class="bg"></div>
		        			<div class="content">
		        				<div class="itemImgPanel">
		        					<i class="icon iconfont icon-zhihuigongdi1"></i>
		        				</div>
		        				<h3 class="itemTitle">智慧工地</h3>
		        				<p class="itemDesc">
		        					根云赋能工地施工行业，远程对区域内设备及设施的运行状态进行实时监控管理，及时掌握运行状态。实时地实现塔机间碰撞报警、危险情况制动、塔机区域防护、塔机施工环境监控、塔机运动状态监控等。还具有黑匣子功能。
		        				</p>
		        				<span class="itemLink">查看更多</span>
		        			</div>
		        		</div>
		        	</a>
					
		    	</div>
		      
		        <div class="swiper-slide">
			        <a href="#">
		        		<img class="itemBg" src="../../../assets/product/funeng-fadian.jpg" alt="">
		        		<div class="mask">
		        			<div class="bg"></div>
		        			<div class="content">
		        				<div class="itemImgPanel">
		        					<i class="icon iconfont icon-fadianji"></i>
		        				</div>
		        				<h3 class="itemTitle">发电机组</h3>
		        				<p class="itemDesc">
		        					根云赋能工地施工行业，远程对区域内设备及设施的运行状态进行实时监控管理，及时掌握运行状态。实时地实现塔机间碰撞报警、危险情况制动、塔机区域防护、塔机施工环境监控、塔机运动状态监控等。还具有黑匣子功能。
		        				</p>
		        				<span class="itemLink">查看更多</span>
		        			</div>
		        		</div>
		        	</a>
			    </div>
		        <div class="swiper-slide">
			        <a href="#">
		        		<img class="itemBg" src="../../../assets/product/guangfu-bg.jpg" alt="">
		        		<div class="mask">
		        			<div class="bg"></div>
		        			<div class="content">
		        				<div class="itemImgPanel">
		        					<i class="icon iconfont icon-icontubiao"></i>
		        				</div>
		        				<h3 class="itemTitle">光伏行业</h3>
		        				<p class="itemDesc">
		        					根云赋能工地施工行业，远程对区域内设备及设施的运行状态进行实时监控管理，及时掌握运行状态。实时地实现塔机间碰撞报警、危险情况制动、塔机区域防护、塔机施工环境监控、塔机运动状态监控等。还具有黑匣子功能。
		        				</p>
		        				<span class="itemLink">查看更多</span>
		        			</div>
		        		</div>
		        	</a>
			    </div>
		        <div class="swiper-slide">
			        <a href="#">
		        		<img class="itemBg" src="../../../assets/product/funeng-fengdian.jpg" alt="">
		        		<div class="mask">
		        			<div class="bg"></div>
		        			<div class="content">
		        				<div class="itemImgPanel">
		        					<i class="icon iconfont icon-fengdian"></i>
		        				</div>
		        				<h3 class="itemTitle">风电行业</h3>
		        				<p class="itemDesc">
		        					根云赋能工地施工行业，远程对区域内设备及设施的运行状态进行实时监控管理，及时掌握运行状态。实时地实现塔机间碰撞报警、危险情况制动、塔机区域防护、塔机施工环境监控、塔机运动状态监控等。还具有黑匣子功能。
		        				</p>
		        				<span class="itemLink">查看更多</span>
		        			</div>
		        		</div>
		        	</a>
			    </div>
		        <div class="swiper-slide">
			        <a href="#">
		        		<img class="itemBg" src="../../../assets/product/guangfu-bg.jpg" alt="">
		        		<div class="mask">
		        			<div class="bg"></div>
		        			<div class="content">
		        				<div class="itemImgPanel">
		        					<i class="icon iconfont icon-icontubiao"></i>
		        				</div>
		        				<h3 class="itemTitle">光伏行业</h3>
		        				<p class="itemDesc">
		        					根云赋能工地施工行业，远程对区域内设备及设施的运行状态进行实时监控管理，及时掌握运行状态。实时地实现塔机间碰撞报警、危险情况制动、塔机区域防护、塔机施工环境监控、塔机运动状态监控等。还具有黑匣子功能。
		        				</p>
		        				<span class="itemLink:hover{
		        			}">查看更多</span>
		        			</div>
		        		</div>
		        	</a>
			    </div>
		    </div>
		    
		    <!-- 如果需要导航按钮 -->
		    <div class="swiper-button-prev swiper-button-white"></div>
		    <div class="swiper-button-next swiper-button-white"></div>
		    
		</div>
	</div>
</template>
<script>
	import Swiper from 'swiper';
	export default{
		data(){
			return{

			}
		},mounted(){
			new Swiper ('.swiper-container', {
					loop:true,
				    navigation:{
				   		nextEl: '.swiper-button-next',
	    				prevEl: '.swiper-button-prev',
				    },
			    	slidesPerView:4,
			})

		}
	}
</script>
<style>
	.footerSwiper{
		padding: 40px 0 80px 0;
		/*border:1px solid red;*/
		max-width: 1200px;
		min-width: 300px;
		margin:0 auto;
		box-sizing: border-box;

	}
	.footerSwiper>p{
		font-size:30px;
		padding: 15px 0;
		text-align: center;
	}
	.footerSwiper .subTit{
		font-size: 18px;
		line-height: 1.5;
	}
	.swiper-container{
		width: 100%;
		height:400px;
	}
	.swiper-slide{
		width: 25%;
		height: 100%;
		text-align: center;

		/*border:1px solid red;*/
		position: relative;
		text-align: center;
	}
	.swiper-slide a{
		color: #fff;
	}
	.swiper-slide .itemBg{
		width: 100%;
		height: 100%;
	}
	.swiper-slide .mask{
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}
	.swiper-slide .mask .bg{
		opacity: 0.8;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: #161A1D;
	}
	.swiper-slide .mask .content{
		position: absolute;
		left: 0;
		top: 100px;
		bottom: 0;
		right: 0;
		height: 400px;
		transition-duration: 0.5s;
	}

	.swiper-slide .mask .content .itemImgPanel i{
		font-size:50px;
		color:#408abf;
	}

	.swiper-slide .mask .itemTitle{
		font-size: 22px;
		line-height: 24px;
		margin: 0;
		padding: 0;
		margin-top: 24px;
		font-weight: normal;
	}
	.swiper-slide .mask .itemDesc{
		font-size: 14px;
		text-align: center;
		margin-top: 30px;
		padding: 0 30px;
		line-height: 24px;
		transition-duration: 0.5s;
		opacity: 0;
	}
	.swiper-slide .mask .itemLink{
		display: inline-block;
		border:1px solid #fff;
		width: 120px;
		height: 36px;
		line-height: 36px;
		font-size: 14px;
		margin-top: 62px;
		text-align: center;
		opacity: 0;
		transition-duration: 0.5s;
		margin: 10px auto;
	}
	.swiper-slide:hover .content{
		top:0;
		transition: all .5s ease;
		-moz-transition: all .5s ease;
		-webkit-transition: all .5s ease;
		-o-transition: all .5s ease;
	}
	.swiper-slide:hover .itemLink{
		opacity: 1;
		transition: all .5s ease;
		-moz-transition: all .5s ease;
		-webkit-transition: all .5s ease;
		-o-transition: all .5s ease;

	}
	.swiper-slide:hover .itemDesc{
		opacity: 1;
		transition: all .5s ease;
		-moz-transition: all .5s ease;
		-webkit-transition: all .5s ease;
		-o-transition: all .5s ease;
	}

	.swiper-slide:hover .bg{
		background: #202a4e;

		transition: all .5s ease;
		-moz-transition: all .5s ease;
		-webkit-transition: all .5s ease;
		-o-transition: all .5s ease;
	}
	.swiper-slide:hover  .iconfont{
		color: #fff !important;
		/*background: red;*/
		transition: all .5s ease;
		-moz-transition: all .5s ease;
		-webkit-transition: all .5s ease;
		-o-transition: all .5s ease;
	}
	.itemLink:hover{
		background: #fff;
		color: #202a4e;

	}
	.swiper-button-next, .swiper-button-prev{
			width: 30px;
			height: 30px;
			background-size: 30px 30px;
	}
	@media screen and (max-width: 768px){
		.footerSwiper{
			padding-bottom: 20px;
		}
		.footerSwiper>p{
			font-size: 1.2rem;
		}
		.swiper-slide .mask .content .itemImgPanel i{
			font-size:30px;
		}
		.swiper-slide .mask .itemTitle{
			font-size: 15px;
			
		}
		.swiper-container{
			height: 150px;
		}
		.swiper-slide .mask .content{
			top:20px;
		}
		.swiper-button-next, .swiper-button-prev{
			width: 20px;
			height: 20px;
			background-size: 20px 20px;
		}
	}
</style>