<template>
	<div class="shop-list-con">
		<slot name="chargeType">
			<!--<RadioGroup type="button">
				<Radio label="包年包月" value="true"></Radio>
				<Radio label="按量计费"></Radio>
			</RadioGroup>-->
		</slot>
		<slot name="chargeMore">
			<!--<a target="_blank" href="http://www.qcloud.com/doc/product/213/%E8%AE%A1%E8%B4%B9%E6%A8%A1%E5%BC%8F%E8%AF%B4%E6%98%8E" class="shop-links">详细对比
														<i class="shop-links-icon"></i>
													</a>-->
		</slot>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
	}
</script>

<style scoped>
	.ui-block-control {
		position: absolute;
		left: 108px;
		top: -20px;
	}
	
	.ui-block-title {
		width: 101px;
		text-align: center;
		display: inline-block;
		position: relative;
		font-size: 12px;
		overflow: hidden;
	}
	
	.ui-block-title span {
		display: inline-block;
		padding: 0 5px;
		background-color: #fff;
		color: #999;
		position: relative;
		height: 15px;
		z-index: 1;
	}
	
	.ui-block-title:after {
		content: '';
		display: block;
		position: relative;
		top: -9px;
		margin-left: 5px;
		margin-right: 5px;
		height: 1px;
		background-color: #ccd1d9;
	}
	
	.shop-list-con .shop-links {
		font-size: 14px;
	}
	
	.shop-links-icon {
		margin-top: -6px;
		margin-left: 2px;
	}
</style>