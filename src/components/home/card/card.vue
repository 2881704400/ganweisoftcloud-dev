<template>
	<div class="layout-row-box">
		<Row class="wrapCon" >
			<Col :lg="6" :md="12" :sm="12" :xs="12">

				<Card class="listItem" dis-hover>
					<Row type="flex" justify="center" align="middle">
						<!-- <Col :lg="2" :md="2" :sm="2" :xs="2"></Col> -->
						<Col class="iWrap" :lg="12" :md="12" :sm="24" :xs="24">
							<i class="iconfont icon-wanwuhulian"></i>
						</Col>
						<Col class="itemCont" :lg="12" :md="12" :sm="24" :xs="24">
							<h3>万物互联</h3>
							<p>连接数千亿资产</p>
							<p>缔造超百亿价值</p>
						</Col>
						<!-- <Col :lg="2" :md="2" :sm="2" :xs="2"></Col> -->
					</Row>
				</Card>
				
			</Col>
			<Col :lg="6" :md="12" :sm="12" :xs="12">
				<Card  class="listItem listTwo" dis-hover >
					<Row type="flex" justify="center" align="middle">
						<!-- <Col :lg="2" :md="2" :sm="2" :xs="2"></Col> -->
						<Col class="iWrap" :lg="12" :md="12"  :sm="24" :xs="24"><i class="iconfont icon-dashujuyuAI"></i></Col>
						<Col  class="itemCont" :lg="12" :md="12"  :sm="24" :xs="24">
							<h3>大数据与AI</h3>
							<p>共享工业云生态 </p>
							<p>共铸中国制造2025</p>
						</Col>
						<!-- <Col :lg="2" :md="2" :sm="2" :xs="2"></Col> -->
					</Row>
				</Card>
			</Col>
			<Col :lg="6" :md="12" :sm="12" :xs="12">
				<Card  class="listItem" dis-hover>
					<Row type="flex" justify="center" align="middle">
						<!-- <Col :lg="2" :md="2" :sm="2" :xs="2"></Col> -->
						<Col  class="iWrap" :lg="8" :md="8"  :sm="24" :xs="24"><i class="iconfont icon-ziranhulian"></i></Col>
						<Col  class="itemCont" :lg="12" :md="12"  :sm="24" :xs="24">
							<h3>自然交互</h3>
							<p>开源架构自主研发</p>
							<p>数据安全可控</p>
						</Col>
						<!-- <Col :lg="2" :md="2" :sm="2" :xs="2"></Col> -->
					</Row>
				</Card>
			</Col>
			<Col :lg="6" :md="12" :sm="12" :xs="12">
				<Card  class="listItem" dis-hover style="border:none !important;">
					<Row type="flex" justify="center" align="middle">
						<!-- <Col :lg="2" :md="2" :sm="2" :xs="2"></Col> -->
						<Col  class="iWrap" :lg="12" :md="12"  :sm="24" :xs="24"><i class="iconfont icon-chengshidanao"></i></Col>
						<Col  class="itemCont" :lg="12" :md="12"  :sm="24" :xs="24">
							<h3>城市大脑</h3>
							<p>工业互联网国家队</p>
							<p>本土产品本土运营</p>
						</Col>
						<!-- <Col :lg="2" :md="2" :sm="2" :xs="2"></Col> -->
					</Row>
				</Card>
			</Col>
		</Row>
		
	</div>
</template>

<script>
	export default {

	}
</script>


<style>

	.layout-row-box {
		width:100%;
		/*height: 270px;*/
		background: #202a4e;
		overflow: hidden;
		padding: 10px 0 10px 0;
		margin:0 auto;
	}
	.wrapCon{
		width: 82%;
		margin:0 auto;
	}
	.listItem{

		width: 100%;border:0;
		background: #202a4e;
		border-right: 1px solid #ddd !important;
		border-radius: 0;
		text-align: center;
		cursor: pointer;
		box-sizing: border-box;

	}
	.iWrap i{
		font-size: 50px;
		position: relative;
		top: 0;
		color: #58a4da;
		transition-duration: 0.2s;
		text-align: center;
	}
	.listItem:hover i{
		top: -3px;
		transition: all .2s ease;
		-webkit-transition: all .2s ease;
		-o-transition: all .2s ease;
		-moz-transition: all .2s ease;
	}
	.itemCont h3{
		padding-bottom: 5px;
		font-size: 16px;
		line-height: 28px;
		color: #fff;
	}
	.itemCont p{
		line-height: 28px;
		font-size: 14px;
		color: #ddd;
	}
	@media screen and (max-width: 768px){
		.layout-row-box{
			width: 100%;
		}
		.listItem{
			border:none !important;

		}

	}
	@media screen and (min-width: 768px) and (max-width: 1025px){
		.listItem{
			border:none !important;

		}

	}
</style>