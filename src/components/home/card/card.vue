<template>
	<div class="layout-row-box">
		<Row>
			<Col :lg="6" :md="6" :sm="12" :xs="12">
				<Card class="listItem">
					<div class="itemWrap">
						<Icon type="ionic" size="64" color="#179DFC" class="card_icon"></Icon>
						<p>万物互联</p>
					</div>
				</Card>
				
			</Col>
			<Col :lg="6" :md="6" :sm="12" :xs="12">
				<Card  class="listItem">
					<div  class="itemWrap">
						<Icon type="xbox" size="64" color="#179DFC" class="card_icon"></Icon>
						<p>大数据与AI</p>
					</div>
				</Card>
			</Col>
			<Col :lg="6" :md="6" :sm="12" :xs="12">
				<Card  class="listItem" >
					<div class="itemWrap">
						<Icon type="earth" size="64" color="#179DFC" class="card_icon"></Icon>
						<p>自然交互</p>
					</div>
				</Card>
			</Col>
			<Col :lg="6" :md="6" :sm="12" :xs="12">
				<Card  class="listItem" >
					<div class="itemWrap">
						<Icon type="android-person-add" size="64" color="#179DFC" class="card_icon"></Icon>
						<p>城市大脑</p>
					</div>
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
		width: 100%;
		/*height: 270px;*/
		background: #fff;
		overflow: hidden;
		padding: 0px 0 10px 0;
	}
	.listItem{
		width: 100%;border:0;
		border-right: 1px solid #eee !important;
		text-align: center;
		cursor: pointer;
		box-sizing: border-box;
	}
	.listItem .itemWrap{
		padding:0 0 0 10px; 
	}
	.listItem .itemWrap p{
		padding:10px 0 0 10px; 
	}
</style>