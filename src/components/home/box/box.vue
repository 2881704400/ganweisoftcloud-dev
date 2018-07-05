<template>
	<div class="boxList">
		<p>为什么选择敢为云</p>
		<Row class="boxWrap" >
			<Col class="layout-main-box" :lg="12" :md="12" :sm="24" :xs="24">
				<div class="imgWrap">
					<img  src="../../../assets/product/box1.png"  />
				</div>
				<div class="conWrap">
					
						<p class="titTop">
							<span>全面集成各类设备/传感器</span>
						</p>
						<p class="titBot">
							<span>依托共性软件平台强大的通讯功能<br />实现对各类设备/传感器的快速兼容整合</span>
						</p>
					
				</div>
			</Col>
			<Col class="layout-main-box" :lg="12" :md="12" :sm="24" :xs="24">
				<div class="imgWrap">
					<img  src="../../../assets/product/box2.png"  />
				</div>
				<div class="conWrap">
					
						<p class="titTop">
							<span>完全自定义的用户界面</span>
						</p>
						<p  class="titBot">
							<span>平台提供数百种图元模块<br />可以通过积木式搭建快速满足用户的个性化需求</span>
						</p>
					
				</div>
			</Col>
		</Row>
		
		<Row  class="boxWrap">
			<Col class="layout-main-box"  :lg="12" :md="12" :sm="24" :xs="24">
				<div class="imgWrap">
					<img  src="../../../assets/product/box3.png"  />
				</div>
				<div class="conWrap">
					
						<p class="titTop">
							<span>多样化的人机交互</span>
						</p>
						<p  class="titBot">
							
							<span>提供移动终端、C\S、B\S、PC<br />多屏坐席、多屏\巨屏互动等多种交互方式</span>
						</p>
					
				</div>
			</Col>
			<Col class="layout-main-box" :lg="12" :md="12" :sm="24" :xs="24">
				<div class="imgWrap">
					<img  src="../../../assets/product/box4.png"  />
				</div>
				<div class="conWrap">
					
						<p class="titTop">
							<span>信息一站式推送</span>
						</p>
						<p  class="titBot">
							
							<span>系统提供自定义信息块的任意组合<br />一旦发生报警，信息块会随着主界面一起推送给用户</span>
						</p>
					
				</div>
			</Col>
		</Row>
		
		
	</div>
</template>

<script>
	export default {
		
	}
</script>

<style scoped>
	.ivu-row{
		margin-left: auto;
		margin-right: auto;
	}
	.boxList{
		padding-bottom: 100px;
	}
	.boxList>p{
		font-size: 30px;
		padding: 30px 0;
		text-align: center;
	}
	.boxWrap{
		max-width: 1200px;
		margin:0 auto;
		
		text-align: center;
		padding-top:50px;
	}
	.imgWrap{
		max-width:310px;
		margin:0 auto;
	}
	.imgWrap img{
		display: block;
		margin:0 auto;
		height: 100%;
		width: 100%;
	}
	.conWrap{
		padding-top: 20px;
	}
	.conWrap .titTop{
		font-size: 18px;
		font-weight:normal;
	}
	.conWrap .titBot{
		font-size: 14px;
		line-height: 1.5;
		font-weight:normal;
	}
	
	@media screen and (max-width: 768px){
		.boxList>p{
			font-size: 25px;
		}
	}
</style>