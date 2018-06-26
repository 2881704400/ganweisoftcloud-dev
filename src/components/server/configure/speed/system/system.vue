<template>
	<div id="shopListSystem" class="shop-list-con">
		<Row>
			<Col span="5">
			<Card class="shop-list-con-card" @click.native="checkSystemCard(0)">
				<div class="shop-os-logo">
					<img src="../../../../../assets/server/windows.png" />
				</div>
				<div class="shop-os-con">
					<h3>Windows 2012 R2 标准版 64位中文版</h3>
				</div>
			</Card>
			</Col>
			<Col span="5" offset="1">
			<Card class="shop-list-con-card" @click.native="checkSystemCard(1)">
				<div class="shop-os-logo">
					<img src="../../../../../assets/server/windows.png" />
				</div>
				<div class="shop-os-con">
					<h3>Windows 2008 R2 SP1 64位</h3>
				</div>
			</Card>
			</Col>
			<Col span="5" offset="1">
			<Card class="shop-list-con-card" @click.native="checkSystemCard(2)">
				<div class="shop-os-logo">
					<img src="../../../../../assets/server/ubuntu.png" />
				</div>
				<div class="shop-os-con">
					<h3>Ubuntu Server 16.04.1 LTS 64位</h3>
				</div>
			</Card>
			</Col>
			<Col span="5" offset="1">
			<Card class="shop-list-con-card" @click.native="checkSystemCard(3)">
				<div class="shop-os-logo">
					<img src="../../../../../assets/server/centos.png" />
				</div>
				<div class="shop-os-con">
					<h3>CentOS 7.2 64位</h3>
				</div>
			</Card>
			</Col>
		</Row>
		<!--<p class="shop-tip-word" style="margin-top: 0">
			更多机型配置，可以选择
			<a href="javascript:;" class="change-to-normal shop-links" style="font-size:12px;">自定义配置</a>
		</p>-->
	</div>
</template>

<script>
	export default{
		data() {
			return {

			}
		},
		methods: {
			checkTypeCard: function(indexNum) {
				$("#shopListModelType .shop-list-con-card").removeClass("shop-card-checked");
				$("#shopListModelType .shop-list-con-card").eq(indexNum).addClass("shop-card-checked");
				$("#shopListModelType .shop-list-con-card").eq(indexNum).removeClass("ivu-card-dis-hover")
			},
			checkSystemCard: function(indexNum) {
				$("#shopListSystem .shop-list-con-card").removeClass("shop-card-checked");
				$("#shopListSystem .shop-list-con-card").eq(indexNum).addClass("shop-card-checked");
				$("#shopListSystem .shop-list-con-card").eq(indexNum).removeClass("ivu-card-dis-hover")
			},
		},
	}
</script>

<style>

</style>