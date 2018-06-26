<template>
	<div class="shop-inner-tips">
		<p class="shop-msg warning ">
			<span class="tip-info">
					<span class="msg-span">
						<p>云服务器新购特惠，超值活动价 0.73元/天起
					    	<a target="_blank" href="https://cloud.tencent.com/act/event/cloud-first-purchase.html" class="guide-link">立即购买
					    		<i class="shop-links-icon"></i>
					    	</a>
					    </p>
					    <p>年终钜惠：云产品 1 元抢购，更享千元续费大礼包
						    <a target="_blank" href="//cloud.tencent.com/act/bargin?utm_source=portal?utm_medium=cvm&amp;utm_campaign=year-end-promotions&amp;utm_term=1201" class="guide-link">立即参与
						        <i class="shop-links-icon"></i>
						    </a>
					    </p>
					    <slot>
							<p>包年包月预付费6个月及以上88折，1年83折，2年7折，3年5折（注：金融专区不参加折扣）。</p>
						</slot>
					</span>
			</span>
		</p>
	</div>
</template>

<script>
	export default {

	}
</script>

<style scoped>
	.shop-inner-tips {
		padding-top: 25px;
	}
	
	.shop-inner-tips .shop-msg {
		margin: 0 40px;
	}
	
	.shop-msg.warning {
		background: #fff5db;
		color: #df9500;
		border-color: #ffc533;
	}
	
	.shop-msg {
		font-size: 12px;
		line-height: 22px;
		margin-top: 20px;
		padding: 5px 10px;
		vertical-align: middle;
		color: #264663;
		border: 1px solid #7ab1de;
		border-radius: 2px;
		background: #d2e7f7;
	}
	
	.shop-msg .text-warning,
	.shop-msg a {
		margin-left: 5px;
		margin-right: 5px;
	}
	
	.shop-msg a {
		color: #00a4ff;
	}
	
	.shop-msg a:hover {
		text-decoration: underline;
	}
	
	.shop-msg .shop-links-icon {
		margin-top: -3px;
		margin-left: 3px;
	}
</style>