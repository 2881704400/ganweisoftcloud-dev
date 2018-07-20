<template>
	<div class="mod">
		
		<div class="modInner">
			<div class="modTitle">
				<p >在这里有你所需的一切</p>
				<div class="desTxt">
					根云提供连接、计算、创新、应用等一站式物联网端到端产品与服务
				</div>
			</div>

			<Row class="modContent">
				<Col class="modItem modItemOne" :lg="6" :md="6" :sm="12" :xs="24" >
					<div class="modBox modBoxOne"  @mouseenter="aa" >
						<div class="modPreview modPreviewOne">
							<div class="modPreName">
								<i class="iconfont icon-dengpao" ></i>
								<p  class="titl">创新</p>
								<p>赋能智造</p>
							</div>
							<div class="modPreMenu">
								<ul class="menuList">
									<li class="menuItem">
										<span>根·云像</span>
									</li>
									<li class="menuItem">
										<span>根·云宝</span>
									</li>
									<li class="menuItem">
										<span>···</span>
									</li>
								</ul>
							</div>
						</div>
						<div class="modDetail modDetailOne">
							<div class="modDetailName">
								<i  class="iconfont icon-dengpao" style="position: relative;top: -2px;"></i>
								<p  class="titl">创新</p>
								<p>基于物联设备的大数据分析为机器画像，同时为设备及其拥有者提供差异性的保险、租赁等创新服务。</p>

							</div>
							<div class="modDetailMenu">
								<ul class="menuList">

									<li class="menuItem">
										<div class="title">
											<span>根·云像</span>
										</div>
										<div class="titleTxt">
											<p>为设备画像，让每台设备具备独特的形象和性格，进而提供区别化的创新服务</p>
										</div>
									</li>

									<li class="menuItem">
										<div class="title">
											<span>根·云宝</span>
										</div>
										<div class="titleTxt">
											<p>基于工业设备的大数据信用与资产质量评级， 客观、实时的解决金融痛点问题：信用、风险、资产管理</p>
										</div>
									</li>
								</ul>
								<a class="moreLink" href="#">更多</a>
							</div>
						</div>
					</div>
					
				</Col>
				<Col class="modItem" :lg="6" :md="6" :sm="12" :xs="24" ref="aaa">
					<div class="modBox"  @mouseenter="aa" >
						<div class="modPreview">
							<div class="modPreName">
								<i class="iconfont icon-yingyong"></i>
								<p  class="titl">应用</p>
								<p>共赢生态</p>
							</div>
							<div class="modPreMenu">
								<ul class="menuList">
									<li class="menuItem">
										<span>根·云用</span>
									</li>
									
									<li class="menuItem">
										<span>···</span>
									</li>
								</ul>
							</div>
						</div>
						<div class="modDetail">
							<div class="modDetailName">
								<i  class="iconfont icon-yingyong"></i>
								<p  class="titl">应用</p>
								<p>物联应用市场提供丰富的应用满足用户多样化需求，使用户可以方便地分析和管理设备，提高生产效率。</p>

							</div>
							<div class="modDetailMenu">
								<ul class="menuList">

									<li class="menuItem">
										<div class="title">
											<span>根·云用</span>
										</div>
										<div class="titleTxt">
											<p>丰富的物联应用帮助用户方便高效地查看工况，分析预测故障，以及管理设备</p>
										</div>
									</li>

									
								</ul>
								<a  class="moreLink" href="#">更多</a>
							</div>
						</div>
					</div>
				</Col>
				<Col class="modItem" :lg="6" :md="6" :sm="12" :xs="24" >
					<div class="modBox"  @mouseenter="aa" >
						<div class="modPreview">
							<div class="modPreName">
								<i class="iconfont icon-bazi"></i>
								<p  class="titl">计算</p>
								<p>可靠平台</p>
							</div>
							<div class="modPreMenu">
								<ul class="menuList">
									<li class="menuItem">
										<span>根·云擎</span>
									</li>
									<li class="menuItem">
										<span>根·云坊</span>
									</li>
									<li class="menuItem">
										<span>···</span>
									</li>
								</ul>
							</div>
						</div>
						<div class="modDetail">
							<div class="modDetailName">
								<i  class="iconfont icon-bazi"></i>
								<p  class="titl">计算</p>
								<p>提供主流的云计算、云存储和大数据处理能力，使客户能够一键部署、按需使用、灵活配置、降低成本。</p>

							</div>
							<div class="modDetailMenu">
								<ul class="menuList">

									<li class="menuItem">
										<div class="title">
											<span>根·云擎</span>
										</div>
										<div class="titleTxt">
											<p>提供稳定可靠，价格低廉，灵活易用，安全保障的云计算全系列产品和服务</p>
										</div>
									</li>
									<li class="menuItem">
										<div class="title">
											<span>根·云坊</span>
										</div>
										<div class="titleTxt">
											<p>对不同数据源的数据智能地进行探索、清洗、验证、融合、挖掘、发布等工作</p>
										</div>
									</li>
									
								</ul>
								<a  class="moreLink" href="#">更多</a>
							</div>
						</div>
					</div>
				</Col>
				<Col class="modItem" :lg="6" :md="6" :sm="12" :xs="24" >
					<div class="modBox" @mouseenter="aa" >
						<div class="modPreview">
							<div class="modPreName">
								<i class="iconfont icon-Share"></i>
								<p  class="titl">连接</p>
								<p>开放物联</p>
							</div>
							<div class="modPreMenu">
								<ul class="menuList">
									<li class="menuItem">
										<span>根·云盒</span>
									</li>
									<li class="menuItem">
										<span>根·云联</span>
									</li>
									<li class="menuItem">
										<span>···</span>
									</li>
								</ul>
							</div>
						</div>
						<div class="modDetail">
							<div class="modDetailName">
								<i  class="iconfont icon-Share"></i>
								<p class="titl">连接</p>
								<p>提供全行业各种类型设备一站式物联接入的核心产品和服务，让设备物联入网上云不再是一件难事。</p>

							</div>
							<div class="modDetailMenu">
								<ul class="menuList">

									<li class="menuItem">
										<div class="title">
											<span>根·云盒</span>
										</div>
										<div class="titleTxt">
											<p>根云物联硬件产品组帮助各种移动和固定设备方便又稳定地发送数据，连接入网</p>
										</div>
									</li>
									<li class="menuItem">
										<div class="title">
											<span>根·云联</span>
										</div>
										<div class="titleTxt">
											<p>提供高稳定可扩展的数据端到端通道，以及提供丰富的设备模型和解析服务</p>
										</div>
									</li>
									
								</ul>
								<a  class="moreLink" href="#">更多</a>
							</div>
						</div>
					</div>
				</Col>
			</Row>
		</div>

	</div>
</template>
<script>
	
	export default{
		methods:{
			aa:function($event){
				var width=$(document).width()
				var currentBoxWidth=$event.target.parentNode.style.width;
				if(width>768&&currentBoxWidth!="31%"){
					var htm=$(".modItem:eq(0)");
					$(htm).find(".modBox").removeClass('bodColor');
					var html=$event.target;

					$(html).parent().css({"width":"31%","transition":"all 0.3s ease"});
					$(html).find(".modPreview").stop().hide();
					$(html).find(".modDetail").stop().fadeIn();
					$(html).css({
						"height":"520px",
						"top":"-20px",
						"borderTop":"4px solid #408abf",
						"borderRight":"1px solid #408abf",
						"borderBottom":"1px solid #408abf",
						"borderLeft":"1px solid #408abf",
						"transition":"all 0.3s ease"
					});


					$(html).parent().siblings().find(".modPreview").stop().fadeIn();
					$(html).parent().siblings().find(".modDetail").stop().hide();
					$(html).parent().siblings().css({
						"width":"23%",
						"transition":"all 0.3s ease"
					}).find(".modBox").css({
						"height":"100%",
						"top":"0px",
						"borderTop":"4px solid #d9d9d9",
						"borderRight":"1px solid #d9d9d9",
						"borderBottom":"none",
						"borderLeft":"none",
						"transition":"all 0.3s ease",
					});
				}
				

				
			}
		},mounted(){
			var width=$(document).width()
			// console.log(width);
			if(width>768){
				var html=$(".modItem:eq(0)");
				$(html).find(".modPreview").hide().siblings('.modDetail').show();
				$(html).siblings().css({"width":"23%"});
				$(html).css({"width":"31%"}).find(".modBox").addClass('bodColor').css({"height":"520px","top":"-20px"});
			}
			
		}
	}
</script>
<!-- d9d9d9 -->
<style lang="scss">
	ul,li{
		list-style: none;
	}
	.mod{
		width: 100%;
		overflow: hidden;
		min-height: 827px;
		height: auto;
		background: #f2f2f5;
		padding:100px 0;
		
		.modInner{
			max-width: 1200px;
			min-width: 320px;
			margin:0 auto;
			.modTitle{
				 p{
				 	font-size: 30px;
					line-height: 1.5;
					padding: 15px 0;
					text-align: center;
				 }
				 .desTxt {
					font-size: 18px;
					line-height: 1.5em;
					text-align: center;
				}
							
			}
			.modContent{
				margin-top:60px;
				height: 480px;
				.modItem{
					height: 100%;
					background:#fff;
					z-index: 1;
					transition-duration: 0.3s;
					.modBox{
						border-top: 4px solid #d9d9d9;
						border-right: 1px solid #d9d9d9;
						box-sizing: border-box;
						background: #fff;
						position: absolute;
						left: 0;
						top: 0;
						bottom: 0;
						right: 0;
						width: 100%;
						height: 100%;
						z-index: 999;
						.modPreview{
							text-align: center;
							.modPreName{
								padding:20px 0;
								margin-right: 15px;
								margin-left:15px;
								position: relative;
								&:after{
										content:"";
										width: 40px;
										height: 1px;
										position: absolute;
										bottom: 0;
										left: 50%;
										margin-left: -20px;
										background-color: #d9d9d9;
								}
								i{
									font-size:40px;
								}
								.titl{
									font-size: 18px;
									font-weight: 400;
								}
								 p{
									font-size: 14px;
								}
							}
							.modPreMenu{
								margin-top: 25px;
								.menuList{
									height: 200px;
									.menuItem{
										font-size: 14px;
										line-height: 42px;
										color: #666;

									}
								}
							}
						}
						.modDetail{
							display: none;
							.modDetailName {
								padding:20px 0;
								margin-right: 15px;
								margin-left: 15px;
								border-bottom: 1px solid #d9d9d9;
								color: #666;
								i{
										font-size: 32px;
										display: inline-block;
										vertical-align: middle;
										color:#408abf;
								}
								.titl{
									display: inline-block;
									font-size: 18px;
									color: #333;
									font-weight: 400;
									vertical-align: middle;
									margin-bottom: 0;
									width: auto;
								}

							}
							.modDetailMenu{
								margin-top: 10px;
								.moreLink{
									font-size: 14px;
									color: #408abf;
									margin:0 20px;
									padding-top: 5px;
									&:hover{
										text-decoration: underline;
									}
								}
								.menuList{
									min-height: 278px;
									height: auto;
									.menuItem{
										min-height: 73px;
										padding:5px 20px 8px;
										cursor: pointer;
										&:hover{
											background:#f2f2f5;
										}
										.title{
											font-weight: 400;
											color: #000;
											line-height: 30px;
											font-size: 14px;

										}
										.titleTxt{
											font-size: 14px;
											color: #666;
											line-height: 1.5;
											margin-right: 15%;
										}
									}
								}
							}
						}
					}

				}
			}
		}
	}
	.bodColor{
		border-top: 4px solid #408abf !important;
		border-right: 1px solid #408abf  !important;
		border-left: 1px solid #408abf  !important;
		border-bottom: 1px solid #408abf  !important;
		box-sizing: border-box  !important;
	}
	
	
	
	
	@media screen and (max-width: 1024px){
		.modTitle p{font-size: 25px;}
		.modTitle .desTxt{
			width: 98%;
			margin: 0 auto;
			font-size:16px ;
		}

		.mod .modContent .modBox .modPreview{
			display: none;
		}
		.mod .modContent .modBox .modDetail{
			display: block !important;
			opacity: 1;
		}
		.mod .modItem{
			background: #f2f2f5 !important;
		}
		.mod .modItem .modBox{
			width: 92%  !important;
			left: 4%  !important;
			border-right: none;
		}
		
		

	}
	
	@media screen and (min-width: 1024px){

		.mod .modContent .modBox .modDetail .modDetailName p{
			width: 300px;
		}
		.mod .modContent .modBox .modDetail .menuList .menuItem .titleTxt{
		
			width: 300px;
		}	

	}	
	@media screen and (max-width: 1025px){

		.mod .modContent .modBox .modDetail .modDetailName p{
			width: auto;
		}
		.mod .modContent .modBox .modDetail .menuList .menuItem .titleTxt{
		
			width: auto;
		}	

	}	
	


</style>