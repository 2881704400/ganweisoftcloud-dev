<template>
	<div id="shopListModelType" class="shop-list-con">
		<Row>
			<Col span="5">
			<Card class="shop-list-con-card" @click.native="checkTypeCard(0)">
				<h3 class="shop-checkblock-item-title">入门配置（1核1GB）</h3>
				<p class="shop-checkblock-item-desc">适用于起步阶段的个人网站</p>
			</Card>
			</Col>
			<Col span="5" offset="1">
			<Card class="shop-list-con-card" @click.native="checkTypeCard(1)">
				<h3 class="shop-checkblock-item-title">入门配置（1核1GB）</h3>
				<p class="shop-checkblock-item-desc">适用于起步阶段的个人网站</p>
			</Card>
			</Col>
			<Col span="5" offset="1">
			<Card class="shop-list-con-card" @click.native="checkTypeCard(2)">
				<h3 class="shop-checkblock-item-title">入门配置（1核1GB）</h3>
				<p class="shop-checkblock-item-desc">适用于起步阶段的个人网站</p>
			</Card>
			</Col>
			<Col span="5" offset="1">
			<Card class="shop-list-con-card" @click.native="checkTypeCard(3)">
				<h3 class="shop-checkblock-item-title">入门配置（1核1GB）</h3>
				<p class="shop-checkblock-item-desc">适用于起步阶段的个人网站</p>
			</Card>
			</Col>
		</Row>
		<p class="shop-tip-word" style="margin-top: 0">
			更多机型配置，可以选择
			<a href="javascript:;" class="change-to-normal shop-links" style="font-size:12px;">
				自定义配置
				<i class="shop-links-icon"></i>
			</a>
		</p>
	</div>
</template>

<script>
	export default {
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

<style scoped>
	.shop-checkblock-item-title {
		margin: 5px 0px;
		font-size: 14px;
		line-height: 1.1;
		font-weight: 400;
		font-weight: 700;
		color: #333;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.shop-checkblock-item-desc {
		max-height: 36px;
		font-size: 12px;
		line-height: 1.5;
		color: #999;
		overflow: hidden;
	}
	
	.shop-tip-word .shop-links {
		color: #00a4ff;
	}
	
	.shop-tip-word .shop-links:hover {
		text-decoration: underline;
	}
	
	.shop-links .shop-links-icon {
		margin-top: -3px;
		margin-left: 3px;
	}
</style>