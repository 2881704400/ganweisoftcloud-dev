<template>
	<div class="mod">
		
		<div class="modInner">
			<div class="modTitle">
				<h2 >在这里有你所需的一切</h2>
				<div class="desTxt">
					根云提供连接、计算、创新、应用等一站式物联网端到端产品与服务
				</div>
			</div>

			<Row class="modContent">
				<Col class="modItem" :lg="6" :md="6" :sm="12" :xs="24" >
					<div class="modBox" @mouseenter="showDet" @mouseleave="showPre">
						<div class="modPreview" style="display: none;">
							<div class="modPreName">
								<i class="iconfont icon-dengpao"></i>
								<h3>创新</h3>
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
						<div class="modDetail" style="display: block;">
							<div class="modDetailName">
								<i  class="iconfont icon-dengpao"></i>
								<h3>创新</h3>
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
					<div class="modBox"  @mouseenter="showDet" @mouseleave="showPre">
						<div class="modPreview">
							<div class="modPreName">
								<i class="iconfont icon-yingyong"></i>
								<h3>应用</h3>
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
								<h3>应用</h3>
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
				<Col class="modItem" :lg="6" :md="6" :sm="12" :xs="24">
					<div class="modBox"  @mouseenter="showDet" @mouseleave="showPre">
						<div class="modPreview">
							<div class="modPreName">
								<i class="iconfont icon-babiao"></i>
								<h3>计算</h3>
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
								<i  class="iconfont icon-babiao"></i>
								<h3>计算</h3>
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
					<div class="modBox"  @mouseenter="showDet" @mouseleave="showPre">
						<div class="modPreview">
							<div class="modPreName">
								<i class="iconfont icon-Share"></i>
								<h3>连接</h3>
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
								<h3>连接</h3>
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
		data(){
			return{
				
			}
		},methods: {

			showDet:function($event){
				var width=$(document).width();
				var currentBoxWidth=$event.target.parentNode.style.width;
				if(width>768&&currentBoxWidth!="31%"){
					var html=$event.target.parentNode;
					$(html).find(".modBox").addClass('bodColor');
					$(html).siblings().find(".modBox").removeClass('bodColor');
					$(html).find(".modPreview").hide();
					$(html).find(".modDetail").show();

					$(html).stop().animate({
						width:"31%"
						},
						10, function() {
						
					}).find(".modBox").stop().animate({
						height: "520px",
						top: "-20px"},
						300, function() {
					});
					$(html).siblings().stop().animate({
						width:"23%"
						},
						10, function() {
					}).find(".modBox").stop().animate({
						height: "100%",
						top: "0px"},
						10, function() {
					});


					$(html).siblings().find(".modDetail").hide();
					$(html).siblings().find(".modPreview").show();
				}
				

			},showPre(){}

		},mounted:function(){
			var width=$(document).width();
			if(width>768){
				$(".modItem").eq(0).find(".modBox").addClass('bodColor');
				$(".modItem").eq(0).css({"width":"31%"}).find(".modBox").css({"height":"520px","top":"-20px"});
				$(".modItem").eq(0).siblings().css({"width":"23%"});
			}
			


		}
	}
</script>
<!-- d9d9d9 -->
<style>
	.mod{
		width: 100%;
		overflow: hidden;
		min-height: 827px;
		height: auto;
		/*border:1px solid red;*/
		background: #f2f2f5;
		padding:100px 0;
		/*text-align: center;*/
	}
	h2{
		font-size: 30px;
		font-weight: 400px;
		margin-bottom: 10px;
	}
	ul,li{
		list-style: none;
	}
	.mod .modInner{
		max-width: 1200px;
		min-width: 320px;
		margin:0 auto;
	}
	.mod .modInner .modTitle{
		text-align: center;
	}
	.mod .desTxt {
		font-size: 18px;
		line-height: 1.5em;
	}
	.mod .modContent{
		background: #fff;
		margin-top:60px;
		height: 480px;

	}
	.mod .modContent .modItem{
		height: 100%;
		background:#fff;
		z-index: 1;
	}
	.mod .modContent .modBox{
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
		transition: all 0s cubic-bezier(.4,0,.2,1),z-index 0s .12s;
	}



	.mod .modContent .modBox .modPreview{
		/*display: block;*/
		text-align: center;
		/*opacity: 1;*/


	}
	.mod .modContent .modBox .modPreview{
		
	}
	.mod .modContent .modBox .modPreview .modPreName{
		padding:20px 0;
		margin-right: 15px;
		margin-left:15px;
		position: relative;

	}
	.mod .modContent .modBox .modPreview .modPreName:after{
		content:"";
		width: 40px;
		height: 1px;
		position: absolute;
		bottom: 0;
		left: 50%;
		margin-left: -20px;
		background-color: #d9d9d9;
	}
	.mod .modContent .modBox .modPreview .modPreName i{
		font-size: 40px;
	}
	.mod .modContent .modBox .modPreview .modPreName h3{
		font-size: 18px;
	}
	.mod .modContent .modBox .modPreview .modPreName p{
		font-size: 14px;
	}
	.mod .modContent .modBox .modPreview .modPreMenu{
		margin-top: 25px;
	}
	.mod .modContent .modBox .modPreview .modPreMenu .menuList{
		height: 200px;

	}
	.mod .modContent .modBox .modPreview .modPreMenu .menuList .menuItem{
		font-size: 14px;
		line-height: 42px;
		color: #666;
	}




	.mod .modContent .modBox .modDetail{
		display: none;
		/*opacity: 0;*/

	}
	.mod .modContent .modBox .modDetail .modDetailName {
		padding:20px 0;
		margin-right: 15px;
		margin-left: 15px;
		border-bottom: 1px solid #d9d9d9;
		color: #666;

	}
	.mod .modContent .modBox .modDetail .modDetailName i{
		font-size: 32px;
		display: inline-block;
		color:#179d83;
	}
	.mod .modContent .modBox .modDetail .modDetailName h3{
		display: inline-block;
		font-size: 18px;
		color: #666;
		font-weight: 400px;
		vertical-align: middle;
		margin-bottom: 0;

	}
	.mod .modContent .modBox .modDetail .modDetailMenu{
		margin-top: 10px;

	}
	.mod .modContent .modBox .modDetail .modDetailMenu .moreLink{
		font-size: 14px;
		color: #179d83;
		margin:0 20px;
		padding-top: 5px;
	}
	.mod .modContent .modBox .modDetail .menuList{
		min-height: 278px;
		height: auto;
	}
	.mod .modContent .modBox .modDetail .menuList .menuItem{
		min-height: 73px;
		padding:5px 20px 8px;
	}
	.mod .modContent .modBox .modDetail .menuList .menuItem .title{
		font-weight: 700;
		color: #000;
		line-height: 30px;
		font-size: 14px;
	}
	.mod .modContent .modBox .modDetail .menuList .menuItem .titleTxt{
		font-size: 14px;
		color: #666;
		line-height: 1.5;
		margin-right: 15%;
	}
	.bodColor{
		border-top: 4px solid #179d83 !important;
		border-right: 1px solid #179d83  !important;
		border-left: 1px solid #179d83  !important;
		border-bottom: 1px solid #179d83  !important;
		box-sizing: border-box  !important;
	}
	.hideC{
		opacity: 0;
		height: 0;
		transition: all .2s  ease;
		-moz-transition: all .2s ease;
		-webkit-transition: all .2s ease;
		-o-transition: all .2s ease;
	}
	.showC{
		opacity: 1;
		transition: all .5s  ease;
		-moz-transition: all .5s ease;
		-webkit-transition: all .5s ease;
		-o-transition: all .5s ease;
	}


/*
	.mod .modItem:hover{
		border-top: 4px solid #179d83;
		border-right: 1px solid #179d83;
		border-left: 1px solid #179d83;
		border-bottom: 1px solid #179d83;
		box-sizing: border-box;
	}
	
	.mod .modItem:hover .modPreview{
		opacity: 0;
		height: 0;
		transition: all .2s  ease;
		-moz-transition: all .2s ease;
		-webkit-transition: all .2s ease;
		-o-transition: all .2s ease;
	}
	.mod .modItem:hover .modDetail{
		opacity: 1;
		transition: all .5s  ease;
		-moz-transition: all .5s ease;
		-webkit-transition: all .5s ease;
		-o-transition: all .5s ease;
	}*/
	@media screen and (max-width: 768px){

		.mod .modContent .modBox .modPreview{
				display: none;
		}
		.mod .modContent .modBox .modDetail{
			display: block;
			opacity: 1;
		}
		.mod .modItem{
			background: #f2f2f5 !important;
		}
		.mod .modItem .modBox{
			width: 92%;
			left: 4%;
			border-right: none;
		}
	}

	/*#179d83*/
</style>