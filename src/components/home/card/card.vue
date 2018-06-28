<template>
	<div class="layout-row-box">
		<Row>
			<Col :lg="6" :md="6" :sm="12" :xs="12">
				<Card class="listItem" dis-hover>
					<Row type="flex" justify="center" align="middle">
						<Col class="iWrap" :lg="12" :md="12" :sm="24" :xs="24">
							<i class="iconfont icon-atom"></i>
						</Col>
						<Col class="itemCont" :lg="12" :md="12" :sm="24" :xs="24">
							<h3>万物互联</h3>
							<p>连接数千亿资产</p>
							<p>缔造超百亿价值</p>
						</Col>
					</Row>
				</Card>
				
			</Col>
			<Col :lg="6" :md="6" :sm="12" :xs="12">
				<Card  class="listItem" dis-hover>
					<Row type="flex" justify="center" align="middle">
						<Col class="iWrap" :lg="12" :md="12"  :sm="24" :xs="24"><i class="iconfont icon-dashuju"></i></Col>
						<Col  class="itemCont" :lg="12" :md="12"  :sm="24" :xs="24">
							<h3>大数据与AI</h3>
							<p>共享工业云生态 </p>
							<p>共铸中国制造2025</p>
						</Col>
					</Row>
				</Card>
			</Col>
			<Col :lg="6" :md="6" :sm="12" :xs="12">
				<Card  class="listItem" dis-hover>
					<Row type="flex" justify="center" align="middle">
						<Col  class="iWrap" :lg="12" :md="12"  :sm="24" :xs="24"><i class="iconfont icon-guanliantupu"></i></Col>
						<Col  class="itemCont" :lg="12" :md="12"  :sm="24" :xs="24">
							<h3>自然交互</h3>
							<p>开源架构自主研发</p>
							<p>数据安全可控</p>
						</Col>
					</Row>
				</Card>
			</Col>
			<Col :lg="6" :md="6" :sm="12" :xs="12">
				<Card  class="listItem" dis-hover style="border:none !important;">
					<Row type="flex" justify="center" align="middle">
						<Col  class="iWrap" :lg="12" :md="12"  :sm="24" :xs="24"><i class="iconfont icon-zhongguo"></i></Col>
						<Col  class="itemCont" :lg="12" :md="12"  :sm="24" :xs="24">
							<h3>城市大脑</h3>
							<p>工业互联网国家队</p>
							<p>本土产品本土运营</p>
						</Col>
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
		background: #fff;
		overflow: hidden;
		padding: 0px 0 10px 0;
		margin:0 auto;
	}
	.listItem{
		width: 100%;border:0;
		border-right: 1px solid #eee !important;
		text-align: center;
		cursor: pointer;
		box-sizing: border-box;

	}
	.iWrap i{
		font-size: 35px;
		position: relative;
		top: 0;
		color: #179d83;
	}
	.listItem:hover i{
		top: -10px;
		transition: all .2s ease;
		-webkit-transition: all .2s ease;
		-o-transition: all .2s ease;
		-moz-transition: all .2s ease;
	}
	.itemCont h3{
		padding-bottom: 10px;
	}
	
</style>