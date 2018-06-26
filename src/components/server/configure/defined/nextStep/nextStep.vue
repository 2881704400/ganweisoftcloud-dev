<template>
	<div class="shop-submit-wrap fixed">
		<div class="shop-submit">
			<a href="javascript:;" class="shop-btn my-next-step">
				<i class="shop-loading-blue-icon" style="display:none"></i>下一步：选择镜像</a>
			<span class="submit-tips" style="display:none" id="stepOneErrorTip"></span>
			<span class="submit-tips" id="stepOneTip">初始价格仅包含CPU及内存价格，不包含系统盘、数据盘、镜像和带宽等其他价格。</span>
		</div>
	</div>
</template>

<script>
	export default {

	}
</script>

<style scoped>
	
	/*.shop-submit-wrap.fixed .shop-submit {
		position: fixed;
		bottom: 0;
		z-index: 11;
		width: 1045px; border: 1px solid #f00;
	}*/
	
	.shop-submit-wrap.fixed .shop-submit {
		position: fixed;
		bottom: 0;
		z-index: 11;
		width: 100%;
	}
	
	.shop-submit .shop-btn {
		margin-right: 5px;
	}
	
	.shop-loading-blue-icon {
		width: 20px;
		height: 20px;
		background-image: url(../../../../../assets/server/loading_blue.gif);
		margin-right: 5px;
	}
	
	.shop-submit {
		padding: 15px 0 15px 135px;
		border-top: 1px solid #dbe3e4;
		background-color: #fff;
		box-shadow: 0 -4px 4px -2px #e4e9f0;
	}
	
	.shop-submit .cost {
		position: relative;
		left: -95px;
		font-size: 0;
		margin-bottom: 10px;
	}
	
	.shop-submit .tit {
		font-size: 14px;
		display: inline-block;
		width: 95px;
		vertical-align: top;
		margin-top: 10px;
	}
	
	.cost .tit {
		color: #666;
	}
	
	.shop-submit .price,
	.shop-submit .price-control {
		display: inline-block;
		vertical-align: top;
	}
	
	.cost .price {
		color: #ed711f;
	}
	
	.price-control {
		display: inline-block;
		vertical-align: top;
	}
	
	.shop-submit .price em {
		font-style: normal;
		font-size: 25px;
		line-height: 30px;
		margin-left: 3px;
		margin-right: 3px;
		position: relative;
		bottom: -3px;
	}
	
	.shop-submit .price .unit-txt {
		font-size: 14px;
		margin-left: 3px;
		margin-right: 3px;
	}
	
	.cost .price {
		color: #ed711f;
	}
	
	.shop-submit .shop-btn {
		margin-right: 5px;
	}
	
	.shop-btn.pay {
		background: #fa7821;
		border-color: #e36d1f;
	}
	
	.shop-btn {
		height: 33px;
		min-width: 24px;
		padding: 0 20px;
		border: 1px solid #00a4ff;
		border-radius: 2px;
		background: #00a4ff;
		color: #fff;
		font-size: 14px;
		line-height: 33px;
		text-align: center;
		display: inline-block;
		cursor: pointer;
		outline: 0;
	}
	
	.submit-tips {
		color: #e1504a;
		margin: 0 5px;
	}
</style>